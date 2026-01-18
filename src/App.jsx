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
      {/* Full-screen gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-teal-400 via-teal-500 to-green-500 -z-10" />

      {/* Header */}
      <Header />

      {/* Error Banner */}
      {error && (
        <div className="px-4 sm:px-6 lg:px-8 mt-2">
          <div className="max-w-5xl mx-auto bg-red-500/90 backdrop-blur-sm rounded-2xl px-4 py-3 shadow-lg">
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

      {/* Main Chat Area - Centered Card */}
      <main className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex-1 flex flex-col max-w-5xl w-full mx-auto">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            uploadingFile={uploadingFile}
            onSend={sendMessage}
            onFileUpload={uploadFile}
            onNewChat={startNewChat}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-3 safe-area-bottom">
        <div className="text-center text-xs text-white/80">
          Powered by OpenAI | Berufsberatung für Schüler
        </div>
      </footer>
    </div>
  );
}

export default App;
