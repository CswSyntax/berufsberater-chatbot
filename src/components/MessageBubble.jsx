import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Äußerer Wrapper mit Border */}
      <div
        className={`p-3 rounded-3xl border-2 max-w-[85%] ${
          isUser
            ? 'bg-emerald-100 border-emerald-300'
            : 'bg-gray-100 border-gray-300'
        }`}
      >
        {/* Innere Nachricht */}
        <div
          className={`px-6 py-4 rounded-2xl ${
            isUser
              ? 'bg-emerald-600 text-white'
              : 'bg-white text-gray-800 shadow-sm'
          }`}
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

        {/* Name Label */}
        <p className={`text-xs font-medium mt-2 px-2 ${
          isUser ? 'text-right text-emerald-700' : 'text-left text-gray-600'
        }`}>
          {isUser ? 'Du' : 'Berufsberater'}
        </p>
      </div>
    </motion.div>
  );
}
