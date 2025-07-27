import React, { useState } from 'react';
import { Post, Comment } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface PostCardProps {
  post: Post;
  currentUserId: string;
  onLike: (postId: string) => void;
  onComment: (postId: string, content: string) => void;
  onShare: (postId: string) => void;
  onDelete?: (postId: string) => void;
  onLikeComment: (postId: string, commentId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  post, 
  currentUserId, 
  onLike, 
  onComment, 
  onShare, 
  onDelete,
  onLikeComment 
}) => {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const handleComment = () => {
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText('');
    }
  };

  const handleShare = () => {
    onShare(post.id);
    setShowShareModal(true);
    const timer = window.setTimeout(() => {
      setShowShareModal(false);
    }, 2000);
    return () => window.clearTimeout(timer);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post.id);
      setShowDeleteModal(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    
    return date.toLocaleDateString();
  };

  const isOwnPost = post.author.id === currentUserId;

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-4 animate-fade-in">
        {/* Post Header */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Avatar src={post.author.avatar} alt={post.author.name} size="md" isOnline={post.author.isOnline} />
              <div>
                <h3 className="font-medium text-gray-900">{post.author.name}</h3>
                <div className="flex items-center space-x-1 text-sm text-gray-500">
                  <span>{formatTime(post.timestamp)}</span>
                  <span>•</span>
                  <i className="bi bi-globe"></i>
                </div>
              </div>
            </div>
            <div className="relative">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors group">
                <i className="bi bi-three-dots text-gray-500 group-hover:text-gray-700"></i>
              </button>
              {isOwnPost && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <i className="bi bi-trash"></i>
                    <span>Delete post</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Post Content */}
          <p className="text-gray-900 mb-3 leading-relaxed whitespace-pre-wrap">{post.content}</p>

          {/* Post Image */}
          {post.image && (
            <div className="mb-3 -mx-4">
              <img
                src={post.image}
                alt="Post content"
                className="w-full max-h-96 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                crossOrigin="anonymous"
                onClick={() => {
                  // Could implement image modal here
                }}
              />
            </div>
          )}

          {/* Post Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
            <div className="flex items-center space-x-1">
              {post.likes > 0 && (
                <>
                  <div className="flex -space-x-1">
                    <div className="w-5 h-5 bg-facebook-blue rounded-full flex items-center justify-center">
                      <i className="bi bi-hand-thumbs-up-fill text-white text-xs"></i>
                    </div>
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <i className="bi bi-heart-fill text-white text-xs"></i>
                    </div>
                  </div>
                  <span className="hover:underline cursor-pointer">{post.likes} {post.likes === 1 ? 'like' : 'likes'}</span>
                </>
              )}
            </div>
            <div className="flex items-center space-x-4">
              {post.comments.length > 0 && (
                <button
                  onClick={() => setShowComments(!showComments)}
                  className="hover:underline"
                >
                  {post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}
                </button>
              )}
              {post.shares > 0 && (
                <span>{post.shares} {post.shares === 1 ? 'share' : 'shares'}</span>
              )}
            </div>
          </div>

          <hr className="mb-3" />

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button
              variant="ghost"
              onClick={() => onLike(post.id)}
              className={`flex items-center space-x-2 flex-1 justify-center py-2 transition-all duration-200 ${
                post.isLiked 
                  ? 'text-facebook-blue bg-blue-50 hover:bg-blue-100' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <i className={`bi ${post.isLiked ? 'bi-hand-thumbs-up-fill' : 'bi-hand-thumbs-up'} text-xl`}></i>
              <span className="font-medium">Like</span>
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 flex-1 justify-center py-2 text-gray-600 hover:bg-gray-100"
            >
              <i className="bi bi-chat text-xl"></i>
              <span className="font-medium">Comment</span>
            </Button>
            
            <Button
              variant="ghost"
              onClick={handleShare}
              className="flex items-center space-x-2 flex-1 justify-center py-2 text-gray-600 hover:bg-gray-100"
            >
              <i className="bi bi-share text-xl"></i>
              <span className="font-medium">Share</span>
            </Button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="border-t border-gray-200 p-4 animate-slide-up">
            {/* Comment Input */}
            <div className="flex items-center space-x-3 mb-4">
              <Avatar src={post.author.avatar} alt={post.author.name} size="sm" />
              <div className="flex-1 flex items-center space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-facebook-lightgray rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-facebook-blue transition-all duration-200"
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                />
                <button
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className="text-facebook-blue disabled:text-gray-400 hover:scale-110 transition-transform duration-200"
                >
                  <i className="bi bi-send text-lg"></i>
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3 animate-fade-in">
                  <Avatar src={comment.author.avatar} alt={comment.author.name} size="sm" />
                  <div className="flex-1">
                    <div className="bg-facebook-lightgray rounded-2xl px-4 py-2">
                      <p className="font-medium text-sm text-gray-900">{comment.author.name}</p>
                      <p className="text-sm text-gray-800">{comment.content}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <button 
                        onClick={() => onLikeComment(post.id, comment.id)}
                        className={`hover:underline transition-colors duration-200 ${
                          comment.isLiked ? 'text-facebook-blue font-medium' : ''
                        }`}
                      >
                        Like
                      </button>
                      <button className="hover:underline">Reply</button>
                      <span>{formatTime(comment.timestamp)}</span>
                      {comment.likes > 0 && (
                        <div className="flex items-center space-x-1">
                          <i className="bi bi-hand-thumbs-up-fill text-facebook-blue"></i>
                          <span>{comment.likes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Post"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">Are you sure you want to delete this post? This action cannot be undone.</p>
          <div className="flex space-x-3">
            <Button
              variant="danger"
              onClick={handleDelete}
              className="flex-1"
            >
              Delete
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      {/* Share Success Modal */}
      <Modal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        size="sm"
      >
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="bi bi-check-circle-fill text-green-500 text-2xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Post Shared!</h3>
          <p className="text-gray-600">Your post has been shared successfully.</p>
        </div>
      </Modal>
    </>
  );
};

export default PostCard;
