// src/components/JoinScreen.tsx

import { useState } from 'react';
import { User, Hash } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
            <Hash className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Kabaw Chat
          </h1>
          <p className="text-gray-600">Join the conversation</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="channel" className="block text-sm font-medium text-gray-700 mb-2">
              Channel
            </label>
            <div className="relative">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                id="channel"
                type="text"
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                placeholder="Enter channel name"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={!username.trim() || !channel.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Join Chat
          </button>
        </form>

        {/* Info */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-700">
            <strong>Note:</strong> Make sure the WebSocket server is running on{' '}
            <code className="bg-blue-100 px-1 py-0.5 rounded">ws://localhost:8080</code>
          </p>
        </div>
      </div>
    </div>
  );
};