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
  const res = await fetch(url, opts)
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
  // Prefer Bearer (v4) if available, otherwise use v3 api_key param
  if (!API_KEY && !BEARER) {
    // do not throw in the UI; warn and return empty
    // eslint-disable-next-line no-console
    console.warn('No TMDB credentials set (VITE_TMDB_KEY or VITE_TMDB_BEARER) — returning empty popular list')
    return emptyResponse(page)
  }

  const url = `${TMDB_BASE}/movie/popular?language=en-US&page=${page}`
  const opts: RequestInit = {}
  if (BEARER) opts.headers = { Authorization: `Bearer ${BEARER}` }
  else {
    const q = `?api_key=${API_KEY}` // unused, keep for clarity
  }

  // if using api_key, append it to the url
  const finalUrl = BEARER ? url : `${url.replace('?','&')}&api_key=${API_KEY}`.replace('&','?')
  const data: TMDBResponse = await fetchJson(finalUrl, opts)
  return data
}

export async function searchMovies(query: string, page = 1) {
  if (!API_KEY && !BEARER) {
    // eslint-disable-next-line no-console
    console.warn('No TMDB credentials set (VITE_TMDB_KEY or VITE_TMDB_BEARER) — returning empty search results')
    return emptyResponse(page)
  }

  const url = `${TMDB_BASE}/search/movie?language=en-US&page=${page}&query=${encodeURIComponent(query)}`
  const opts: RequestInit = {}
  if (BEARER) opts.headers = { Authorization: `Bearer ${BEARER}` }
  const finalUrl = BEARER ? url : `${url}&api_key=${API_KEY}`
  const data: TMDBResponse = await fetchJson(finalUrl, opts)
  return data
}

export function posterUrl(path: string | null, size = 'w500') {
  if (!path) return null
  return `https://image.tmdb.org/t/p/${size}${path}`
}
