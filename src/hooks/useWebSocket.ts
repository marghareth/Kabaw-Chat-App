// src/hooks/useWebSocket.ts

import { useState, useEffect, useRef, useCallback } from 'react';
import { Message, OutgoingMessage } from '../types/message.types';
import { ConnectionStatus } from '../types/websocket.types';
import { WS_URL, RECONNECT_DELAY, MAX_RECONNECT_ATTEMPTS } from '../utils/constants';

interface UseWebSocketProps {
  username: string;
  channel: string;
}

export const useWebSocket = ({ username, channel }: UseWebSocketProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [currentUserId, setCurrentUserId] = useState<string>('');
  
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectAttemptsRef = useRef(0);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('[FRONTEND-CONNECT] Already connected');
      return;
    }

    const wsUrl = `${WS_URL}?username=${encodeURIComponent(username)}&channel=${encodeURIComponent(channel)}`;
    console.log('[FRONTEND-CONNECT] Attempting to connect to:', wsUrl);
    
    setConnectionStatus('connecting');

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log(`[FRONTEND-CONNECT] Connected to WebSocket as ${username} in channel ${channel}`);
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message: Message = JSON.parse(event.data);
          console.log('[FRONTEND-MESSAGE]', JSON.stringify(message, null, 2));

          // Handle user_connected message to get user ID
          if (message.type === 'user_connected' && message.user_id) {
            setCurrentUserId(message.user_id);
            console.log('[FRONTEND-USER-ID] Assigned user ID:', message.user_id);
          }

          setMessages((prev) => [...prev, message]);
        } catch (error) {
          console.error('[FRONTEND-ERROR] Failed to parse message:', error);
        }
      };

      ws.onerror = (error) => {
        console.error('[FRONTEND-ERROR] WebSocket error:', error);
        setConnectionStatus('error');
      };

      ws.onclose = (event) => {
        console.log(`[FRONTEND-DISCONNECT] Connection closed. Code: ${event.code}, Reason: ${event.reason}`);
        setConnectionStatus('disconnected');
        setCurrentUserId('');
        console.log('[FRONTEND-USER-ID] User ID cleared');
        wsRef.current = null;

        // Auto-reconnect logic
        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;
          console.log(`[FRONTEND-RECONNECT] Attempting reconnect ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            connect();
          }, RECONNECT_DELAY);
        } else {
          console.log('[FRONTEND-RECONNECT] Max reconnect attempts reached');
        }
      };
    } catch (error) {
      console.error('[FRONTEND-ERROR] Failed to create WebSocket:', error);
      setConnectionStatus('error');
    }
  }, [username, channel]);

  const disconnect = useCallback(() => {
    console.log('[FRONTEND-DISCONNECT] User initiated disconnect');
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    reconnectAttemptsRef.current = MAX_RECONNECT_ATTEMPTS; // Prevent auto-reconnect
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setConnectionStatus('disconnected');
    setCurrentUserId('');
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
      console.error('[FRONTEND-SEND] Cannot send message: WebSocket not connected');
      return false;
    }

    if (!content.trim()) {
      console.warn('[FRONTEND-SEND] Cannot send empty message');
      return false;
    }

    const message: OutgoingMessage = {
      type: 'message',
      content: content.trim(),
    };

    try {
      const messageStr = JSON.stringify(message);
      console.log('[FRONTEND-SEND]', messageStr);
      wsRef.current.send(messageStr);
      return true;
    } catch (error) {
      console.error('[FRONTEND-ERROR] Failed to send message:', error);
      return false;
    }
  }, []);

  // Auto-connect on mount
  useEffect(() => {
    connect();

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connect]);

  return {
    messages,
    connectionStatus,
    currentUserId,
    sendMessage,
    connect,
    disconnect,
  };
};