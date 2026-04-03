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

  const { messages, connectionStatus, currentUserId, sendMessage, disconnect } = useWebSocket(websocketProps);

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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100%',
      background: 'var(--bg-base)',
      overflow: 'hidden',
    }}>
      <Header
        channel={channel}
        username={username}
        userId={currentUserId}
        connectionStatus={connectionStatus}
        onDisconnect={handleDisconnect}
      />
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <MessageList messages={messages} currentUserId={currentUserId} />
      </div>
      <MessageInput
        onSendMessage={sendMessage}
        disabled={connectionStatus !== 'connected'}
      />
    </div>
  );
}

export default App;