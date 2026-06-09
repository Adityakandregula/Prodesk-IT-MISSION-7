import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold">
          Cine-Stream
        </NavLink>
        <nav>
          <NavLink to="/favorites" className="text-sm muted">Favorites</NavLink>
        </nav>
      </div>
    </header>
  )
}
