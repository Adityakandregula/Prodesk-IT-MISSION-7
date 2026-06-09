import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-md flex items-center justify-center text-white font-bold">CS</div>
          <div>
            <div className="text-lg font-semibold">Cine-Stream</div>
            <div className="text-xs text-slate-500">Discover movies, fast</div>
          </div>
        </NavLink>

        <nav className="flex items-center gap-4">
          <NavLink to="/favorites" className={({ isActive }) => `text-sm ${isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600'}`}>
            My Favorites
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
