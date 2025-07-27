import React, { useState } from 'react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface CreatePostProps {
  user: User;
  onCreatePost: (content: string, image?: string) => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ user, onCreatePost }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string>('');

  const handleSubmit = () => {
    if (postContent.trim()) {
      onCreatePost(postContent, selectedImage);
      setPostContent('');
      setSelectedImage('');
      setIsModalOpen(false);
    }
  };

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const sampleImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=500&h=300&fit=crop',
  ];

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar src={user.avatar} alt={user.name} size="md" />
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 bg-facebook-lightgray hover:bg-gray-200 rounded-full px-4 py-3 text-left text-gray-500 transition-colors"
          >
            What's on your mind, {user.name.split(' ')[0]}?
          </button>
        </div>

        <hr className="mb-3" />

        <div className="flex justify-between">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 flex-1 justify-center py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="bi bi-camera-video text-red-500 text-xl"></i>
            <span className="text-gray-600 font-medium">Live video</span>
          </button>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 flex-1 justify-center py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="bi bi-image text-green-500 text-xl"></i>
            <span className="text-gray-600 font-medium">Photo/video</span>
          </button>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-2 flex-1 justify-center py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="bi bi-emoji-smile text-yellow-500 text-xl"></i>
            <span className="text-gray-600 font-medium">Feeling/activity</span>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create post"
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Avatar src={user.avatar} alt={user.name} size="md" />
            <div>
              <p className="font-medium text-gray-900">{user.name}</p>
              <div className="flex items-center space-x-1 text-sm text-gray-500">
                <i className="bi bi-globe"></i>
                <span>Public</span>
                <i className="bi bi-chevron-down"></i>
              </div>
            </div>
          </div>

          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
            className="w-full h-32 p-3 text-lg resize-none border-none outline-none placeholder-gray-400"
            autoFocus
          />

          {selectedImage && (
            <div className="relative">
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-64 object-cover rounded-lg"
                crossOrigin="anonymous"
              />
              <button
                onClick={() => setSelectedImage('')}
                className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
              >
                <i className="bi bi-x text-gray-600"></i>
              </button>
            </div>
          )}

          <div className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium text-gray-900">Add to your post</span>
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <i className="bi bi-image text-green-500 text-xl"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <i className="bi bi-person-plus text-blue-500 text-xl"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <i className="bi bi-emoji-smile text-yellow-500 text-xl"></i>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <i className="bi bi-geo-alt text-red-500 text-xl"></i>
                </button>
              </div>
            </div>

            {!selectedImage && (
              <div className="grid grid-cols-2 gap-2">
                {sampleImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(image)}
                    className="aspect-video rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={image}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-full object-cover"
                      crossOrigin="anonymous"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={!postContent.trim()}
            className="w-full"
          >
            Post
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default CreatePost;
