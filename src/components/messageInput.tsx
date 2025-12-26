"use client"

import { useState, type KeyboardEvent, useRef, useEffect } from "react"
import { Send, Paperclip, Smile } from "lucide-react"

interface MessageInputProps {
  onSendMessage: (content: string) => void
  disabled?: boolean
}

export const MessageInput = ({ onSendMessage, disabled }: MessageInputProps) => {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }, [message])

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message)
      setMessage("")
      if (textareaRef.current) textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="bg-card px-6 py-4 shadow-sm">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3">
          {/* Attachment Button */}
          <button
            disabled={disabled}
            className="p-2.5 text-muted-foreground hover:bg-muted hover:text-foreground rounded-xl transition-colors disabled:opacity-50"
            title="Attach file"
          >
            <Paperclip size={20} />
          </button>

          {/* Input Container */}
          <div className="flex-1 relative bg-muted/30 rounded-xl overflow-hidden focus-within:bg-muted/50 transition-all">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={disabled ? "Connecting..." : "Type a message..."}
              disabled={disabled}
              rows={1}
              className="w-full px-4 py-3 pr-12 bg-transparent focus:outline-none text-foreground placeholder:text-muted-foreground resize-none"
              style={{ minHeight: "48px", maxHeight: "120px" }}
            />

            {/* Emoji Button */}
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
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
            className={`p-3 rounded-xl transition-all ${
              message.trim() && !disabled
                ? "bg-primary text-primary-foreground hover:bg-accent shadow-md hover:shadow-lg"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            title="Send message"
          >
            <Send size={20} className={message.trim() ? "fill-current" : ""} />
          </button>
        </div>

        {/* Hint Text */}
        <div className="mt-2 text-center">
          <span className="text-xs text-muted-foreground">
            Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono text-foreground">Enter</kbd> to
            send •{" "}
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono text-foreground">Shift + Enter</kbd>{" "}
            for new line
          </span>
        </div>
      </div>
    </div>
  )
}
