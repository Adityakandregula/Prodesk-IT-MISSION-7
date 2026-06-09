export const TMDB_BASE = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_KEY
const BEARER = import.meta.env.VITE_TMDB_BEARER
export const HAS_API_KEY = Boolean(API_KEY)
export const HAS_BEARER = Boolean(BEARER)

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

async function fetchJson(url: string, opts: RequestInit = {}) {
  // Safe debug: log the request URL with any api_key masked, and whether Bearer header is used
  try {
    const u = new URL(url)
    const apikey = u.searchParams.get('api_key')
    if (apikey) {
      const last4 = apikey.slice(-4)
      u.searchParams.set('api_key', `REDACTED***${last4}`)
    }
    const hasBearer = opts.headers && (opts.headers as Record<string,string>).Authorization
    // eslint-disable-next-line no-console
    console.debug('[tmdb] Request', u.toString(), hasBearer ? 'auth=Bearer' : apikey ? 'auth=api_key' : 'auth=none')
  } catch (e) {
    // ignore logging errors
  }

  const res = await fetch(url, opts)
  if (!res.ok) {
    // try to parse JSON error from TMDB, fallback to text
    try {
      const json = await res.json()
      const msg = typeof json === 'object' && json !== null && 'status_message' in json ? (json as any).status_message : JSON.stringify(json)
      throw new Error(`${res.status} ${res.statusText} — ${msg}`)
    } catch (e) {
      const text = await res.text().catch(() => '')
      throw new Error(`${res.status} ${res.statusText} ${text}`)
    }
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
  // Prefer Bearer (v4) if available, otherwise use v3 api_key param
  if (!API_KEY && !BEARER) {
    // do not throw in the UI; warn and return empty
    // eslint-disable-next-line no-console
    console.warn('No TMDB credentials set (VITE_TMDB_KEY or VITE_TMDB_BEARER) — returning empty popular list')
    return emptyResponse(page)
  }

  const url = new URL(`${TMDB_BASE}/movie/popular`)
  url.searchParams.set('language', 'en-US')
  url.searchParams.set('page', String(page))

  const opts: RequestInit = {}
  if (BEARER) {
    opts.headers = { Authorization: `Bearer ${BEARER}` }
  } else {
    url.searchParams.set('api_key', API_KEY!)
  }

  const data: TMDBResponse = await fetchJson(url.toString(), opts)
  return data
}

export async function searchMovies(query: string, page = 1) {
  if (!API_KEY && !BEARER) {
    // eslint-disable-next-line no-console
    console.warn('No TMDB credentials set (VITE_TMDB_KEY or VITE_TMDB_BEARER) — returning empty search results')
    return emptyResponse(page)
  }

  const url = new URL(`${TMDB_BASE}/search/movie`)
  url.searchParams.set('language', 'en-US')
  url.searchParams.set('page', String(page))
  url.searchParams.set('query', query)

  const opts: RequestInit = {}
  if (BEARER) opts.headers = { Authorization: `Bearer ${BEARER}` }
  else url.searchParams.set('api_key', API_KEY!)

  const data: TMDBResponse = await fetchJson(url.toString(), opts)
  return data
}

export function posterUrl(path: string | null, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}
