"use client"

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
    <div className="min-h-screen bg-background/60 flex items-center justify-center px-6">
      <div className="w-full max-w-[340px] rounded-2xl bg-card border border-border shadow-lg p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-md mb-4">
            <MessageCircle className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">Join Chat</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your details to connect</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-4">
            {/* Username */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 ml-1">
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background/60 text-sm text-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  required
                />
              </div>
            </div>

            {/* Channel */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 ml-1">
                Channel
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  placeholder="Enter channel name"
                  className="w-full px-4 py-2.5 rounded-xl border border-input bg-background/60 text-sm text-foreground
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                  required
                />
              </div>
            </div>
          </div>

          {/* CTA + Status */}
          <div className="space-y-3 pt-1">
            <button
              type="submit"
              disabled={!username.trim() || !channel.trim()}
              className="w-full py-3 rounded-xl font-semibold text-primary-foreground
                bg-gradient-to-r from-primary to-primary/90
                shadow-md shadow-primary/15 hover:shadow-lg hover:shadow-primary/25
                transition active:scale-[0.98]
                disabled:opacity-50 disabled:pointer-events-none"
            >
              Connect to Chat
            </button>

            <div className="flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-success" />
              <span className="text-[11px] font-medium tracking-widest uppercase text-muted-foreground">
                Server Online
              </span>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="pt-4 border-t border-border/40 opacity-80">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 text-center">
            Connection Details
          </p>
          <div className="bg-muted/20 rounded-lg p-3 border border-border/30">
            <p className="text-[11px] text-muted-foreground/80 leading-relaxed text-center">
              Make sure the server is running on{" "}
              <code className="px-1 rounded bg-secondary/40 font-mono text-foreground/80">ws://localhost:8080</code> to
              start chatting.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
