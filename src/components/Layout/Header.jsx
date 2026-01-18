export default function Header() {
  return (
    <header className="bg-transparent py-3 sm:py-4 safe-area-top">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 flex items-center justify-between">
        {/* Logo - Intojob Style */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hexagon Logo */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gray-800 rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-semibold text-gray-800 italic">
            Berufsberater
          </span>
        </div>

        {/* Online Status Badge - Intojob Green */}
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-green-500 text-white shadow-md">
            <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </header>
  );
}
