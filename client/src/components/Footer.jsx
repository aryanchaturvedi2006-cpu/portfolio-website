import React from 'react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      aria-label="Site Footer"
      style={{
        padding: '1.8rem 3.5rem',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        backgroundColor: 'var(--ink)'
      }}
    >
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--muted)'
        }}
      >
        &copy; {new Date().getFullYear()} Aryan Chaturvedi &middot; All Rights Reserved
      </span>

      <span
        style={{
          fontFamily: 'var(--sans)',
          fontSize: '1rem',
          fontWeight: 800,
          letterSpacing: '-0.01em'
        }}
      >
        <span className="g">AC</span>
        <span className="g">.</span>
      </span>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '0.65rem',
          color: 'var(--muted)',
          textDecoration: 'none',
          transition: 'color 0.2s',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')}
        onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
      >
        back to top &uarr;
      </button>
    </footer>
  );
};

export default Footer;
