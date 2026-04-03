import { ConnectionStatus } from "./connectionStatus"
import type { ConnectionStatus as Status } from "../types/websocket.types"
import { Hash, LogOut, Settings } from "lucide-react"

interface HeaderProps {
  channel: string
  username: string
  userId?: string
  connectionStatus: Status
  onDisconnect: () => void
}

export const Header = ({ channel, username, userId, connectionStatus, onDisconnect }: HeaderProps) => {
  const getAvatarColor = (name: string) => {
    const colors = ['#5865f2','#3ba55c','#eb459e','#faa61a','#ed4245']
    const hash = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  return (
    <header style={{
      background: 'var(--bg-surface)',
      borderBottom: '1px solid var(--border)',
      padding: '0 20px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexShrink: 0,
    }}>
      {/* Left: Channel */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Hash size={20} color="var(--text-muted)" strokeWidth={2.5} />
        <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
          {channel}
        </span>
        <div style={{
          width: '1px',
          height: '20px',
          background: 'var(--border)',
          margin: '0 4px',
        }} />
        <ConnectionStatus status={connectionStatus} />
      </div>

      {/* Right: User + actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {/* Settings */}
        <button
          title="Settings"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-hover)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
          }}
        >
          <Settings size={18} />
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 6px' }} />

        {/* Avatar + name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: getAvatarColor(username),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '13px',
            fontWeight: 600,
            color: 'white',
            flexShrink: 0,
          }}>
            {username.substring(0, 1).toUpperCase()}
          </div>
          <div style={{ display: 'none' }} className="sm-show">
            <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {username}
            </p>
            {userId && (
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: 1.2 }}>
                #{userId.substring(0, 6)}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 6px' }} />

        {/* Disconnect */}
        <button
          onClick={onDisconnect}
          title="Disconnect"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            border: 'none',
            background: 'transparent',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s, color 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'rgba(242,63,66,0.15)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--red)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'
          }}
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  )
}