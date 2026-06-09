import MovieCard from '../components/movies/MovieCard'
import { useEffect, useState } from 'react'

const FAV_KEY = 'cine_favs'

export default function Favorites() {
  const [favs, setFavs] = useState<any[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAV_KEY)
      setFavs(raw ? JSON.parse(raw) : [])
    } catch {
      setFavs([])
    }
  }, [])

  function toggle(m: any) {
    const next = favs.filter(x => x.id !== m.id)
    localStorage.setItem(FAV_KEY, JSON.stringify(next))
    setFavs(next)
  }

  if (!favs.length) return <div className="p-6">No favorites yet.</div>

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">My Favorites</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {favs.map(m => (
          <MovieCard key={m.id} movie={m} isFavorite={true} onToggleFavorite={toggle} />
        ))}
      </div>
    </div>
  )
}
