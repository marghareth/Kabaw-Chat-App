// src/types/message.types.ts

export interface Message {
  type: 'message' | 'system' | 'user_connected';
  username: string;
  user_id?: string;
  content: string;
  timestamp: string;
  channel: string;
}

export interface OutgoingMessage {
  type: 'message';
  content: string;
}

export interface User {
  id: string;
  username: string;
  channel: string;
}