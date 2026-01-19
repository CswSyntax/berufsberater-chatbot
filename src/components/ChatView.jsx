import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Sparkles, FileText, Briefcase } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ChatInput from './ChatInput';

export default function ChatView({
  messages,
  isLoading,
  uploadingFile,
  error,
  onSend,
  onFileUpload,
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
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Briefcase className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-base font-semibold text-gray-900">Berufsberater</h1>
              <p className="text-xs text-gray-500">by Intojob</p>
            </div>
          </div>

          <button
            onClick={onNewChat}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
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
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-sm text-red-600">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-gray-50">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {messages.length === 0 ? (
            <div className="min-h-[60vh] flex flex-col items-center justify-center py-12">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center w-full max-w-lg"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-xl">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Wie kann ich dir helfen?
                </h2>
                <p className="text-gray-500 mb-8">
                  Ich beantworte deine Fragen zu Ausbildung, Praktikum und Berufswahl.
                </p>

                <div className="space-y-3">
                  {[
                    { icon: Briefcase, text: 'Welche Ausbildung passt zu mir?' },
                    { icon: FileText, text: 'Wie schreibe ich eine Bewerbung?' },
                    { icon: MessageSquare, text: 'Was erwartet mich im Vorstellungsgespraech?' },
                  ].map((item, i) => (
                    <motion.button
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      onClick={() => onSend(item.text, [])}
                      className="flex items-center gap-3 w-full px-4 py-3.5 text-left text-sm text-gray-700 bg-white border border-gray-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-xl transition-all shadow-sm"
                    >
                      <item.icon className="w-5 h-5 text-emerald-600" />
                      <span className="font-medium">{item.text}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="py-6 space-y-1">
              <AnimatePresence mode="popLayout">
                {messages.map((message, index) => (
                  <MessageBubble key={index} message={message} />
                ))}

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-4 py-4"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex items-center gap-1.5 pt-2">
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                      />
                      <motion.span
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-emerald-500 rounded-full"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="flex-shrink-0 border-t border-gray-200 bg-white">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ChatInput
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
