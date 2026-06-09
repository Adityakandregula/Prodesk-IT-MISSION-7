import { useEffect, useRef, useState, useCallback } from 'react'
import { fetchPopular, searchMovies } from '../../services/tmdb'
import MovieCard from './MovieCard'

const FAV_KEY = 'cine_favs'

export default function MovieGrid({ query }: { query: string }) {
  const [movies, setMovies] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const load = useCallback(
    async (p: number, reset = false) => {
      try {
        setLoading(true)
        setError(null)
        const data = query ? await searchMovies(query, p) : await fetchPopular(p)
        setTotalPages(data.total_pages)
        setMovies(prev => (reset ? data.results : [...prev, ...data.results]))
      } catch (err: any) {
        setError(err.message || 'Failed to load')
      } finally {
        setLoading(false)
      }
    },
    [query],
  )

  useEffect(() => {
    // when query changes, reset
    setMovies([])
    setPage(1)
    setTotalPages(null)
    load(1, true)
  }, [query, load])

  useEffect(() => {
    if (!sentinelRef.current) return
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !loading) {
        setPage(p => p + 1)
      }
    })
    obs.observe(sentinelRef.current)
    return () => obs.disconnect()
  }, [loading])

  useEffect(() => {
    if (page === 1) return
    if (totalPages && page > totalPages) return
    load(page)
  }, [page, totalPages, load])

  function getFavorites(): number[] {
    try {
      const raw = localStorage.getItem(FAV_KEY)
      return raw ? JSON.parse(raw).map((m: any) => m.id) : []
    } catch {
      return []
    }
  }

  function toggleFavorite(m: any) {
    try {
      const raw = localStorage.getItem(FAV_KEY)
      const list = raw ? JSON.parse(raw) : []
      const exists = list.find((x: any) => x.id === m.id)
      let next
      if (exists) next = list.filter((x: any) => x.id !== m.id)
      else next = [m, ...list]
      localStorage.setItem(FAV_KEY, JSON.stringify(next))
      // trigger re-render
      setMovies(prev => [...prev])
    } catch (err) {
      console.error(err)
    }
  }

  const favorites = getFavorites()

  return (
    <div className="container">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {movies.map(m => (
          <MovieCard key={m.id} movie={m} isFavorite={favorites.includes(m.id)} onToggleFavorite={toggleFavorite} />
        ))}
      </div>

      {!loading && movies.length === 0 && (
        <div className="py-8 text-center muted">No results found.</div>
      )}

      {error && <div className="text-red-600 mt-4">{error}</div>}

      <div className="py-6 text-center muted">{loading ? 'Loading…' : ''}</div>

      <div ref={sentinelRef} style={{ height: 16 }} />
    </div>
  )
}
