import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon } from 'react-icons/fi';
import './Navbar.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleScroll = (href) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav id="nav" className="nav-bar">
        <a
          href="#hero"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            handleScroll('#hero');
          }}
        >
          <span className="logo-ac">AC</span>
          <span className="logo-dot">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="nav-link-btn"
                onClick={() => handleScroll(item.href)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="nav-right-actions">
          <a href="mailto:aryanchaturvedi2006@gmail.com" className="nav-hire">
            Hire Me
          </a>

          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FiSun size={15} /> : <FiMoon size={15} />}
          </button>

          <button
            type="button"
            className={`ham ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div className={`mob-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mob-links">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className="mob-link-btn"
                onClick={() => handleScroll(item.href)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <a
          href="mailto:aryanchaturvedi2006@gmail.com"
          className="btn btn-line-gold"
          style={{ justifyContent: 'center' }}
        >
          Hire Me
        </a>
      </div>
    </>
  );
};

export default Navbar;
