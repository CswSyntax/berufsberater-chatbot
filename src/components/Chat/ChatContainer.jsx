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
}) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              {/* Welcome Icon */}
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/20">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                </svg>
              </div>

              {/* Welcome Text */}
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                Hallo! Ich bin dein Berufsberater
              </h2>
              <p className="text-slate-500 max-w-md mb-8 text-sm sm:text-base">
                Ich helfe dir bei Fragen zu Ausbildung, Praktikum und Berufsorientierung. Was moechtest du wissen?
              </p>

              {/* Quick Actions */}
              <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { text: 'Welche Ausbildungen passen zu mir?', icon: '🎯' },
                  { text: 'Was ist ein Praktikum?', icon: '💼' },
                  { text: 'Wie schreibe ich eine Bewerbung?', icon: '📝' },
                ].map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => onSend(suggestion.text, [])}
                    className="group flex items-center gap-3 p-4 bg-white border border-slate-200 rounded-xl text-left text-sm text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm hover:shadow-md"
                  >
                    <span className="text-xl">{suggestion.icon}</span>
                    <span className="font-medium">{suggestion.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <Message key={index} message={message} />
              ))}
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-200 bg-white safe-area-bottom">
        <div className="max-w-4xl mx-auto">
          <MessageInput
            onSend={onSend}
            onFileUpload={onFileUpload}
            isLoading={isLoading}
            uploadingFile={uploadingFile}
          />
        </div>
      </div>
    </div>
  );
}
