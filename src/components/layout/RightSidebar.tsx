import React from 'react';
import { User } from '../../types';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';

const RightSidebar: React.FC = () => {
  const suggestions = [
    {
      id: '2',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 12,
      isOnline: true,
    },
    {
      id: '3',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 8,
      isOnline: false,
    },
    {
      id: '4',
      name: 'Emily Davis',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 15,
      isOnline: true,
    },
  ];

  const onlineContacts = [
    {
      id: '5',
      name: 'Alex Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    {
      id: '6',
      name: 'Lisa Brown',
      avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    {
      id: '7',
      name: 'David Lee',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
    {
      id: '8',
      name: 'Anna Taylor',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
      isOnline: true,
    },
  ];

  return (
    <div className="hidden xl:block w-80 bg-white h-screen overflow-y-auto sticky top-16">
      <div className="p-4">
        {/* Friend Suggestions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-500 font-medium text-sm">Friend requests</h3>
            <button className="text-facebook-blue text-sm hover:underline">See all</button>
          </div>
          
          <div className="space-y-3">
            {suggestions.map((person) => (
              <div key={person.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar src={person.avatar} alt={person.name} size="md" isOnline={person.isOnline} />
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{person.name}</p>
                    <p className="text-xs text-gray-500">{person.mutualFriends} mutual friends</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" className="text-xs px-3 py-1">
                    Confirm
                  </Button>
                  <Button variant="secondary" size="sm" className="text-xs px-3 py-1">
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-4" />

        {/* Contacts */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-gray-500 font-medium text-sm">Contacts</h3>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-gray-700">
                <i className="bi bi-search text-sm"></i>
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <i className="bi bi-three-dots text-sm"></i>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {onlineContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <Avatar src={contact.avatar} alt={contact.name} size="sm" isOnline={contact.isOnline} />
                <span className="font-medium text-gray-900 text-sm">{contact.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Powered by Websparks AI */}
        <div className="mt-8 pt-4 border-t border-gray-200">
          <div className="text-center">
            <p className="text-xs text-gray-400">Powered by</p>
            <p className="text-sm font-medium text-facebook-blue">Websparks AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
