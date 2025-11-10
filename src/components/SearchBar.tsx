import React from "react";
import { useState, useEffect } from "react";

export default function SearchBar({
  setIsPaletteOpen,
}: {
  setIsPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [shortcut, setShortcut] = useState<string>('Ctrl K')
  
  useEffect(() => {
    const isMac = navigator.platform.toUpperCase().includes('MAC')
    setShortcut(isMac ? '⌘ K' : 'Ctrl K')
  }, [])

  return (
    <div className="w-4/5 max-w-sm rounded-lg ">
      <button
        type="button"
        onClick={() => setIsPaletteOpen(true)}
        className="relative w-full rounded-lg px-3 py-2 bg-gray-500/10 text-left text-white shadow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Open search command palette"
      >
        <span className="text-white/60">Search location...</span>

        {/* Dynamic shortcut hint */}
        <div className="hidden sm:flex absolute inset-y-0 right-0 py-1.5 pr-1.5 select-none pointer-events-none">
          <kbd className="inline-flex items-center px-1.5 font-mono text-sm font-medium bg-transparent text-gray-400 border dark:border-gray-100 border-opacity-20 rounded">
            {shortcut}
          </kbd>
        </div>
      </button>
    </div>
  );
}
