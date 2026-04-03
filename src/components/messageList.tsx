import { useEffect, useRef } from "react"
import type { Message } from "../types/message.types"
import { MessageItem } from "./messageItem"
import { MessageSquare } from "lucide-react"

interface MessageListProps {
  messages: Message[]
  currentUserId: string
}

export const MessageList = ({ messages, currentUserId }: MessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '16px 20px',
      background: 'var(--bg-base)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}>
      {messages.length === 0 ? (
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          color: 'var(--text-muted)',
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <MessageSquare size={24} color="var(--text-muted)" />
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
              No messages yet
            </p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Be the first to say hello!
            </p>
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
          {messages.map((message, index) => (
            <MessageItem
              key={`${message.timestamp}-${index}`}
              message={message}
              isOwnMessage={message.user_id === currentUserId}
            />
          ))}
          <div ref={messagesEndRef} style={{ height: '8px' }} />
        </div>
      )}
    </div>
  )
}