export const TMDB_BASE = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_KEY
export const HAS_API_KEY = Boolean(API_KEY)

export interface Movie {
  id: number
  title: string
  poster_path: string | null
  release_date?: string
  vote_average?: number
  overview?: string
}

export interface TMDBResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

async function fetchJson(url: string) {
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`${res.status} ${res.statusText} ${text}`)
  }
  return res.json()
}

const emptyResponse = (page = 1): TMDBResponse => ({
  page,
  results: [],
  total_pages: 0,
  total_results: 0,
})

export async function fetchPopular(page = 1) {
  if (!API_KEY) {
    // do not throw in the UI; warn and return empty
    // developer should set VITE_TMDB_KEY in .env or via deployment env
    // eslint-disable-next-line no-console
    console.warn('VITE_TMDB_KEY not set — returning empty popular list')
    return emptyResponse(page)
  }
  const url = `${TMDB_BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`
  const data: TMDBResponse = await fetchJson(url)
  return data
}

export async function searchMovies(query: string, page = 1) {
  if (!API_KEY) {
    // eslint-disable-next-line no-console
    console.warn('VITE_TMDB_KEY not set — returning empty search results')
    return emptyResponse(page)
  }
  const url = `${TMDB_BASE}/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${encodeURIComponent(query)}`
  const data: TMDBResponse = await fetchJson(url)
  return data
}

export function posterUrl(path: string | null, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}
