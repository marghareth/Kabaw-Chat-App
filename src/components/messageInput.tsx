// src/components/MessageInput.tsx
import { useState, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    <div className="bg-white border-t border-gray-200 px-4 py-3">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3">
          {/* Attachment Button */}
          <button
            disabled={disabled}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 mb-1"
            title="Attach file"
          >
            <Paperclip size={20} />
          </button>

          {/* Input Container */}
          <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={disabled ? "Connecting..." : "Type your message..."}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 bg-transparent focus:outline-none text-gray-800 placeholder:text-gray-500 resize-none"
              style={{ minHeight: '44px', maxHeight: '120px' }}
            />
            
            {/* Emoji Button */}
            <button 
              className="absolute right-3 bottom-3 p-1 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={disabled}
              title="Add emoji"
            >
              <Smile size={20} />
            </button>
          </div>
            
          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={disabled || !message.trim()}
            className={`p-2.5 rounded-lg transition-all mb-1 ${
              message.trim() && !disabled
                ? 'bg-linear-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600 shadow-md' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            title="Send message"
          >
            <Send size={20} className={message.trim() ? 'fill-current' : ''} />
          </button>
        </div>
        
        {/* Hint Text */}
        <div className="mt-2 text-center">
          <span className="text-xs text-gray-500">
            Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-[10px] font-mono">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-[10px] font-mono">Shift</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-[10px] font-mono">Enter</kbd> for new line
          </span>
        </div>
      </div>
    </div>
  );
};