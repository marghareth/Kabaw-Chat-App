// src/components/MessageInput.tsx

import { useState, KeyboardEvent } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="glass border-t border-white/30 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          {/* Action Buttons */}
          <div className="flex gap-2 mb-2">
            <button
              disabled={disabled}
              className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-30"
              title="Attach file"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>
            <button
              disabled={disabled}
              className="w-10 h-10 rounded-full bg-white/50 hover:bg-white/70 backdrop-blur-sm flex items-center justify-center transition-all disabled:opacity-30"
              title="Add emoji"
            >
              <Smile className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Input Field */}
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={disabled ? "Disconnected..." : "Type your message..."}
              disabled={disabled}
              rows={1}
              className="w-full px-5 py-3 pr-14 rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
            
            {/* Send Button */}
            <button
              onClick={handleSend}
              disabled={disabled || !message.trim()}
              className="absolute right-2 bottom-2 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 text-white flex items-center justify-center transition-all hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-md"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Hint Text */}
        {!disabled && (
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press <kbd className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-mono">Enter</kbd> to send • <kbd className="px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-mono">Shift + Enter</kbd> for new line
          </p>
        )}
      </div>
    </div>
  );
};