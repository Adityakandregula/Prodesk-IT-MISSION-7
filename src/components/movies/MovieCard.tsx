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
    <article className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-150">
      {poster ? (
        <img src={poster} alt={movie.title} loading="lazy" className="w-full h-72 object-cover" />
      ) : (
        <div className="w-full h-72 bg-slate-100 flex items-center justify-center text-slate-500">No image</div>
      )}

      <div className="p-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
            <p className="text-xs text-slate-500 mt-1">{year} · <span aria-hidden>⭐</span> {movie.vote_average ?? '—'}</p>
          </div>

          <button
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            onClick={() => onToggleFavorite(movie)}
            className="rounded-full p-2 hover:bg-slate-100"
          >
            {isFavorite ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}
