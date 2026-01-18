export default function Header() {
  return (
    <header className="py-4 sm:py-5 safe-area-top">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo - Intojob Style */}
        <div className="flex items-center gap-3">
          {/* Hexagon Logo */}
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-900 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white italic tracking-tight">
              Berufsberater
            </h1>
            <p className="text-xs sm:text-sm text-white/70 hidden sm:block">
              Dein KI-Assistent für die Berufsorientierung
            </p>
          </div>
        </div>

        {/* Online Status Badge */}
        <div className="flex items-center">
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </header>
  );
}
