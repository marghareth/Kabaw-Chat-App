// src/App.tsx

import { useState } from 'react';
import { JoinScreen } from './components/joinScreen';
import { Header } from './components/Header';
import { MessageList } from './components/messageList';
import { MessageInput } from './components/messageInput';
import { useWebSocket } from './hooks/useWebSocket';

function App() {
  const [isJoined, setIsJoined] = useState(false);
  const [username, setUsername] = useState('');
  const [channel, setChannel] = useState('');

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
    return (
      // We add the wrapper div here so the gradient applies to the login screen too
      <div className="flex flex-col h-screen gradient-bg justify-center items-center">
        <JoinScreen onJoin={handleJoin} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen gradient-bg">
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