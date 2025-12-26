"use client"

import { ConnectionStatus } from "./connectionStatus"
import type { ConnectionStatus as Status } from "../types/websocket.types"
import { Hash, Settings, LogOut, Users } from "lucide-react"

interface HeaderProps {
  channel: string
  username: string
  userId?: string
  connectionStatus: Status
  onDisconnect: () => void
}

export const Header = ({ channel, username, userId, connectionStatus, onDisconnect }: HeaderProps) => {
  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-indigo-500", "bg-cyan-500", "bg-teal-500", "bg-emerald-500"]
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Channel Info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Hash size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">{channel}</h1>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users size={12} />
              <span>3 members online</span>
            </div>
          </div>
        </div>

        {/* Right: User & Controls */}
        <div className="flex items-center gap-3">
          <ConnectionStatus status={connectionStatus} />

          <button
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            title="Settings"
          >
            <Settings size={20} />
          </button>

          {/* User Avatar & Info */}
          <div className="flex items-center gap-3 pl-3 border-l border-border">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-foreground">{username}</p>
              {userId && <p className="text-xs text-muted-foreground">#{userId.substring(0, 6)}</p>}
            </div>
            <div
              className={`w-10 h-10 rounded-full ${getAvatarColor(username)} flex items-center justify-center text-white text-sm font-semibold shadow-sm`}
            >
              {username.substring(0, 1).toUpperCase()}
            </div>
          </div>

          <button
            onClick={onDisconnect}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-muted-foreground hover:text-red-500"
            title="Disconnect"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  )
}
