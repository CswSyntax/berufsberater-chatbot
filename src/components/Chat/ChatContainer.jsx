import { useEffect, useRef } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';

export default function ChatContainer({
  messages,
  isLoading,
  onSend,
  onFileUpload,
  uploadingFile,
  onNewChat,
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Chat Header with New Chat button */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center border-b border-gray-100">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Chat</h2>
        <button
          onClick={onNewChat}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-green-600 hover:text-green-700 hover:bg-green-50 active:bg-green-100 rounded-full transition-colors touch-manipulation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Neuer Chat</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 overscroll-contain bg-gray-50/50">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-2 sm:px-4">
            {/* Welcome Icon - Intojob Green */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-teal-500 to-green-500 rounded-3xl flex items-center justify-center mb-4 sm:mb-6 shadow-lg">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Welcome Text */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
              Willkommen!
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mb-6 sm:mb-8">
              Ich bin dein KI-Assistent für alle Fragen rund um Ausbildung, Praktikum und Berufsorientierung.
            </p>

            {/* Suggestion Buttons - Intojob Green Style */}
            <div className="w-full max-w-sm sm:max-w-lg flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2 sm:gap-3">
              {[
                'Welche Ausbildungen passen zu mir?',
                'Was ist ein Praktikum?',
                'Wie schreibe ich eine Bewerbung?',
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSend(suggestion, [])}
                  className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-white border-2 border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-green-400 hover:text-green-600 active:bg-green-50 transition-all touch-manipulation shadow-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <MessageInput
        onSend={onSend}
        onFileUpload={onFileUpload}
        isLoading={isLoading}
        uploadingFile={uploadingFile}
      />
    </div>
  );
}
