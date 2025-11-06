// components/SearchWeather.tsx
'use client'

import { useState } from 'react'
import CommandPalette from './CommandPalette'
import SearchBar from './SearchBar'
import { LocationSuggestion } from '@/lib/schemas/geocodingSchema'

export default function SearchWeather({
  onSelectLocation,
}: {
  onSelectLocation: (location: LocationSuggestion) => void
}) {
  const [isPaletteOpen, setIsPaletteOpen] = useState(false)

  return (
    <div className="flex flex-col items-center w-full">
      <SearchBar setIsPaletteOpen={setIsPaletteOpen} />
      <CommandPalette
        open={isPaletteOpen}
        setOpen={setIsPaletteOpen}
        onSelect={onSelectLocation}
      />
    </div>
  )
}