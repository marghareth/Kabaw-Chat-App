// src/components/JoinScreen.tsx

import { useState } from 'react';
import { User, Hash, Wifi } from 'lucide-react';

interface JoinScreenProps {
  onJoin: (username: string, channel: string) => void;
}

export const JoinScreen = ({ onJoin }: JoinScreenProps) => {
  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && channel.trim()) {
      onJoin(username.trim(), channel.trim());
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center p-4">
      <div className="glass rounded-3xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Wifi className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Kabaw Discord Test Client
          </h1>
          <p className="text-gray-600 text-sm">Connection Settings</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Channel
            </label>
            <div className="relative">
              <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="Enter channel name"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Server Status */}
          <div className="flex items-center justify-center gap-2 py-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-gray-600">Server Online</span>
          </div>

          {/* Connect Button */}
          <button
            type="submit"
            disabled={!username.trim() || !channel.trim()}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-3.5 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Connect
          </button>
        </form>

        {/* Instructions */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-600 mb-2 font-medium">Instructions:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• Enter username and channel</li>
            <li>• Click Connect to join</li>
            <li>• Start chatting!</li>
          </ul>
          
          <div className="mt-4 p-3 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-xs text-blue-700">
              <strong>Note:</strong> Make sure the WebSocket server is running on{' '}
              <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono">ws://localhost:8080</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};