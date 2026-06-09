import { NavLink } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b">
      <div className="container" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <NavLink to="/" className="title">Cine-Stream</NavLink>
        <nav>
          <NavLink to="/favorites" className="text-sm muted">Favorites</NavLink>
        </nav>
      </div>
    </header>
  )
}
