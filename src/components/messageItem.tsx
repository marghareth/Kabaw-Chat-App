import type { Message } from "../types/message.types"
import { AlertCircle } from "lucide-react"

interface MessageItemProps {
  message: Message
  isOwnMessage: boolean
}

export const MessageItem = ({ message, isOwnMessage }: MessageItemProps) => {
  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

  const getAvatarColor = (name: string) => {
    const colors = ['#5865f2','#3ba55c','#eb459e','#faa61a','#ed4245']
    const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  // System message
  if (message.type !== 'message') {
    const isError = message.content.includes('error') || message.content.includes('not found')
    return (
      <div className="message-item" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4px 0',
        margin: '4px 0',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '4px 12px',
          background: isError ? 'rgba(242,63,66,0.08)' : 'var(--bg-elevated)',
          borderRadius: '20px',
          border: `1px solid ${isError ? 'rgba(242,63,66,0.2)' : 'var(--border)'}`,
        }}>
          {isError && <AlertCircle size={13} color="var(--red)" />}
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            {message.content}
          </span>
        </div>
      </div>
    )
  }

  // Own message — right aligned
  if (isOwnMessage) {
    return (
      <div className="message-item" style={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '2px 0',
        marginBottom: '2px',
      }}>
        <div style={{ maxWidth: '65%', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <div style={{
            padding: '9px 14px',
            background: 'var(--accent)',
            borderRadius: '16px 16px 4px 16px',
            fontSize: '14px',
            color: 'white',
            lineHeight: 1.5,
          }} className="wrap-break-word">
            {message.content}
          </div>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', paddingRight: '2px' }}>
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    )
  }

  // Other user — left aligned
  return (
    <div className="message-item" style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '10px',
      padding: '2px 0',
      marginBottom: '2px',
    }}>
      {/* Avatar */}
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: getAvatarColor(message.username),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '13px',
        fontWeight: 600,
        color: 'white',
        flexShrink: 0,
        marginTop: '2px',
      }}>
        {message.username.substring(0, 1).toUpperCase()}
      </div>

      {/* Content */}
      <div style={{ maxWidth: '65%' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
            {message.username}
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {formatTime(message.timestamp)}
          </span>
        </div>
        <div style={{
          padding: '9px 14px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '4px 16px 16px 16px',
          fontSize: '14px',
          color: 'var(--text-primary)',
          lineHeight: 1.5,
        }} className="wrap-break-word">
          {message.content}
        </div>
      </div>
    </div>
  )
}