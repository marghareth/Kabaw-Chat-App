// src/components/Header.tsx
import { ConnectionStatus } from './connectionStatus';
import { ConnectionStatus as Status } from '../types/websocket.types';
import { Hash, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  channel: string;
  username: string;
  userId?: string;
  connectionStatus: Status;
  onDisconnect: () => void;
}

export const Header = ({ channel, username, userId, connectionStatus, onDisconnect }: HeaderProps) => {
  // Generate avatar color based on username
  const getAvatarColor = (name: string) => {
    const colors = [
      'bg-purple-500',
      'bg-blue-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-cyan-500',
    ];
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        
        {/* Left: Channel Info */}
        <div className="flex items-center gap-3">
          <Hash size={20} className="text-gray-500" />
          <h1 className="text-lg font-semibold text-gray-800">{channel}</h1>
          <div className="hidden sm:flex items-center gap-2 px-2 py-1 bg-gray-100 rounded text-xs text-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            <span>3</span>
          </div>
        </div>
        
        {/* Right: User & Controls */}
        <div className="flex items-center gap-3">
          <ConnectionStatus status={connectionStatus} />
          
          <button
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
            title="Settings"
          >
            <Settings size={20} />
          </button>
          
          {/* User Avatar & Info */}
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${getAvatarColor(username)} flex items-center justify-center text-white text-sm font-semibold`}>
              {username.substring(0, 1).toUpperCase()}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{username}</p>
              {userId && (
                <p className="text-xs text-gray-500">ID: demo-{userId.substring(0, 3)}</p>
              )}
            </div>
          </div>
          
          <button
            onClick={onDisconnect}
            className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-500"
            title="Disconnect"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};