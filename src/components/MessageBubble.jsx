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
      className={`flex items-start gap-4 py-5 ${isUser ? 'flex-row-reverse' : ''}`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gray-200'
            : 'bg-gradient-to-br from-teal-500 to-emerald-600'
        }`}
      >
        {isUser ? (
          <User className="w-5 h-5 text-gray-600" />
        ) : (
          <Sparkles className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Content */}
      <div className={`flex-1 min-w-0 ${isUser ? 'text-right' : ''}`}>
        <p className={`text-sm font-semibold mb-2 ${isUser ? 'text-gray-600' : 'text-emerald-600'}`}>
          {isUser ? 'Du' : 'Berufsberater'}
        </p>

        <div
          className={`inline-block text-left px-6 py-4 ${
            isUser
              ? 'bg-emerald-600 text-white rounded-[28px] rounded-tr-lg'
              : 'bg-white text-gray-800 shadow-lg border border-gray-100 rounded-[28px] rounded-tl-lg'
          }`}
          style={{ maxWidth: '90%' }}
        >
          {isUser ? (
            <p className="text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose prose-base max-w-none text-gray-800">
              <ReactMarkdown
                components={{
                  p: ({ children }) => <p className="mb-4 last:mb-0 leading-relaxed text-base">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 ml-5 list-disc space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-4 ml-5 list-decimal space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed text-base">{children}</li>,
                  h1: ({ children }) => <h1 className="text-xl font-bold mt-5 mb-3">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-lg font-bold mt-5 mb-3">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-base font-bold mt-4 mb-2">{children}</h3>,
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  code: ({ children, className }) => {
                    const isBlock = className?.includes('language-');
                    if (isBlock) {
                      return (
                        <code className="block bg-gray-900 text-gray-100 p-4 rounded-xl text-sm overflow-x-auto my-3">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <code className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded-lg text-sm">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => <>{children}</>,
                  a: ({ href, children }) => (
                    <a href={href} className="text-emerald-600 hover:text-emerald-800 underline font-medium" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-emerald-400 pl-4 my-3 text-gray-600 italic">
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
          <div className={`mt-3 flex flex-wrap gap-2 ${isUser ? 'justify-end' : ''}`}>
            {message.files.map((file, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-xl"
              >
                <Paperclip className="w-4 h-4" />
                <span className="max-w-[150px] truncate">{file.name}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
