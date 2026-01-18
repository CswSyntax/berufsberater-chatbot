export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="flex items-start gap-2 sm:gap-3">
        {/* Avatar - Intojob Green Gradient */}
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-teal-500 to-green-500 shadow-md">
          <svg className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        </div>

        {/* Typing Bubble */}
        <div className="px-5 py-4 rounded-2xl rounded-bl-md bg-white border border-gray-200 shadow-sm">
          <div className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: '0ms', animationDuration: '0.6s' }}
            ></div>
            <div
              className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: '150ms', animationDuration: '0.6s' }}
            ></div>
            <div
              className="w-2.5 h-2.5 bg-green-500 rounded-full animate-bounce"
              style={{ animationDelay: '300ms', animationDuration: '0.6s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
