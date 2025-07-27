import React from 'react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';

interface SidebarProps {
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const menuItems = [
    { icon: 'bi-person', label: 'Profile', color: 'text-blue-600' },
    { icon: 'bi-people', label: 'Friends', color: 'text-green-600' },
    { icon: 'bi-clock-history', label: 'Memories', color: 'text-purple-600' },
    { icon: 'bi-bookmark', label: 'Saved', color: 'text-pink-600' },
    { icon: 'bi-people-fill', label: 'Groups', color: 'text-blue-500' },
    { icon: 'bi-play-btn', label: 'Video', color: 'text-red-600' },
    { icon: 'bi-shop', label: 'Marketplace', color: 'text-orange-600' },
    { icon: 'bi-calendar-event', label: 'Events', color: 'text-indigo-600' },
    { icon: 'bi-graph-up', label: 'Ad Manager', color: 'text-teal-600' },
    { icon: 'bi-heart', label: 'Fundraisers', color: 'text-red-500' },
  ];

  return (
    <div className="hidden lg:block w-80 bg-white h-screen overflow-y-auto sticky top-16">
      <div className="p-4 space-y-2">
        {/* User Profile */}
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <Avatar src={user.avatar} alt={user.name} size="md" isOnline={user.isOnline} />
          <span className="font-medium text-gray-900">{user.name}</span>
        </div>

        {/* Menu Items */}
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
          >
            <div className="w-10 h-10 flex items-center justify-center">
              <i className={`${item.icon} text-xl ${item.color}`}></i>
            </div>
            <span className="font-medium text-gray-900">{item.label}</span>
          </div>
        ))}

        {/* See More */}
        <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
            <i className="bi bi-chevron-down text-gray-600"></i>
          </div>
          <span className="font-medium text-gray-900">See more</span>
        </div>

        <hr className="my-4" />

        {/* Shortcuts */}
        <div className="space-y-2">
          <h3 className="text-gray-500 font-medium text-sm px-2">Your shortcuts</h3>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=40&h=40&fit=crop&crop=center"
              alt="Group"
              className="w-10 h-10 rounded-lg object-cover"
              crossOrigin="anonymous"
            />
            <span className="font-medium text-gray-900">React Developers</span>
          </div>
          <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=40&h=40&fit=crop&crop=center"
              alt="Group"
              className="w-10 h-10 rounded-lg object-cover"
              crossOrigin="anonymous"
            />
            <span className="font-medium text-gray-900">Tech News</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
