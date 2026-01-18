import { useChat } from './hooks/useChat';
import ChatView from './components/ChatView';

function App() {
  const {
    messages,
    isLoading,
    uploadingFile,
    error,
    sendMessage,
    uploadFile,
    startNewChat,
  } = useChat();

  return (
    <div className="h-screen h-dvh flex flex-col bg-white">
      <ChatView
        messages={messages}
        isLoading={isLoading}
        uploadingFile={uploadingFile}
        error={error}
        onSend={sendMessage}
        onFileUpload={uploadFile}
        onNewChat={startNewChat}
      />
    </div>
  );
}

export default App;
