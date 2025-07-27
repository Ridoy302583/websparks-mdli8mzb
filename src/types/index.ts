export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isOnline: boolean;
  mutualFriends?: number;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  image?: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
  isLiked: boolean;
}

export interface Comment {
  id: string;
  author: User;
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

export interface Message {
  id: string;
  sender: User;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participant: User;
  messages: Message[];
  lastMessage: Message;
  unreadCount: number;
}
