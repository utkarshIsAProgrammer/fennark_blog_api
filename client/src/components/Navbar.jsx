import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const APP_NAME = import.meta.env.VITE_APP_NAME || 'devblog';

const navLinkClass = ({ isActive }) =>
  isActive ? 'nav-link nav-link-active' : 'nav-link';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-nav">
      <div className="nav-container">
        <Link to="/" className="brand-mark" onClick={closeMenu}>
          {APP_NAME}
          <span className="brand-cursor">_</span>
        </Link>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav className={`nav-items ${menuOpen ? 'nav-items-open' : ''}`}>
          <NavLink to="/" className={navLinkClass} end onClick={closeMenu}>
            Home
          </NavLink>
          <Link
            to="/posts/new"
            className="nav-link nav-dashboard-highlight"
            onClick={closeMenu}
          >
            + New Post
          </Link>
        </nav>
      </div>
    </header>
  );
}
