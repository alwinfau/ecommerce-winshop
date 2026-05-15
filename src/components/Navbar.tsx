import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
  HomeIcon,
  TagIcon,
} from './Icons';

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
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menu"
          >
            <Bars3Icon size={24} />
          </button>

          <a className="navbar-brand" href="#/" onClick={() => handleNav('/')}>
            <ShoppingCartIcon size={22} /> GSHOP
          </a>

          <form className="navbar-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" aria-label="Search">
              <MagnifyingGlassIcon size={18} />
            </button>
          </form>

          <div className="navbar-actions-desktop">
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
              <ShoppingCartIcon size={20} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </a>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            >
              {theme === 'light' ? <MoonIcon size={18} /> : <SunIcon size={18} />}
            </button>
            {isAuthenticated ? (
              <div className="user-menu">
                <span className="user-name">Hai, {user?.name}</span>
                <button className="btn-logout" onClick={logout}>Logout</button>
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

          {/* Mobile right icons */}
          <div className="navbar-actions-mobile">
            <button
              className="theme-toggle-sm"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            >
              {theme === 'light' ? <MoonIcon size={20} /> : <SunIcon size={20} />}
            </button>
            <a className="mobile-cart-link" href="#/cart" onClick={() => handleNav('/cart')}>
              <ShoppingCartIcon size={22} />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <a className="navbar-brand" href="#/" onClick={() => handleNav('/')}>
            <ShoppingCartIcon size={20} /> GSHOP
          </a>
          <button
            className="sidebar-close"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Tutup menu"
          >
            <XMarkIcon size={24} />
          </button>
        </div>

        {/* Search in sidebar */}
        <form className="sidebar-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" aria-label="Search">
            <MagnifyingGlassIcon size={18} />
          </button>
        </form>

        <nav className="sidebar-nav">
          <a
            className={`sidebar-link ${currentPage === 'home' ? 'active' : ''}`}
            href="#/"
            onClick={() => handleNav('/')}
          >
            <HomeIcon size={20} />
            Home
          </a>
          <a
            className={`sidebar-link ${currentPage === 'products' ? 'active' : ''}`}
            href="#/products"
            onClick={() => handleNav('/products')}
          >
            <TagIcon size={20} />
            Produk
          </a>
          <a
            className={`sidebar-link ${currentPage === 'cart' ? 'active' : ''}`}
            href="#/cart"
            onClick={() => handleNav('/cart')}
          >
            <ShoppingCartIcon size={20} />
            Keranjang
            {totalItems > 0 && <span className="sidebar-badge">{totalItems}</span>}
          </a>
        </nav>

        <div className="sidebar-footer">
          {isAuthenticated ? (
            <div className="sidebar-user">
              <span className="sidebar-user-name">Hai, {user?.name}</span>
              <button className="btn-logout" onClick={() => { logout(); setMobileMenuOpen(false); }}>
                Logout
              </button>
            </div>
          ) : (
            <a
              className="btn-primary btn-full"
              href="#/login"
              onClick={() => handleNav('/login')}
            >
              Masuk / Daftar
            </a>
          )}
        </div>
      </aside>
    </>
  );
}
