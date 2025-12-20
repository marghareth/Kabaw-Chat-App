// src/components/ConnectionStatus.tsx

import { ConnectionStatus as Status } from '../types/websocket.types';
import { Wifi, WifiOff, Loader2 } from 'lucide-react';

interface ConnectionStatusProps {
  status: Status;
}

export const ConnectionStatus = ({ status }: ConnectionStatusProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: <Wifi size={16} />,
          text: 'Connected',
          color: 'text-green-500',
          bgColor: 'bg-green-500/10',
        };
      case 'connecting':
        return {
          icon: <Loader2 size={16} className="animate-spin" />,
          text: 'Connecting...',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-500/10',
        };
      case 'disconnected':
      case 'error':
        return {
          icon: <WifiOff size={16} />,
          text: 'Disconnected',
          color: 'text-red-500',
          bgColor: 'bg-red-500/10',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${config.bgColor} ${config.color}`}>
      {config.icon}
      <span className="text-xs font-medium">{config.text}</span>
    </div>
  );
};