import { useChat } from './hooks/useChat';
import ChatView from './components/ChatView';

function App() {
  const {
    messages,
    isLoading,
    error,
    sendMessage,
    startNewChat,
  } = useChat();

  return (
    <div className="h-screen h-dvh flex flex-col bg-white">
      <ChatView
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSend={sendMessage}
        onNewChat={startNewChat}
      />
    </div>
  );
}

export default App;
