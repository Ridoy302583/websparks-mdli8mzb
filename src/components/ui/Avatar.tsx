import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  isOnline?: boolean;
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  size = 'md',
  isOnline = false,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const onlineIndicatorSizes = {
    xs: 'w-2 h-2',
    sm: 'w-2.5 h-2.5',
    md: 'w-3 h-3',
    lg: 'w-3.5 h-3.5',
    xl: 'w-4 h-4',
  };

  return (
    <div className={`relative ${className}`}>
      <img
        src={src || 'https://placehold.co/150x150/e5e7eb/9ca3af?text=User'}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-white shadow-sm`}
        crossOrigin="anonymous"
      />
      {isOnline && (
        <div className={`absolute bottom-0 right-0 ${onlineIndicatorSizes[size]} bg-facebook-green border-2 border-white rounded-full`}></div>
      )}
    </div>
  );
};

export default Avatar;
