// src/components/MessageList.tsx

import { useEffect, useRef } from 'react';
import { Message } from '../types/message.types';
import { MessageItem } from './messageItem'; 

interface MessageListProps {
  messages: Message[];
  currentUserId: string;
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center mb-4 opacity-50">
            <span className="text-4xl">💬</span>
          </div>
          <p className="text-gray-500 text-lg font-medium">No messages yet!</p>
          <p className="text-gray-400 text-sm">Start the conversation</p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {messages.map((message, index) => (
            <MessageItem
              key={`${message.timestamp}-${index}`}
              message={message}
              isOwnMessage={message.user_id === currentUserId && message.type === 'message'}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};