import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { LocalStorageService } from '../utils/localStorage';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const timer = window.setTimeout(() => {
      const savedUser = LocalStorageService.getUser();
      if (savedUser) {
        setUser(savedUser);
      }
      setIsLoading(false);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, []);

  const login = (email: string, password: string) => {
    setIsLoading(true);
    const timer = window.setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: email,
        avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&sig=${Date.now()}`,
        isOnline: true,
      };
      
      LocalStorageService.saveUser(newUser);
      setUser(newUser);
      setIsLoading(false);
    }, 1500);

    return () => window.clearTimeout(timer);
  };

  const logout = () => {
    LocalStorageService.removeUser();
    setUser(null);
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      LocalStorageService.saveUser(updatedUser);
      setUser(updatedUser);
    }
  };

  return { user, isLoading, login, logout, updateUser };
};
