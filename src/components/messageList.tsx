// src/components/messageList.tsx
import { useEffect, useRef } from 'react';
import { Message } from '../types/message.types';
import { MessageItem } from './messageItem'; 
import { MessageSquareDashed } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom only when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    // overflow-y-auto: This is the ONLY thing that scrolls
    // pb-4: Adds a little breathing room before the input bar
    <div className="flex-1 overflow-y-auto p-4 sm:p-6 w-full scroll-smooth">
      
      {messages.length === 0 ? (
        // Empty State - Glass Style
        <div className="flex flex-col items-center justify-center h-full opacity-0 animate-in fade-in duration-700">
          <div className="w-24 h-24 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mb-6 shadow-lg backdrop-blur-sm">
            <MessageSquareDashed className="w-10 h-10 text-white" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold text-slate-700 mb-2">No messages yet</h3>
          <p className="text-slate-500 max-w-xs text-center">
            Be the first to say hello in <span className="font-semibold text-purple-600">#{currentUserId || 'channel'}</span>!
          </p>
        </div>
      ) : (
        // Message Container - Constrained width for readability on large screens
        <div className="max-w-4xl mx-auto flex flex-col justify-end min-h-0">
          {messages.map((message, index) => (
            <MessageItem
              key={`${message.timestamp}-${index}`}
              message={message}
              isOwnMessage={message.user_id === currentUserId}
            />
          ))}
          {/* Invisible element to scroll to */}
          <div ref={messagesEndRef} className="h-4" /> 
        </div>
      )}
    </div>
  );
};