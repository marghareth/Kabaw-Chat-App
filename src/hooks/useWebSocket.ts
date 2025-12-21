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
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const messageIdsRef = useRef<Set<string>>(new Set());
  const usernameRef = useRef(username);
  const channelRef = useRef(channel);
  const connectRef = useRef<(() => void) | null>(null);

  // Update refs when props change
  useEffect(() => {
    usernameRef.current = username;
    channelRef.current = channel;
  }, [username, channel]);

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log('[FRONTEND-CONNECT] Already connected');
      return;
    }

    const currentUsername = usernameRef.current;
    const currentChannel = channelRef.current;

    if (!currentUsername || !currentChannel) return;

    const wsUrl = `${WS_URL}?username=${encodeURIComponent(currentUsername)}&channel=${encodeURIComponent(currentChannel)}`;
    console.log('[FRONTEND-CONNECT] Attempting to connect to:', wsUrl);
    
    setConnectionStatus('connecting');

    try {
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log(`[FRONTEND-CONNECT] Connected to WebSocket as ${currentUsername} in channel ${currentChannel}`);
        setConnectionStatus('connected');
        reconnectAttemptsRef.current = 0;
      };

      ws.onmessage = (event) => {
        try {
          const message: Message = JSON.parse(event.data);
          console.log('[FRONTEND-MESSAGE]', JSON.stringify(message, null, 2));

          const messageId = `${message.timestamp}-${message.username}-${message.content}`;
          
          if (messageIdsRef.current.has(messageId)) {
            console.log('[FRONTEND-MESSAGE] Duplicate message ignored');
            return;
          }
          
          messageIdsRef.current.add(messageId);

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
        console.log(`[FRONTEND-DISCONNECT] Connection closed. Code: ${event.code}`);
        setConnectionStatus('disconnected');
        setCurrentUserId('');
        wsRef.current = null;

        if (reconnectAttemptsRef.current < MAX_RECONNECT_ATTEMPTS) {
          reconnectAttemptsRef.current += 1;
          console.log(`[FRONTEND-RECONNECT] Attempting reconnect ${reconnectAttemptsRef.current}/${MAX_RECONNECT_ATTEMPTS}`);
          
          reconnectTimeoutRef.current = setTimeout(() => {
            // Use the ref to call the latest version of connect
            connectRef.current?.();
          }, RECONNECT_DELAY);
        } else {
          console.log('[FRONTEND-RECONNECT] Max reconnect attempts reached');
        }
      };
    } catch (error) {
      console.error('[FRONTEND-ERROR] Failed to create WebSocket:', error);
      setConnectionStatus('error');
    }
  }, []);

  // Update the ref whenever connect changes
  useEffect(() => {
    connectRef.current = connect;
  }, [connect]);

  const disconnect = useCallback(() => {
    console.log('[FRONTEND-DISCONNECT] User initiated disconnect');
    
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    reconnectAttemptsRef.current = MAX_RECONNECT_ATTEMPTS;
    
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    setConnectionStatus('disconnected');
    setCurrentUserId('');
    setMessages([]);
    messageIdsRef.current.clear();
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

  useEffect(() => {
    if (username && channel) {
      // Use queueMicrotask to avoid synchronous setState warning
      queueMicrotask(() => {
        connect();
      });
    }

    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [username, channel, connect]);

  return {
    messages,
    connectionStatus,
    currentUserId,
    sendMessage,
    connect,
    disconnect,
  };
};