import type { Message } from "../types/message.types"
import { AlertCircle, CheckCheck } from "lucide-react"

interface MessageItemProps {
  message: Message
  isOwnMessage: boolean
}

export const MessageItem = ({ message, isOwnMessage }: MessageItemProps) => {
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getAvatarColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-indigo-500", "bg-cyan-500", "bg-teal-500", "bg-emerald-500"]
    const hash = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }

  // System Messages
  if (message.type !== "message") {
    const isError = message.content.includes("not found") || message.content.includes("error")

    return (
      <div className="flex items-start gap-3 mb-4 message-item">
        {/* System Avatar */}
        <div
          className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
            isError ? "bg-error" : "bg-warning"
          } shadow-sm`}
        >
          <span className="text-white font-bold text-sm">S</span>
        </div>

        {/* System Message Content */}
        <div className="flex-1 max-w-3xl">
          <div className="flex items-baseline gap-2 mb-1.5">
            <span className="font-semibold text-foreground text-sm">System</span>
            <span className="text-xs text-muted-foreground">Just now</span>
          </div>

          {/* Message Bubble */}
          <div className="bg-card rounded-2xl px-4 py-3 shadow-sm border border-border inline-block">
            {isError && (
              <div className="flex items-start gap-2 text-foreground text-sm">
                <AlertCircle size={16} className="text-error shrink-0 mt-0.5" />
                <span className="wrap-break-word">{message.content}</span>
              </div>
            )}
            {!isError && <p className="text-foreground text-sm wrap-break-word">{message.content}</p>}
          </div>
        </div>
      </div>
    )
  }

  // User's Own Messages (Right side)
  if (isOwnMessage) {
    return (
      <div className="flex justify-end mb-4 message-item">
        <div className="flex flex-col items-end max-w-[70%]">
          {/* Time and Username */}
          <div className="flex items-baseline gap-2 mb-1.5 px-1">
            <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
            <span className="font-medium text-foreground text-sm">You</span>
          </div>

          {/* Message Bubble */}
          <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-3 shadow-md inline-block">
            <p className="text-sm leading-relaxed wrap-break-word">{message.content}</p>
          </div>

          {/* Read receipt */}
          <div className="flex items-center gap-1 mt-1 px-1">
            <CheckCheck size={14} className="text-muted-foreground" />
          </div>
        </div>
      </div>
    )
  }

  // Other Users' Messages (Left side)
  return (
    <div className="flex items-start gap-3 mb-4 message-item">
      {/* User Avatar */}
      <div
        className={`shrink-0 w-10 h-10 rounded-xl ${getAvatarColor(message.username)} flex items-center justify-center text-white font-semibold text-sm shadow-sm`}
      >
        {message.username.substring(0, 1).toUpperCase()}
      </div>

      {/* Message Content */}
      <div className="flex-1 max-w-[70%]">
        <div className="flex items-baseline gap-2 mb-1.5">
          <span className="font-semibold text-foreground text-sm">{message.username}</span>
          <span className="text-xs text-muted-foreground">{formatTime(message.timestamp)}</span>
        </div>

        {/* Message Bubble */}
        <div className="bg-card rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-border inline-block">
          <p className="text-sm leading-relaxed wrap-break-word text-foreground">{message.content}</p>
        </div>
      </div>
    </div>
  )
}
