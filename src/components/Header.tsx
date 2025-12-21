// src/components/Header.tsx
import { ConnectionStatus } from './connectionStatus';
import { ConnectionStatus as Status } from '../types/websocket.types';
import { Hash, User, LogOut } from 'lucide-react';

interface HeaderProps {
  channel: string;
  username: string;
  userId?: string;
  connectionStatus: Status;
  onDisconnect: () => void;
}

export const Header = ({ channel, username, userId, connectionStatus, onDisconnect }: HeaderProps) => {
  return (
    // FIX 1: Changed solid background to 'glass' (using your index.css class)
    // FIX 2: Added 'sticky top-0 z-50' so it stays pinned while messages scroll under it
    // FIX 3: Added a subtle white border at the bottom for that "premium" feel
    <header className="sticky top-0 z-50 w-full glass border-b border-white/40 shadow-sm px-6 py-4 backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Left: Channel Indicator */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-slate-800">
            <div className="p-2.5 bg-white/50 rounded-xl shadow-sm border border-white/60 text-purple-600">
              <Hash size={20} />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">{channel}</h1>
              <span className="text-xs text-slate-500 font-medium ml-0.5">Active Channel</span>
            </div>
          </div>
        </div>
        
        {/* Right: User & Controls */}
        <div className="flex items-center gap-3 sm:gap-6">
          
          {/* User Profile Pill */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-white/40 rounded-full border border-white/50 shadow-sm">
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-slate-700 leading-none">{username}</span>
              {userId && (
                <span className="text-[10px] text-slate-500 font-mono">
                  #{userId.substring(0, 4)}
                </span>
              )}
            </div>
            <div className="p-1.5 bg-linear-to-br from-purple-500 to-blue-500 rounded-full text-white shadow-sm">
              <User size={14} />
            </div>
          </div>

          <div className="h-8 w-px bg-slate-300/50 hidden sm:block"></div>

          <ConnectionStatus status={connectionStatus} />
          
          <button
            onClick={onDisconnect}
            className="p-2.5 rounded-xl bg-white/40 hover:bg-red-50 text-slate-500 hover:text-red-500 transition-all border border-transparent hover:border-red-100"
            title="Disconnect"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};