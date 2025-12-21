// src/components/MessageItem.tsx
import { Message } from '../types/message.types';
import { getInitials } from '../utils/avatarUtils';
import { CheckCheck } from 'lucide-react'; // You might want to add read receipts later

interface MessageItemProps {
  message: Message;
  isOwnMessage: boolean;
}

export const MessageItem = ({ message, isOwnMessage }: MessageItemProps) => {
  // Format timestamp nicely (e.g., "10:42 AM")
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  // 1. Handle System Messages (Connected/Disconnected)
  // We make these small pill-shaped glass elements in the center
  if (message.type !== 'message') {
    return (
      <div className="flex justify-center my-6">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm shadow-sm">
          <span className={`w-1.5 h-1.5 rounded-full ${message.type === 'user_connected' ? 'bg-green-400' : 'bg-red-400'}`} />
          <span className="text-xs font-medium text-slate-600">
            {message.content}
          </span>
        </div>
      </div>
    );
  }

  // 2. Regular Chat Messages
  return (
    <div className={`group flex gap-3 mb-2 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
      
      {/* Avatar (Only show for others) */}
      {!isOwnMessage && (
        <div className="shrink-0 flex flex-col justify-end"> 
          <div className="w-8 h-8 rounded-full bg-linear-to-tr from-purple-100 to-white border border-white shadow-sm flex items-center justify-center text-[10px] font-bold text-purple-600">
            {getInitials(message.username)}
          </div>
        </div>
      )}

      {/* Message Content Wrapper */}
      <div className={`flex flex-col max-w-[75%] ${isOwnMessage ? 'items-end' : 'items-start'}`}>
        
        {/* Username (Only for others) */}
        {!isOwnMessage && (
          <span className="text-[11px] text-slate-500 font-medium ml-1 mb-1">
            {message.username}
          </span>
        )}

        {/* The Bubble */}
        <div
          className={`relative px-5 py-2.5 shadow-sm text-[15px] leading-relaxed wrap-break-word
            ${isOwnMessage 
              ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm' // Own: Solid Blue, sharp top-right corner
              : 'bg-white/80 backdrop-blur-md text-slate-800 border border-white/50 rounded-2xl rounded-tl-sm' // Others: Glass, sharp top-left corner
            }`}
        >
          {message.content}
          
          {/* Timestamp inside bubble */}
          <div className={`text-[10px] mt-1 flex items-center justify-end gap-1 opacity-70 ${isOwnMessage ? 'text-blue-100' : 'text-slate-400'}`}>
            {formatTime(message.timestamp)}
            {isOwnMessage && <CheckCheck size={12} />}
          </div>
        </div>
      </div>
    </div>
  );
};