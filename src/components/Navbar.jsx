import { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { CATEGORIES } from "../data/products.js";

const NAV_LINKS = [{ slug: "", label: "Inicio" }, ...CATEGORIES];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const closeMenu = () => setMenuOpen(false);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Llevar siempre a Inicio con la búsqueda en la URL, para que filtre el stock real
    navigate(value ? `/?q=${encodeURIComponent(value)}` : "/", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          Matero<span className="logo-dot">.sgo</span>
        </Link>

        <div className="navbar-search">
          <input
            type="search"
            className="search-input"
            placeholder="Buscar mates, bombillas, termos…"
            value={query}
            onChange={handleSearch}
            aria-label="Buscar productos"
          />
        </div>

        <nav className={`navbar-links ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(({ slug, label }) => (
            <NavLink
              key={slug}
              to={slug ? `/${slug}` : "/"}
              end={slug === ""}
              className={({ isActive }) =>
                "nav-link" + (isActive ? " active" : "")
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-actions">
          <Link to="/carrito" className="cart-button" aria-label="Ver carrito">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>

          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span className={menuOpen ? "bar open" : "bar"}></span>
            <span className={menuOpen ? "bar open" : "bar"}></span>
            <span className={menuOpen ? "bar open" : "bar"}></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <input
              type="search"
              className="search-input"
              placeholder="Buscar productos…"
              value={query}
              onChange={handleSearch}
              aria-label="Buscar productos"
            />
          </div>
          {NAV_LINKS.map(({ slug, label }) => (
            <NavLink
              key={slug}
              to={slug ? `/${slug}` : "/"}
              end={slug === ""}
              className={({ isActive }) =>
                "mobile-link" + (isActive ? " active" : "")
              }
              onClick={closeMenu}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
