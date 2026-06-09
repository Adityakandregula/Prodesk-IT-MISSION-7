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
    <div className="card">
      {poster ? (
        <img src={poster} alt={movie.title} loading="lazy" className="card-img" />
      ) : (
        <div className="card-img" style={{background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af'}}>No image</div>
      )}

      <div style={{padding: 8}}>
        <div style={{fontSize: 14, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>{movie.title}</div>
        <div className="muted" style={{fontSize: 12, marginTop: 6}}>{year} · ⭐ {movie.vote_average ?? '—'}</div>
      </div>
    </div>
  )
}
