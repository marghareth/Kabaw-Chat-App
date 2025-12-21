// src/components/MessageItem.tsx
import { Message } from '../types/message.types';
import { AlertCircle, CheckCheck } from 'lucide-react';

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageItem = ({ message, isOwnMessage }: MessageItemProps) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-pink-500',
      'bg-orange-500',
      'bg-cyan-500',
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // System Messages - Full width style like in reference
  if (message.type !== 'message') {
    const isError = message.content.includes('not found') || message.content.includes('error');
    const isWarning = message.content.includes('Demo Mode');
    
    return (
      <div className="flex items-start gap-3 mb-3 message-item">
        {/* System Avatar */}
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
          isError ? 'bg-orange-500' : isWarning ? 'bg-orange-500' : 'bg-orange-500'
        }`}>
          <span className="text-white font-bold text-sm">S</span>
        </div>
        
        {/* System Message Content */}
        <div className="flex-1 max-w-3xl">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="font-semibold text-gray-800 text-sm">System</span>
            <span className="text-xs text-gray-500">Just now</span>
          </div>
          
          {/* Message Bubble - Wider for system messages */}
          <div className="bg-white rounded-2xl px-5 py-3 shadow-sm border border-gray-100 inline-block">
            {isError && (
              <div className="flex items-start gap-2 text-gray-700 text-sm">
                <AlertCircle size={16} className="text-purple-500 shrink-0 mt-0.5" />
                <span className="wrap-break-word">{message.content}</span>
              </div>
            )}
            {!isError && (
              <p className="text-gray-700 text-sm wrap-break-word">{message.content}</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // User's Own Messages (Right side, compact)
  if (isOwnMessage) {
    return (
      <div className="flex justify-end mb-3 message-item">
        <div className="flex flex-col items-end max-w-[70%]">
          {/* Time and Username */}
          <div className="flex items-baseline gap-2 mb-1 px-1">
            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
            <span className="font-medium text-gray-700 text-sm">You</span>
          </div>
          
          {/* Message Bubble - inline-block for proper wrapping */}
          <div className="bg-linear-to-br from-purple-500 to-blue-500 text-white rounded-2xl rounded-tr-md px-5 py-2.5 shadow-sm inline-block">
            <p className="text-sm leading-relaxed wrap-break-word">{message.content}</p>
          </div>
          
          {/* Read receipt checkmarks */}
          <div className="flex items-center gap-1 mt-0.5 px-1">
            <CheckCheck size={14} className="text-gray-400" />
          </div>
        </div>
      </div>
    );
  }

  // Other Users' Messages (Left side)
  return (
    <div className="flex items-start gap-3 mb-3 message-item">
      {/* User Avatar */}
      <div className={`shrink-0 w-10 h-10 rounded-full ${getAvatarColor(message.username)} flex items-center justify-center text-white font-semibold text-sm`}>
        {message.username.substring(0, 1).toUpperCase()}
      </div>

      {/* Message Content */}
      <div className="flex-1 max-w-[70%]">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="font-semibold text-gray-800 text-sm">{message.username}</span>
          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
        </div>

        {/* Message Bubble - inline-block for proper wrapping */}
        <div className="bg-white rounded-2xl rounded-tl-md px-5 py-2.5 shadow-sm border border-gray-100 inline-block">
          <p className="text-sm leading-relaxed wrap-break-word text-gray-800">{message.content}</p>
        </div>
      </div>
    </div>
  );
};