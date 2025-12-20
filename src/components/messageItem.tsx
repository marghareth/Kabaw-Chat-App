// src/components/MessageItem.tsx

import { Message } from '../types/message.types';

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageItem = ({ message, isOwnMessage }: MessageItemProps) => {
  const isSystemMessage = message.type === 'system' || message.type === 'user_connected';

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-200 text-gray-700 text-xs px-3 py-1 rounded-full">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${isOwnMessage ? 'items-end' : 'items-start'} flex flex-col`}>
        {!isOwnMessage && (
          <div className="text-xs text-gray-500 mb-1 px-1">
            {message.username}
            {message.user_id && (
              <span className="text-gray-400 ml-2">ID: {message.user_id.substring(0, 8)}...</span>
            )}
          </div>
        )}
        
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwnMessage
              ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-sm'
              : 'bg-gray-100 text-gray-900 rounded-bl-sm'
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
        
        <div className="text-xs text-gray-400 mt-1 px-1">
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};