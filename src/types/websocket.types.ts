// src/types/websocket.types.ts

export type ConnectionStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface WebSocketConfig {
  url: string;
  username: string;
  channel: string;
  reconnectDelay?: number;
  maxReconnectAttempts?: number;
}