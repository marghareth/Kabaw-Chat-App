// src/components/MessageInput.tsx

import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, Plus, Smile } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      // Reset height
      if (textareaRef.current) textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    // Outer Container: Glass background with a crisp top border
    <div className="w-full glass border-t border-white/40 pb-safe pt-2 px-4 backdrop-blur-xl z-20">
      <div className="max-w-4xl mx-auto py-3">
        <div className="flex items-end gap-3">
          
          {/* 1. Attachment Button (The '+' style like iOS) */}
          <button
            disabled={disabled}
            className="mb-1.25 p-2 rounded-full text-slate-500 hover:bg-slate-100/50 hover:text-slate-700 transition-colors disabled:opacity-50"
          >
            <Plus size={24} strokeWidth={2.5} />
          </button>

          {/* 2. The Input Capsule */}
          <div className="flex-1 relative bg-slate-100/80 focus-within:bg-white border border-transparent focus-within:border-purple-200 transition-all rounded-3xl overflow-hidden">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={disabled ? "Connecting..." : "iMessage..."}
              disabled={disabled}
              rows={1}
              className="w-full px-5 py-3 bg-transparent focus:outline-none text-slate-800 placeholder:text-slate-400 resize-none max-h-30"
              style={{ minHeight: '48px' }}
            />
            
            {/* Emoji Button inside the capsule (Right side) */}
            <button 
              className="absolute right-3 bottom-2.5 p-1 text-slate-400 hover:text-purple-500 transition-colors"
              disabled={disabled}
            >
              <Smile size={20} />
            </button>
          </div>
            
          {/* 3. Send Button - Only shows blue when typeable */}
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className={`mb-1.25 p-2.5 rounded-full transition-all duration-300 shadow-sm
              ${message.trim() && !disabled
                ? 'bg-blue-600 text-white shadow-blue-500/30 rotate-0 scale-100 hover:bg-blue-700' 
                : 'bg-slate-200 text-slate-400 rotate-90 scale-90 cursor-not-allowed'
              }`}
          >
            <Send size={20} fill={message.trim() ? "currentColor" : "none"} />
          </button>
        </div>
        
        {/* Helper text for disconnected state */}
        {disabled && (
          <div className="text-center mt-2">
            <span className="text-[10px] uppercase font-bold tracking-wider text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              Reconnecting
            </span>
          </div>
        )}
      </div>
    </div>
  );
};