import type React from "react"
import { useState } from "react"
import { MessageCircle } from "lucide-react"

interface JoinScreenProps {
  onJoin: (username: string, channel: string) => void
}

export const JoinScreen = ({ onJoin }: JoinScreenProps) => {
  const [username, setUsername] = useState("")
  const [channel, setChannel] = useState("general")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim() && channel.trim()) {
      onJoin(username.trim(), channel.trim())
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-base)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Subtle background glow */}
      <div style={{
        position: 'fixed',
        top: '30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '500px',
        height: '300px',
        background: 'radial-gradient(ellipse, rgba(88,101,242,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '360px',
        background: 'var(--bg-surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '36px 32px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            background: 'var(--accent)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <MessageCircle size={26} color="white" />
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '6px' }}>
            Welcome to Kabaw
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Enter your details to start chatting
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Username */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '6px',
            }}>
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Channel */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              marginBottom: '6px',
            }}>
              Channel
            </label>
            <input
              type="text"
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              placeholder="general"
              required
              style={{
                width: '100%',
                padding: '10px 14px',
                background: 'var(--bg-input)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={e => e.target.style.borderColor = 'var(--accent)'}
              onBlur={e => e.target.style.borderColor = 'var(--border)'}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!username.trim() || !channel.trim()}
            style={{
              marginTop: '4px',
              width: '100%',
              padding: '11px',
              background: 'var(--accent)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.2s, opacity 0.2s',
              opacity: (!username.trim() || !channel.trim()) ? 0.5 : 1,
            }}
            onMouseEnter={e => (e.target as HTMLButtonElement).style.background = 'var(--accent-hover)'}
            onMouseLeave={e => (e.target as HTMLButtonElement).style.background = 'var(--accent)'}
          >
            Connect to Chat
          </button>

          {/* Server status */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--green)' }} />
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
              Server online
            </span>
          </div>
        </form>

        {/* Footer note */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.6 }}>
            Make sure the server is running on{' '}
            <code style={{
              background: 'var(--bg-elevated)',
              padding: '1px 6px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              color: 'var(--text-secondary)',
            }}>
              ws://localhost:8080
            </code>
          </p>
        </div>
      </div>
    </div>
  )
}