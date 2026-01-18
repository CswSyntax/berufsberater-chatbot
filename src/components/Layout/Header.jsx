export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Logo - kleiner auf Mobile */}
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex-shrink-0 flex items-center justify-center">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="min-w-0">
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 truncate">Berufsberater</h1>
            {/* Subtitel nur auf größeren Screens */}
            <p className="hidden sm:block text-sm text-gray-500">Dein KI-Assistent für die Berufsorientierung</p>
          </div>
        </div>

        {/* Online-Status Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1 sm:mr-1.5 animate-pulse"></span>
            <span className="hidden xs:inline">Online</span>
          </span>
        </div>
      </div>
    </header>
  );
}
