import Header from './components/Layout/Header';
import ChatContainer from './components/Chat/ChatContainer';
import { useChat } from './hooks/useChat';

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
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-2 text-red-700 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatContainer
          messages={messages}
          isLoading={isLoading}
          uploadingFile={uploadingFile}
          onSend={sendMessage}
          onFileUpload={uploadFile}
          onNewChat={startNewChat}
        />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-3">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-gray-400">
          Powered by OpenAI | Berufsberatung für Schüler
        </div>
      </footer>
    </div>
  );
}

export default App;
