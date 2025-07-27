import { useState, useEffect } from 'react';
import { Post, Comment, User } from '../types';
import { LocalStorageService } from '../utils/localStorage';

export const usePosts = (user: User | null) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadPosts();
    }
  }, [user]);

  const loadPosts = () => {
    try {
      setIsLoading(true);
      const savedPosts = LocalStorageService.getPosts();
      
      if (savedPosts.length === 0) {
        // Initialize with sample data if no posts exist
        LocalStorageService.initializeWithSampleData();
        const timer = window.setTimeout(() => {
          const initialPosts = LocalStorageService.getPosts();
          setPosts(initialPosts);
          setIsLoading(false);
        }, 500);
        return () => window.clearTimeout(timer);
      } else {
        setPosts(savedPosts);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error loading posts:', error);
      setIsLoading(false);
    }
  };

  const createPost = (content: string, image?: string) => {
    if (!user) return;

    try {
      const newPost: Post = {
        id: Date.now().toString(),
        author: user,
        content,
        image,
        timestamp: new Date().toISOString(),
        likes: 0,
        shares: 0,
        isLiked: false,
        comments: [],
      };

      LocalStorageService.addPost(newPost);
      setPosts(prevPosts => [newPost, ...prevPosts]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const likePost = (postId: string) => {
    if (!user) return;

    try {
      LocalStorageService.togglePostLike(postId, user.id);
      setPosts(prevPosts => 
        prevPosts.map(post => {
          if (post.id === postId) {
            const isLiked = !post.isLiked;
            return {
              ...post,
              isLiked,
              likes: isLiked ? post.likes + 1 : post.likes - 1,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const commentOnPost = (postId: string, content: string) => {
    if (!user) return;

    try {
      const newComment: Comment = {
        id: Date.now().toString(),
        author: user,
        content,
        timestamp: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };

      LocalStorageService.addComment(postId, newComment);
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...post.comments, newComment],
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error commenting on post:', error);
    }
  };

  const sharePost = (postId: string) => {
    try {
      LocalStorageService.incrementShare(postId);
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              shares: post.shares + 1,
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error sharing post:', error);
    }
  };

  const deletePost = (postId: string) => {
    try {
      LocalStorageService.deletePost(postId);
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const likeComment = (postId: string, commentId: string) => {
    try {
      LocalStorageService.toggleCommentLike(postId, commentId);
      setPosts(prevPosts =>
        prevPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments.map(comment => {
                if (comment.id === commentId) {
                  const isLiked = !comment.isLiked;
                  return {
                    ...comment,
                    isLiked,
                    likes: isLiked ? comment.likes + 1 : comment.likes - 1,
                  };
                }
                return comment;
              }),
            };
          }
          return post;
        })
      );
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  return {
    posts,
    isLoading,
    createPost,
    likePost,
    commentOnPost,
    sharePost,
    deletePost,
    likeComment,
    refreshPosts: loadPosts,
  };
};
