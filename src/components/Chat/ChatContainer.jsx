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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full">
      {/* Chat Header with New Chat button */}
      <div className="px-3 sm:px-4 py-2 sm:py-3 flex justify-end border-b border-gray-100 sm:border-none">
        <button
          onClick={onNewChat}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 active:bg-gray-100 hover:bg-gray-100 rounded-lg transition-colors touch-manipulation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Neuer Chat</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 sm:py-4 overscroll-contain">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-2 sm:px-4">
            {/* Welcome Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
              <svg className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Welcome Text */}
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
              Willkommen beim Berufsberater!
            </h2>
            <p className="text-sm sm:text-base text-gray-500 max-w-md mb-5 sm:mb-6">
              Ich bin dein KI-Assistent für alle Fragen rund um Ausbildung, Praktikum und Berufsorientierung.
            </p>

            {/* Suggestion Buttons - Stack auf Mobile, Wrap auf größeren Screens */}
            <div className="w-full max-w-sm sm:max-w-md flex flex-col sm:flex-row sm:flex-wrap justify-center gap-2">
              {[
                'Welche Ausbildungen passen zu mir?',
                'Was ist ein Praktikum?',
                'Wie schreibe ich eine Bewerbung?',
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSend(suggestion, [])}
                  className="w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-white border border-gray-200 rounded-xl sm:rounded-full text-sm text-gray-600 hover:border-sky-300 hover:text-sky-600 active:bg-sky-50 transition-colors touch-manipulation"
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
