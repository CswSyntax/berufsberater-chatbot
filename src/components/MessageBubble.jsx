import { motion } from 'framer-motion';
import { User, Sparkles, Paperclip } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-start gap-4 py-4 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gray-200'
            : 'bg-gradient-to-br from-teal-500 to-emerald-600'
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-gray-600" />
        ) : (
          <Sparkles className="w-4 h-4 text-white" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : ''}`}>
        <p className={`text-xs font-medium mb-1.5 ${isUser ? 'text-gray-500' : 'text-emerald-600'}`}>
          {isUser ? 'Du' : 'Berufsberater'}
        </p>

        <div
          className={`inline-block text-left rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-800 shadow-md'
          }`}
          style={{ maxWidth: '85%' }}
        >
          {isUser ? (
            <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-sm max-w-none text-gray-800">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed text-[15px]">{children}</p>,
                  ul: ({ children }) => <ul className="mb-3 ml-4 list-disc space-y-1">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-3 ml-4 list-decimal space-y-1">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed text-[15px]">{children}</li>,
                  h1: ({ children }) => <h1 className="text-lg font-semibold mt-4 mb-2">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-semibold mt-4 mb-2">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold mt-3 mb-1">{children}</h3>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return (
                        <code className="block bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto my-2">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded text-[13px]">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => <>{children}</>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-emerald-600 hover:text-emerald-800 underline" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-emerald-300 pl-3 my-2 text-gray-600 italic">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* File Attachments */}
        {message.files && message.files.length > 0 && (
          <div className={`mt-2 flex flex-wrap gap-1.5 ${isUser ? 'justify-end' : ''}`}>
            {message.files.map((file, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                <Paperclip className="w-3 h-3" />
                <span className="max-w-[150px] truncate">{file.name}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
