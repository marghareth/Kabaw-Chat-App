// src/utils/avatarUtils.ts

export const getAvatarGradient = (username: string): string => {
  const gradients = [
    'avatar-gradient-1',
    'avatar-gradient-2',
    'avatar-gradient-3',
    'avatar-gradient-4',
    'avatar-gradient-5',
    'avatar-gradient-6',
  ];
  
  const hash = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return gradients[hash % gradients.length];
};

export const getInitials = (username: string): string => {
  return username.substring(0, 2).toUpperCase();
};