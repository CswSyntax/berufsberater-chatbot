import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Sparkles, Briefcase } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

export default function ChatView({
  messages,
  isLoading,
  error,
  onSend,
  onNewChat,
}) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Berufsberater</h1>
              <p className="text-xs text-gray-500">by Intojob</p>
            </div>
          </div>
          <button
            onClick={onNewChat}
            className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Neuer Chat</span>
          </button>
        </div>
      </header>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-red-50 border-b border-red-200 overflow-hidden"
          >
            <div className="max-w-3xl mx-auto px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4">
          {messages.length === 0 ? (
            <div className="min-h-[60vh] flex flex-col items-center justify-center py-12">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="text-center"
              >
                <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Wie kann ich dir helfen?
                </h2>
                <p className="text-gray-500 text-sm">
                  Ich beantworte deine Fragen zu Ausbildung, Praktikum und Berufswahl.
                </p>
              </motion.div>
            </div>
          ) : (
            <div className="py-6 space-y-4">
              {messages.map((message, index) => (
                <MessageBubble key={message.id || index} message={message} />
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="px-4 py-3 rounded-2xl bg-white border border-gray-200">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse [animation-delay:0.2s]" />
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <ChatInput onSend={onSend} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
