import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import '../css/SharedNavbar.css';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Sorting', path: '/sorting' },
  { name: 'Graphs', path: '/graphs' },
  { name: 'Trees', path: '/trees' },
  { name: 'DP', path: '/dynamic-programming' },
  { name: 'Backtracking', path: '/backtracking' },
  { name: 'Searching', path: '/searching' }
];

export default function SharedNavbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="shared-navbar">
      <Link to="/" className="nav-brand">
        <span className="brand-title">Algo<strong>Viz</strong></span>
      </Link>

      <nav className="nav-menu">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="nav-right">
        {/* Theme Toggle Button */}
        <button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
        </button>

        <a
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          className="github-pill-btn"
        >
          GitHub
        </a>
      </div>
    </header>
  );
}