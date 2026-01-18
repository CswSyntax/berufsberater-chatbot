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
    <div className="min-h-screen flex flex-col">
      {/* Gradient Background is set in CSS */}
      <Header />

      {/* Error Banner */}
      {error && (
        <div className="mx-3 sm:mx-4 mt-2">
          <div className="max-w-4xl mx-auto bg-red-500/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
            <div className="flex items-center gap-2 text-white text-sm">
              <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col overflow-hidden px-3 sm:px-4 py-3 sm:py-4">
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
      <footer className="py-3 safe-area-bottom">
        <div className="max-w-4xl mx-auto px-4 text-center text-xs text-white/70">
          Powered by OpenAI | Berufsberatung für Schüler
        </div>
      </footer>
    </div>
  );
}

export default App;
