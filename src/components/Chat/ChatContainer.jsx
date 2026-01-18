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
    <div className="flex-1 flex flex-col bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <div className="px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center border-b border-gray-100 bg-white">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">Chat</h2>
        <button
          onClick={onNewChat}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-600 hover:text-green-700 hover:bg-green-50 active:bg-green-100 rounded-full transition-colors touch-manipulation"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span>Neuer Chat</span>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 overscroll-contain bg-gradient-to-b from-gray-50/80 to-white">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            {/* Welcome Icon */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-teal-400 to-green-500 rounded-3xl flex items-center justify-center mb-6 shadow-xl">
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>

            {/* Welcome Text */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
              Willkommen!
            </h2>
            <p className="text-base sm:text-lg text-gray-500 max-w-lg mb-8">
              Ich bin dein KI-Assistent für alle Fragen rund um Ausbildung, Praktikum und Berufsorientierung.
            </p>

            {/* Suggestion Buttons */}
            <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                'Welche Ausbildungen passen zu mir?',
                'Was ist ein Praktikum?',
                'Wie schreibe ich eine Bewerbung?',
              ].map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSend(suggestion, [])}
                  className="px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-sm font-medium text-gray-700 hover:border-green-400 hover:text-green-600 hover:shadow-md active:bg-green-50 transition-all touch-manipulation"
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
