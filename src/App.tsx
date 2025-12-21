// src/App.tsx

import { useState } from 'react';
import { JoinScreen } from './components/joinScreen';
import { Header } from './components/Header';
import { MessageList } from './components/messageList'; // Note: Ensure filename matches casing
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
      // Changed to 'min-h-dvh' for better mobile browser support
      <div className="min-h-dvh w-full gradient-bg flex items-center justify-center p-4">
        <JoinScreen onJoin={handleJoin} />
      </div>
    );
  }

  return (
    // THE LAYOUT FIX:
    // 1. h-dvh: Forces app to be exactly the height of the visible screen
    // 2. overflow-hidden: Prevents the whole page from scrolling (only messages scroll)
    <div className="flex flex-col h-dvh w-full gradient-bg overflow-hidden relative">
      
      {/* 1. Fixed Header at the top */}
      <Header
        channel={channel}
        username={username}
        userId={currentUserId}
        connectionStatus={connectionStatus}
        onDisconnect={handleDisconnect}
      />
      
      {/* 2. Scrollable Middle Area 
          flex-1: Takes up all remaining space
          relative: allows positioning absolute elements inside if needed
      */}
      <div className="flex-1 w-full overflow-hidden relative flex flex-col">
        <MessageList
          messages={messages}
          currentUserId={currentUserId}
        />
      </div>

      {/* 3. Fixed Input at the bottom */}
      <div className="w-full z-20">
         <MessageInput 
            onSendMessage={sendMessage} 
            disabled={connectionStatus !== 'connected'} 
         />
      </div>
    </div>
  );
}

export default App;