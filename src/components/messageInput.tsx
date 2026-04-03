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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const canSend = message.trim() && !disabled

  return (
    <div style={{
      background: 'var(--bg-surface)',
      borderTop: '1px solid var(--border)',
      padding: '12px 16px 16px',
      flexShrink: 0,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        gap: '8px',
        background: 'var(--bg-elevated)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '4px 4px 4px 8px',
        transition: 'border-color 0.2s',
      }}
        onFocusCapture={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(88,101,242,0.5)'}
        onBlurCapture={e => (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)'}
      >
        {/* Attach */}
        <button
          disabled={disabled}
          title="Attach file"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            opacity: disabled ? 0.4 : 1,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => !disabled && ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
        >
          <Paperclip size={18} />
        </button>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Connecting..." : "Message #channel"}
          disabled={disabled}
          rows={1}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '14px',
            lineHeight: 1.5,
            resize: 'none',
            padding: '8px 4px',
            minHeight: '36px',
            maxHeight: '120px',
            fontFamily: 'inherit',
          }}
        />

        {/* Emoji */}
        <button
          disabled={disabled}
          title="Add emoji"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            opacity: disabled ? 0.4 : 1,
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => !disabled && ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
        >
          <Smile size={18} />
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!canSend}
          title="Send message"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            background: canSend ? 'var(--accent)' : 'transparent',
            color: canSend ? 'white' : 'var(--text-muted)',
            cursor: canSend ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => canSend && ((e.currentTarget as HTMLButtonElement).style.background = 'var(--accent-hover)')}
          onMouseLeave={e => canSend && ((e.currentTarget as HTMLButtonElement).style.background = 'var(--accent)')}
        >
          <Send size={16} />
        </button>
      </div>

      {/* Hint */}
      <p style={{
        textAlign: 'center',
        fontSize: '11px',
        color: 'var(--text-muted)',
        marginTop: '8px',
      }}>
        <kbd style={{
          background: 'var(--bg-hover)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '1px 5px',
          fontFamily: 'monospace',
          fontSize: '10px',
          color: 'var(--text-secondary)',
        }}>Enter</kbd>
        {' '}to send &nbsp;·&nbsp;{' '}
        <kbd style={{
          background: 'var(--bg-hover)',
          border: '1px solid var(--border)',
          borderRadius: '4px',
          padding: '1px 5px',
          fontFamily: 'monospace',
          fontSize: '10px',
          color: 'var(--text-secondary)',
        }}>Shift+Enter</kbd>
        {' '}for new line
      </p>
    </div>
  )
}