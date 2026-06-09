import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import MovieGrid from './components/movies/MovieGrid'
import Favorites from './pages/Favorites'
import { useState } from 'react'

function Home() {
  const [query, setQuery] = useState('')
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
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
