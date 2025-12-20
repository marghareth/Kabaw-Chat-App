// src/App.tsx

import { useState } from 'react';
import { JoinScreen } from './components/joinScreen';
import { Header } from './components/Headerr';
import { MessageList } from './components/messageList';
import { MessageInput } from './components/messageInput';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('');

  // Only initialize WebSocket when joined
  const websocketProps = isJoined ? { username, channel } : { username: '', channel: '' };
  
  const {
    messages,
    connectionStatus,
    currentUserId,
    sendMessage,
    disconnect,
  } = useWebSocket(websocketProps);

  const handleJoin = (user: string, chan: string) => {
    setUsername(user);
    setChannel(chan);
    setIsJoined(true);
  };

  const handleDisconnect = () => {
    disconnect();
    setIsJoined(false);
    setUsername('');
    setChannel('');
  };

  if (!isJoined) {
    return <JoinScreen onJoin={handleJoin} />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header
        channel={channel}
        username={username}
        userId={currentUserId}
        connectionStatus={connectionStatus}
        onDisconnect={handleDisconnect}
      />
      
      <MessageList
        messages={messages}
        currentUserId={currentUserId}
      />
      
      <MessageInput
        onSendMessage={sendMessage}
        disabled={connectionStatus !== 'connected'}
      />
    </div>
  );
}

export default App;