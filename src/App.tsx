import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/movies/MovieGrid'
import Favorites from './pages/Favorites'
import { useState } from 'react'
import { HAS_API_KEY, HAS_BEARER } from './services/tmdb'

function Home() {
  const [query, setQuery] = useState('')
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      {!HAS_API_KEY && !HAS_BEARER && (
        <div className="bg-yellow-50 border-l-4 border-yellow-300 text-yellow-800 p-3 text-sm max-w-7xl mx-auto px-4">
          TMDB credential missing — set `VITE_TMDB_KEY` (v3) or `VITE_TMDB_BEARER` (v4) in your `.env` or deployment environment.
        </div>
      )}

      {(HAS_API_KEY || HAS_BEARER) && (
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="text-sm text-slate-600">Using TMDB credential: <span className="font-medium">{HAS_BEARER ? 'v4 Bearer token' : 'v3 API key'}</span></div>
        </div>
      )}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4">
          <SearchBar onSearch={setQuery} />
        </div>
        <div className="py-6">
          <MovieGrid query={query} />
        </div>
      </main>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
