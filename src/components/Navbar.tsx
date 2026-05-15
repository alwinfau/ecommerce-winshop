import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  navigate: (path: string) => void;
  currentPage: string;
}

export default function Navbar({ navigate, currentPage }: NavbarProps) {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a className="navbar-brand" href="#/" onClick={() => handleNav('/')}>
          🛒 GSHOP
        </a>

        <form className="navbar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">🔍</button>
        </form>

        <div className={`navbar-actions ${mobileMenuOpen ? 'open' : ''}`}>
          <a
            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
            href="#/"
            onClick={() => handleNav('/')}
          >
            Home
          </a>
          <a
            className={`nav-link ${currentPage === 'products' ? 'active' : ''}`}
            href="#/products"
            onClick={() => handleNav('/products')}
          >
            Produk
          </a>
          <a
            className="nav-link cart-link"
            href="#/cart"
            onClick={() => handleNav('/cart')}
          >
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </a>

          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Aktifkan dark mode' : 'Aktifkan light mode'}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>

          {isAuthenticated ? (
            <div className="user-menu">
              <span className="user-name">Hai, {user?.name}</span>
              <button className="btn-logout" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <a
              className="nav-link btn-login"
              href="#/login"
              onClick={() => handleNav('/login')}
            >
              Masuk
            </a>
          )}
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>
    </nav>
  );
}
