import { posterUrl } from '../../services/tmdb'

export default function MovieCard({
  movie,
  isFavorite,
  onToggleFavorite,
}: {
  movie: any
  isFavorite: boolean
  onToggleFavorite: (m: any) => void
}) {
  const poster = posterUrl(movie.poster_path)
  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : '—'

  return (
    <div className="border rounded overflow-hidden">
      {poster ? (
        <img src={poster} alt={movie.title} loading="lazy" className="w-full h-64 object-cover" />
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center text-gray-500">No image</div>
      )}

      <div className="p-2">
        <div className="text-sm font-medium truncate">{movie.title}</div>
        <div className="text-xs muted mt-1">{year} · ⭐ {movie.vote_average ?? '—'}</div>
      </div>
    </div>
  )
}
