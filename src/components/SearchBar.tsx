import { useState } from 'react'
import { useDebouncedCallback } from '../utils/debounce'

export default function SearchBar({ onSearch }: { onSearch: (q: string) => void }) {
  const [value, setValue] = useState('')
  const debounced = useDebouncedCallback((v: string) => {
    onSearch(v.trim())
  }, 500)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
    debounced(e.target.value)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <label className="relative block">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" />
          </svg>
        </span>
        <input
          aria-label="Search movies"
          className="w-full rounded-lg border border-slate-200 bg-white pl-11 pr-4 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="Search movies — try 'Inception'"
          value={value}
          onChange={handleChange}
        />
      </label>
    </div>
  )
}
