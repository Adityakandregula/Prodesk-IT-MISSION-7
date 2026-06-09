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
    <div className="container">
      <input
        aria-label="Search movies"
        className="w-full rounded border px-3 py-2"
        placeholder="Search movies"
        value={value}
        onChange={handleChange}
      />
    </div>
  )
}
