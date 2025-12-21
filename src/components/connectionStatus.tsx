// src/components/ConnectionStatus.tsx
import { ConnectionStatus as Status } from '../types/websocket.types';

interface ConnectionStatusProps {
  status: Status;
}

export const ConnectionStatus = ({ status }: ConnectionStatusProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          dot: 'bg-green-500',
          text: 'Connected',
          textColor: 'text-green-600',
        };
      case 'connecting':
        return {
          dot: 'bg-yellow-500 animate-pulse',
          text: 'Connecting...',
          textColor: 'text-yellow-600',
        };
      case 'disconnected':
      case 'error':
        return {
          dot: 'bg-red-500',
          text: 'Disconnected',
          textColor: 'text-red-600',
        };
    }
  };

  const config = getStatusConfig();

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className={`text-sm font-medium ${config.textColor}`}>{config.text}</span>
    </div>
  );
};