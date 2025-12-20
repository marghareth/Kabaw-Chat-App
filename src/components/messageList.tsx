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
    <div className="flex-1 overflow-y-auto p-4 bg-white">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        <div className="space-y-2">
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