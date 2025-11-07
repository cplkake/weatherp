'use client'
import { useState, useEffect } from 'react'
import { Command } from 'cmdk'
import fetchSuggestions from '@/lib/api/fetchSuggestions'
import { LocationSuggestion } from '@/lib/schemas/geocodingSchema'


export default function CommandPalette({
  open,
  setOpen,
  onSelect,
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onSelect: (location: LocationSuggestion) => void
}) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([])


  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const res = await fetchSuggestions(query, controller.signal);
        setSuggestions(res ?? []);
      }
      catch (err: any) {
        if (err.name !== 'AbortError') console.error(err)
      }
    finally {
      setLoading(false);
    }
    }, 500)

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    }
  }, [query])

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Location Search Bar"
      shouldFilter={false}
      overlayClassName={`
        fixed inset-0 bg-black/40 backdrop-blur-sm
        data-[state=open]:animate-fadeIn
        data-[state=closed]:animate-fadeOut
      `}
      className={`
        fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl
        transition-transform duration-200
        data-[state=open]:animate-scaleIn
        data-[state=closed]:animate-scaleOut
      `}
    >
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-2 shadow-2xl backdrop-blur-2xl transition-all duration-300">
        <Command.Input
          autoFocus
          value={query}
          onValueChange={setQuery}
          placeholder="Search for a city"
          className="relative w-full rounded-xl bg-transparent p-3 text-lg text-white placeholder:text-white/60 outline-none
          after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-white/10 after:to-transparent after:content-['']"
        />
        <Command.List
          className={`
            transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] overflow-hidden
            ${suggestions.length > 0 || (query.length > 0 && !loading && suggestions.length === 0)
              ? 'opacity-100 translate-y-0 max-h-[400px]'
              : 'opacity-0 -translate-y-2 max-h-0'
            }
            p-0 m-0 overflow-y-auto rounded-xl bg-transparent
          `}
        >
          {!loading && query.length > 0 && suggestions.length === 0 && (
            <p className="px-4 py-2 text-sm text-white/70 transition-opacity duration-200"> No results found. </p>
          )}
          {suggestions.length > 0 &&
            suggestions.map((s) => (
              <Command.Item
                key={s.id}
                value={`${s.id}`}
                onSelect={() => {
                  setOpen(false)
                  onSelect(s)
                }}
                className="cursor-pointer rounded-lg px-3 py-2 text-white data-[selected=true]:bg-white/20 transition-colors"
              >
                {[s.name, s.admin1, s.country].filter(Boolean).join(', ')}
              </Command.Item>
            ))}
        </Command.List>
      </div>
    </Command.Dialog>
  )
}