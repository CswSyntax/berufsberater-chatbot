import ReactMarkdown from 'react-markdown';

export default function Message({ message }) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3 sm:mb-4`}>
      <div
        className={`flex items-start gap-2 sm:gap-3 max-w-[90%] sm:max-w-[80%] ${
          isUser ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Avatar - etwas kleiner auf Mobile */}
        <div
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
            isUser
              ? 'bg-gradient-to-br from-orange-400 to-orange-500'
              : 'bg-gradient-to-br from-sky-500 to-sky-600'
          }`}
        >
          {isUser ? (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>

        {/* Message Bubble */}
        <div
          className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-br from-sky-500 to-sky-600 text-white rounded-br-md'
              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-md shadow-sm'
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed break-words">{message.content}</p>
          ) : (
            <div className="markdown-content text-sm leading-relaxed break-words">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}

          {/* File attachments */}
          {message.files && message.files.length > 0 && (
            <div className={`mt-2 pt-2 border-t ${isUser ? 'border-white/20' : 'border-gray-200'}`}>
              {message.files.map((file, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-1.5 sm:gap-2 text-xs ${
                    isUser ? 'text-white/80' : 'text-gray-500'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <span className="truncate">{file.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
