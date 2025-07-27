import { Post, User, Comment } from '../types';

const STORAGE_KEYS = {
  POSTS: 'socialconnect_posts',
  USER: 'socialconnect_user',
  USERS: 'socialconnect_users',
  COMMENTS: 'socialconnect_comments',
};

export class LocalStorageService {
  // User Management
  static saveUser(user: User): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } catch (error) {
      console.error('Error saving user to localStorage:', error);
    }
  }

  static getUser(): User | null {
    try {
      const userData = localStorage.getItem(STORAGE_KEYS.USER);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user from localStorage:', error);
      return null;
    }
  }

  static removeUser(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } catch (error) {
      console.error('Error removing user from localStorage:', error);
    }
  }

  // Posts Management
  static savePosts(posts: Post[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (error) {
      console.error('Error saving posts to localStorage:', error);
    }
  }

  static getPosts(): Post[] {
    try {
      const postsData = localStorage.getItem(STORAGE_KEYS.POSTS);
      return postsData ? JSON.parse(postsData) : [];
    } catch (error) {
      console.error('Error getting posts from localStorage:', error);
      return [];
    }
  }

  static addPost(post: Post): void {
    try {
      const existingPosts = this.getPosts();
      const updatedPosts = [post, ...existingPosts];
      this.savePosts(updatedPosts);
    } catch (error) {
      console.error('Error adding post to localStorage:', error);
    }
  }

  static updatePost(postId: string, updates: Partial<Post>): void {
    try {
      const posts = this.getPosts();
      const updatedPosts = posts.map(post => 
        post.id === postId ? { ...post, ...updates } : post
      );
      this.savePosts(updatedPosts);
    } catch (error) {
      console.error('Error updating post in localStorage:', error);
    }
  }

  static deletePost(postId: string): void {
    try {
      const posts = this.getPosts();
      const filteredPosts = posts.filter(post => post.id !== postId);
      this.savePosts(filteredPosts);
    } catch (error) {
      console.error('Error deleting post from localStorage:', error);
    }
  }

  // Comments Management
  static addComment(postId: string, comment: Comment): void {
    try {
      const posts = this.getPosts();
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment]
          };
        }
        return post;
      });
      this.savePosts(updatedPosts);
    } catch (error) {
      console.error('Error adding comment to localStorage:', error);
    }
  }

  static updateComment(postId: string, commentId: string, updates: Partial<Comment>): void {
    try {
      const posts = this.getPosts();
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId ? { ...comment, ...updates } : comment
            )
          };
        }
        return post;
      });
      this.savePosts(updatedPosts);
    } catch (error) {
      console.error('Error updating comment in localStorage:', error);
    }
  }

  // Like Management
  static togglePostLike(postId: string, userId: string): void {
    try {
      const posts = this.getPosts();
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      });
      this.savePosts(updatedPosts);
    } catch (error) {
      console.error('Error toggling post like in localStorage:', error);
    }
  }

  static toggleCommentLike(postId: string, commentId: string): void {
    try {
      const posts = this.getPosts();
      const updatedPosts = posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: post.comments.map(comment => {
              if (comment.id === commentId) {
                const isLiked = !comment.isLiked;
                return {
                  ...comment,
                  isLiked,
                  likes: isLiked ? comment.likes + 1 : comment.likes - 1
                };
              }
              return comment;
            })
          };
        }
        return post;
      });
      this.savePosts(updatedPosts);
    } catch (error) {
      console.error('Error toggling comment like in localStorage:', error);
    }
  }

  // Share Management
  static incrementShare(postId: string): void {
    try {
      const posts = this.getPosts();
      const updatedPosts = posts.map(post => 
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      );
      this.savePosts(updatedPosts);
    } catch (error) {
      console.error('Error incrementing share in localStorage:', error);
    }
  }

  // Initialize with sample data if empty
  static initializeWithSampleData(): void {
    try {
      const existingPosts = this.getPosts();
      if (existingPosts.length === 0) {
        // Import and save sample data
        import('../data/mockData').then(({ mockPosts }) => {
          this.savePosts(mockPosts);
        });
      }
    } catch (error) {
      console.error('Error initializing sample data:', error);
    }
  }

  // Clear all data
  static clearAllData(): void {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Get storage usage info
  static getStorageInfo(): { used: number; total: number; percentage: number } {
    try {
      let used = 0;
      Object.values(STORAGE_KEYS).forEach(key => {
        const item = localStorage.getItem(key);
        if (item) {
          used += item.length;
        }
      });

      const total = 5 * 1024 * 1024; // 5MB typical localStorage limit
      const percentage = (used / total) * 100;

      return { used, total, percentage };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { used: 0, total: 0, percentage: 0 };
    }
  }
}
