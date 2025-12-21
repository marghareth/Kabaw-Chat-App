// src/components/MessageList.tsx
import { useEffect, useRef } from 'react';
import { Message } from '../types/message.types';
import { MessageItem } from './messageItem'; 
import { MessageSquare } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#f0f2f5]">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mb-4">
            <MessageSquare className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">No messages yet</h3>
          <p className="text-sm text-gray-500">Be the first to say hello!</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <MessageItem
              key={`${message.timestamp}-${index}`}
              message={message}
              isOwnMessage={message.user_id === currentUserId}
            />
          ))}
          <div ref={messagesEndRef} className="h-4" /> 
        </div>
      )}
    </div>
  );
};