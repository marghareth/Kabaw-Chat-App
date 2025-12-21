// src/components/MessageItem.tsx

import { Message } from '../types/message.types';
import { getAvatarGradient, getInitials } from '../utils/avatarUtils';

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageItem = ({ message, isOwnMessage }: MessageItemProps) => {
  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // System messages (user_connected, user_disconnected)
  if (message.type !== 'message') {
    return (
      <div className="flex justify-center my-4">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100/80 backdrop-blur-sm">
          <div className="w-2 h-2 rounded-full bg-gray-400"></div>
          <span className="text-sm text-gray-600">
            {message.type === 'user_connected' ? '🟢' : '🔴'} {message.content}
          </span>
          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  }

  // Regular chat messages
  return (
    <div className={`flex gap-3 mb-4 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      <div className={`w-10 h-10 rounded-full ${getAvatarGradient(message.username)} flex items-center justify-center flex-shrink-0 shadow-md`}>
        <span className="text-white text-sm font-semibold">
          {getInitials(message.username)}
        </span>
      </div>

      {/* Message Content */}
      <div className={`flex flex-col max-w-md ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        {/* Username and timestamp */}
        <div className={`flex items-center gap-2 mb-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-sm font-medium text-gray-700">{message.username}</span>
          <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
        </div>

        {/* Message bubble */}
        <div
          className={`px-4 py-2 rounded-2xl shadow-sm ${
            isOwnMessage
              ? 'bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-tr-sm'
              : 'bg-white/80 backdrop-blur-sm text-gray-800 rounded-tl-sm'
          }`}
        >
          <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
};