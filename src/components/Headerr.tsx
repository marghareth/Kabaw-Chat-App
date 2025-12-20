// src/components/Header.tsx

import { ConnectionStatus } from './ConnectionStatus';
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
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Hash size={20} />
            <h1 className="text-xl font-semibold">{channel}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <User size={16} />
            <span>{username}</span>
            {userId && (
              <span className="text-white/70">
                • ID: {userId.substring(0, 8)}...
              </span>
            )}
          </div>
          <ConnectionStatus status={connectionStatus} />
          <button
            onClick={onDisconnect}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            title="Disconnect"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};