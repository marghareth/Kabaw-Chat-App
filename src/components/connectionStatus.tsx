import { ConnectionStatus as Status } from '../types/websocket.types'

interface ConnectionStatusProps {
  status: Status
}

export const ConnectionStatus = ({ status }: ConnectionStatusProps) => {
  const config = {
    connected:    { color: 'var(--green)',  label: 'Connected' },
    connecting:   { color: 'var(--yellow)', label: 'Connecting...' },
    disconnected: { color: 'var(--red)',    label: 'Disconnected' },
    error:        { color: 'var(--red)',    label: 'Disconnected' },
  }[status]

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: config.color,
        animation: status === 'connecting' ? 'pulse 1.2s ease-in-out infinite' : 'none',
      }} />
      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>
        {config.label}
      </span>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}