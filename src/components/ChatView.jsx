import { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Sparkles, FileText, Send, Briefcase } from 'lucide-react';
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
      <header className="flex-shrink-0 border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-gray-900">Berufsberater</h1>
              <p className="text-[11px] text-gray-400">by Intojob</p>
            </div>
          </div>

          <button
            onClick={onNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Neuer Chat
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
            className="bg-red-50 border-b border-red-100 overflow-hidden"
          >
            <div className="max-w-3xl mx-auto px-4 py-2 text-sm text-red-600">
              {error}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center px-4 py-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center max-w-md"
            >
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Sparkles className="w-7 h-7 text-white" />
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Wie kann ich dir helfen?
              </h2>
              <p className="text-sm text-gray-500 mb-8">
                Ich beantworte deine Fragen zu Ausbildung, Praktikum und Berufswahl.
              </p>

              <div className="grid gap-2">
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
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-sm text-gray-600 bg-gray-50 hover:bg-emerald-50 rounded-xl transition-colors group"
                  >
                    <item.icon className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                    <span>{item.text}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 py-6">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 py-4"
                >
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="flex items-center gap-1 pt-1">
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                      className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                    />
                    <motion.span
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-emerald-500 rounded-full"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Input */}
      <ChatInput
        onSend={onSend}
        onFileUpload={onFileUpload}
        isLoading={isLoading}
        uploadingFile={uploadingFile}
      />
    </div>
  );
}
