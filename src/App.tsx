import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import { usePosts } from './hooks/usePosts';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import RightSidebar from './components/layout/RightSidebar';
import CreatePost from './components/posts/CreatePost';
import PostCard from './components/posts/PostCard';
import LoginForm from './components/auth/LoginForm';

function AppContent() {
  const { user, isLoading, login, logout } = useAuth();
  const { 
    posts, 
    isLoading: postsLoading, 
    createPost, 
    likePost, 
    commentOnPost, 
    sharePost, 
    deletePost,
    likeComment 
  } = usePosts(user);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-facebook-lightgray dark:bg-dark-bg flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-facebook-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-dark-textSecondary text-lg">Loading SocialConnect...</p>
          <p className="text-gray-500 dark:text-dark-textSecondary text-sm mt-2">Checking your saved data...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-facebook-lightgray dark:bg-dark-bg transition-colors duration-300">
      <Header user={user} onLogout={logout} />
      
      <div className="flex">
        <Sidebar user={user} />
        
        {/* Main Content */}
        <main className="flex-1 max-w-2xl mx-auto px-4 py-6">
          <CreatePost user={user} onCreatePost={createPost} />
          
          {postsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-dark-surface rounded-lg shadow-sm border border-gray-200 dark:border-dark-border p-4 animate-pulse">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-dark-card rounded-full"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 dark:bg-dark-card rounded w-32"></div>
                      <div className="h-3 bg-gray-200 dark:bg-dark-card rounded w-20"></div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-dark-card rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-dark-card rounded w-3/4"></div>
                  </div>
                  <div className="h-48 bg-gray-200 dark:bg-dark-card rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-8 bg-gray-200 dark:bg-dark-card rounded w-20"></div>
                    <div className="h-8 bg-gray-200 dark:bg-dark-card rounded w-20"></div>
                    <div className="h-8 bg-gray-200 dark:bg-dark-card rounded w-20"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  currentUserId={user.id}
                  onLike={likePost}
                  onComment={commentOnPost}
                  onShare={sharePost}
                  onDelete={deletePost}
                  onLikeComment={likeComment}
                />
              ))}

              {posts.length === 0 && (
                <div className="text-center py-12">
                  <i className="bi bi-chat-square-text text-6xl text-gray-300 dark:text-dark-textSecondary mb-4"></i>
                  <h3 className="text-xl font-medium text-gray-500 dark:text-dark-textSecondary mb-2">Welcome to SocialConnect!</h3>
                  <p className="text-gray-400 dark:text-dark-textSecondary mb-4">Create your first post to get started!</p>
                  <p className="text-sm text-gray-400 dark:text-dark-textSecondary">Your posts will be saved locally in your browser.</p>
                </div>
              )}
            </div>
          )}

          {/* Data persistence indicator */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-2 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 text-green-700 dark:text-green-400 px-3 py-2 rounded-full text-sm">
              <i className="bi bi-check-circle-fill"></i>
              <span>All data saved locally</span>
            </div>
          </div>
        </main>
        
        <RightSidebar />
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
