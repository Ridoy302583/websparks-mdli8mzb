import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ja' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Header
    'header.search': 'Search SocialConnect',
    'header.profile': 'View Profile',
    'header.settings': 'Settings & Privacy',
    'header.storage': 'Storage Info',
    'header.help': 'Help & Support',
    'header.clearData': 'Clear All Data',
    'header.logout': 'Log Out',
    
    // Auth
    'auth.title': 'SocialConnect',
    'auth.subtitle': 'Connect with friends and the world around you.',
    'auth.email': 'Email address',
    'auth.password': 'Password',
    'auth.login': 'Log In',
    'auth.loggingIn': 'Logging in...',
    'auth.forgotPassword': 'Forgotten password?',
    'auth.createAccount': 'Create New Account',
    'auth.signUp': 'Sign Up',
    'auth.signUpSubtitle': 'It\'s quick and easy.',
    'auth.firstName': 'First name',
    'auth.lastName': 'Last name',
    'auth.newPassword': 'New password',
    'auth.birthday': 'Birthday',
    'auth.month': 'Month',
    'auth.day': 'Day',
    'auth.year': 'Year',
    'auth.gender': 'Gender',
    'auth.female': 'Female',
    'auth.male': 'Male',
    'auth.custom': 'Custom',
    
    // Posts
    'post.whatsOnMind': 'What\'s on your mind, {name}?',
    'post.liveVideo': 'Live video',
    'post.photoVideo': 'Photo/video',
    'post.feeling': 'Feeling/activity',
    'post.createPost': 'Create post',
    'post.public': 'Public',
    'post.addToPost': 'Add to your post',
    'post.post': 'Post',
    'post.like': 'Like',
    'post.comment': 'Comment',
    'post.share': 'Share',
    'post.writeComment': 'Write a comment...',
    'post.likes': '{count} likes',
    'post.comments': '{count} comments',
    'post.shares': '{count} shares',
    'post.deletePost': 'Delete post',
    'post.deleteConfirm': 'Are you sure you want to delete this post? This action cannot be undone.',
    'post.delete': 'Delete',
    'post.cancel': 'Cancel',
    'post.shared': 'Post Shared!',
    'post.sharedSuccess': 'Your post has been shared successfully.',
    'post.justNow': 'Just now',
    'post.reply': 'Reply',
    
    // Sidebar
    'sidebar.profile': 'Profile',
    'sidebar.friends': 'Friends',
    'sidebar.memories': 'Memories',
    'sidebar.saved': 'Saved',
    'sidebar.groups': 'Groups',
    'sidebar.video': 'Video',
    'sidebar.marketplace': 'Marketplace',
    'sidebar.events': 'Events',
    'sidebar.adManager': 'Ad Manager',
    'sidebar.fundraisers': 'Fundraisers',
    'sidebar.seeMore': 'See more',
    'sidebar.shortcuts': 'Your shortcuts',
    
    // Right Sidebar
    'rightSidebar.friendRequests': 'Friend requests',
    'rightSidebar.seeAll': 'See all',
    'rightSidebar.mutualFriends': '{count} mutual friends',
    'rightSidebar.confirm': 'Confirm',
    'rightSidebar.delete': 'Delete',
    'rightSidebar.contacts': 'Contacts',
    
    // Storage
    'storage.title': 'Storage Information',
    'storage.usage': 'Local Storage Usage',
    'storage.used': 'Used:',
    'storage.total': 'Total Available:',
    'storage.description': 'Your data is stored locally in your browser and includes:',
    'storage.posts': 'Posts and comments',
    'storage.likes': 'Likes and reactions',
    'storage.profile': 'User profile information',
    'storage.preferences': 'App preferences',
    'storage.close': 'Close',
    
    // General
    'general.loading': 'Loading SocialConnect...',
    'general.checkingData': 'Checking your saved data...',
    'general.welcome': 'Welcome to SocialConnect!',
    'general.firstPost': 'Create your first post to get started!',
    'general.dataSaved': 'Your posts will be saved locally in your browser.',
    'general.allDataSaved': 'All data saved locally',
    'general.poweredBy': 'Powered by Websparks AI',
    'general.clearDataConfirm': 'Are you sure you want to clear all data? This will delete all posts and comments.',
    
    // Languages
    'language.english': 'English',
    'language.japanese': '日本語',
    'language.bengali': 'বাংলা',
    
    // Theme
    'theme.light': 'Light Mode',
    'theme.dark': 'Dark Mode',
  },
  ja: {
    // Header
    'header.search': 'SocialConnectを検索',
    'header.profile': 'プロフィールを表示',
    'header.settings': '設定とプライバシー',
    'header.storage': 'ストレージ情報',
    'header.help': 'ヘルプとサポート',
    'header.clearData': 'すべてのデータを削除',
    'header.logout': 'ログアウト',
    
    // Auth
    'auth.title': 'SocialConnect',
    'auth.subtitle': '友達や世界とつながりましょう。',
    'auth.email': 'メールアドレス',
    'auth.password': 'パスワード',
    'auth.login': 'ログイン',
    'auth.loggingIn': 'ログイン中...',
    'auth.forgotPassword': 'パスワードを忘れた場合',
    'auth.createAccount': '新しいアカウントを作成',
    'auth.signUp': 'サインアップ',
    'auth.signUpSubtitle': '簡単で迅速です。',
    'auth.firstName': '名',
    'auth.lastName': '姓',
    'auth.newPassword': '新しいパスワード',
    'auth.birthday': '誕生日',
    'auth.month': '月',
    'auth.day': '日',
    'auth.year': '年',
    'auth.gender': '性別',
    'auth.female': '女性',
    'auth.male': '男性',
    'auth.custom': 'カスタム',
    
    // Posts
    'post.whatsOnMind': '{name}さん、今何を考えていますか？',
    'post.liveVideo': 'ライブ動画',
    'post.photoVideo': '写真/動画',
    'post.feeling': '気持ち/アクティビティ',
    'post.createPost': '投稿を作成',
    'post.public': '公開',
    'post.addToPost': '投稿に追加',
    'post.post': '投稿',
    'post.like': 'いいね',
    'post.comment': 'コメント',
    'post.share': 'シェア',
    'post.writeComment': 'コメントを書く...',
    'post.likes': '{count}いいね',
    'post.comments': '{count}コメント',
    'post.shares': '{count}シェア',
    'post.deletePost': '投稿を削除',
    'post.deleteConfirm': 'この投稿を削除してもよろしいですか？この操作は元に戻せません。',
    'post.delete': '削除',
    'post.cancel': 'キャンセル',
    'post.shared': '投稿をシェアしました！',
    'post.sharedSuccess': '投稿が正常にシェアされました。',
    'post.justNow': 'たった今',
    'post.reply': '返信',
    
    // Sidebar
    'sidebar.profile': 'プロフィール',
    'sidebar.friends': '友達',
    'sidebar.memories': '思い出',
    'sidebar.saved': '保存済み',
    'sidebar.groups': 'グループ',
    'sidebar.video': '動画',
    'sidebar.marketplace': 'マーケットプレイス',
    'sidebar.events': 'イベント',
    'sidebar.adManager': '広告マネージャー',
    'sidebar.fundraisers': '募金活動',
    'sidebar.seeMore': 'もっと見る',
    'sidebar.shortcuts': 'あなたのショートカット',
    
    // Right Sidebar
    'rightSidebar.friendRequests': '友達リクエスト',
    'rightSidebar.seeAll': 'すべて見る',
    'rightSidebar.mutualFriends': '共通の友達{count}人',
    'rightSidebar.confirm': '承認',
    'rightSidebar.delete': '削除',
    'rightSidebar.contacts': '連絡先',
    
    // Storage
    'storage.title': 'ストレージ情報',
    'storage.usage': 'ローカルストレージ使用量',
    'storage.used': '使用済み:',
    'storage.total': '利用可能な合計:',
    'storage.description': 'あなたのデータはブラウザにローカルに保存され、以下が含まれます:',
    'storage.posts': '投稿とコメント',
    'storage.likes': 'いいねとリアクション',
    'storage.profile': 'ユーザープロフィール情報',
    'storage.preferences': 'アプリの設定',
    'storage.close': '閉じる',
    
    // General
    'general.loading': 'SocialConnectを読み込み中...',
    'general.checkingData': '保存されたデータを確認中...',
    'general.welcome': 'SocialConnectへようこそ！',
    'general.firstPost': '最初の投稿を作成して始めましょう！',
    'general.dataSaved': '投稿はブラウザにローカルに保存されます。',
    'general.allDataSaved': 'すべてのデータがローカルに保存されました',
    'general.poweredBy': 'Powered by Websparks AI',
    'general.clearDataConfirm': 'すべてのデータを削除してもよろしいですか？これにより、すべての投稿とコメントが削除されます。',
    
    // Languages
    'language.english': 'English',
    'language.japanese': '日本語',
    'language.bengali': 'বাংলা',
    
    // Theme
    'theme.light': 'ライトモード',
    'theme.dark': 'ダークモード',
  },
  bn: {
    // Header
    'header.search': 'SocialConnect খুঁজুন',
    'header.profile': 'প্রোফাইল দেখুন',
    'header.settings': 'সেটিংস এবং গোপনীয়তা',
    'header.storage': 'স্টোরেজ তথ্য',
    'header.help': 'সাহায্য এবং সহায়তা',
    'header.clearData': 'সমস্ত ডেটা মুছুন',
    'header.logout': 'লগ আউট',
    
    // Auth
    'auth.title': 'SocialConnect',
    'auth.subtitle': 'বন্ধুদের এবং বিশ্বের সাথে সংযুক্ত হন।',
    'auth.email': 'ইমেইল ঠিকানা',
    'auth.password': 'পাসওয়ার্ড',
    'auth.login': 'লগ ইন',
    'auth.loggingIn': 'লগ ইন করা হচ্ছে...',
    'auth.forgotPassword': 'পাসওয়ার্ড ভুলে গেছেন?',
    'auth.createAccount': 'নতুন অ্যাকাউন্ট তৈরি করুন',
    'auth.signUp': 'সাইন আপ',
    'auth.signUpSubtitle': 'এটি দ্রুত এবং সহজ।',
    'auth.firstName': 'প্রথম নাম',
    'auth.lastName': 'শেষ নাম',
    'auth.newPassword': 'নতুন পাসওয়ার্ড',
    'auth.birthday': 'জন্মদিন',
    'auth.month': 'মাস',
    'auth.day': 'দিন',
    'auth.year': 'বছর',
    'auth.gender': 'লিঙ্গ',
    'auth.female': 'মহিলা',
    'auth.male': 'পুরুষ',
    'auth.custom': 'কাস্টম',
    
    // Posts
    'post.whatsOnMind': '{name}, আপনার মনে কি আছে?',
    'post.liveVideo': 'লাইভ ভিডিও',
    'post.photoVideo': 'ছবি/ভিডিও',
    'post.feeling': 'অনুভূতি/কার্যকলাপ',
    'post.createPost': 'পোস্ট তৈরি করুন',
    'post.public': 'সর্বজনীন',
    'post.addToPost': 'আপনার পোস্টে যোগ করুন',
    'post.post': 'পোস্ট',
    'post.like': 'লাইক',
    'post.comment': 'মন্তব্য',
    'post.share': 'শেয়ার',
    'post.writeComment': 'একটি মন্তব্য লিখুন...',
    'post.likes': '{count} লাইক',
    'post.comments': '{count} মন্তব্য',
    'post.shares': '{count} শেয়ার',
    'post.deletePost': 'পোস্ট মুছুন',
    'post.deleteConfirm': 'আপনি কি নিশ্চিত যে আপনি এই পোস্টটি মুছতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।',
    'post.delete': 'মুছুন',
    'post.cancel': 'বাতিল',
    'post.shared': 'পোস্ট শেয়ার করা হয়েছে!',
    'post.sharedSuccess': 'আপনার পোস্ট সফলভাবে শেয়ার করা হয়েছে।',
    'post.justNow': 'এইমাত্র',
    'post.reply': 'উত্তর',
    
    // Sidebar
    'sidebar.profile': 'প্রোফাইল',
    'sidebar.friends': 'বন্ধুরা',
    'sidebar.memories': 'স্মৃতি',
    'sidebar.saved': 'সংরক্ষিত',
    'sidebar.groups': 'গ্রুপ',
    'sidebar.video': 'ভিডিও',
    'sidebar.marketplace': 'মার্কেটপ্লেস',
    'sidebar.events': 'ইভেন্ট',
    'sidebar.adManager': 'বিজ্ঞাপন ম্যানেজার',
    'sidebar.fundraisers': 'তহবিল সংগ্রহ',
    'sidebar.seeMore': 'আরো দেখুন',
    'sidebar.shortcuts': 'আপনার শর্টকাট',
    
    // Right Sidebar
    'rightSidebar.friendRequests': 'বন্ধুত্বের অনুরোধ',
    'rightSidebar.seeAll': 'সব দেখুন',
    'rightSidebar.mutualFriends': '{count} পারস্পরিক বন্ধু',
    'rightSidebar.confirm': 'নিশ্চিত করুন',
    'rightSidebar.delete': 'মুছুন',
    'rightSidebar.contacts': 'যোগাযোগ',
    
    // Storage
    'storage.title': 'স্টোরেজ তথ্য',
    'storage.usage': 'স্থানীয় স্টোরেজ ব্যবহার',
    'storage.used': 'ব্যবহৃত:',
    'storage.total': 'মোট উপলব্ধ:',
    'storage.description': 'আপনার ডেটা আপনার ব্রাউজারে স্থানীয়ভাবে সংরক্ষিত এবং এতে রয়েছে:',
    'storage.posts': 'পোস্ট এবং মন্তব্য',
    'storage.likes': 'লাইক এবং প্রতিক্রিয়া',
    'storage.profile': 'ব্যবহারকারী প্রোফাইল তথ্য',
    'storage.preferences': 'অ্যাপ পছন্দ',
    'storage.close': 'বন্ধ করুন',
    
    // General
    'general.loading': 'SocialConnect লোড হচ্ছে...',
    'general.checkingData': 'আপনার সংরক্ষিত ডেটা পরীক্ষা করা হচ্ছে...',
    'general.welcome': 'SocialConnect এ স্বাগতম!',
    'general.firstPost': 'শুরু করতে আপনার প্রথম পোস্ট তৈরি করুন!',
    'general.dataSaved': 'আপনার পোস্ট আপনার ব্রাউজারে স্থানীয়ভাবে সংরক্ষিত হবে।',
    'general.allDataSaved': 'সমস্ত ডেটা স্থানীয়ভাবে সংরক্ষিত',
    'general.poweredBy': 'Powered by Websparks AI',
    'general.clearDataConfirm': 'আপনি কি নিশ্চিত যে আপনি সমস্ত ডেটা মুছতে চান? এটি সমস্ত পোস্ট এবং মন্তব্য মুছে দেবে।',
    
    // Languages
    'language.english': 'English',
    'language.japanese': '日本語',
    'language.bengali': 'বাংলা',
    
    // Theme
    'theme.light': 'হালকা মোড',
    'theme.dark': 'অন্ধকার মোড',
  },
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage
    const savedLanguage = localStorage.getItem('socialconnect_language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith('ja')) {
        setLanguageState('ja');
      } else if (browserLang.startsWith('bn')) {
        setLanguageState('bn');
      } else {
        setLanguageState('en');
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('socialconnect_language', lang);
  };

  const t = (key: string, params?: Record<string, string | number>) => {
    let translation = translations[language][key] || translations.en[key] || key;
    
    // Replace parameters
    if (params) {
      Object.entries(params).forEach(([paramKey, value]) => {
        translation = translation.replace(`{${paramKey}}`, String(value));
      });
    }
    
    return translation;
  };

  const value = {
    language,
    setLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
