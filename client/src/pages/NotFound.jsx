import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        backgroundColor: 'var(--ink)'
      }}
    >
      <div
        className="card"
        style={{
          maxWidth: '500px',
          width: '100%',
          textAlign: 'center',
          padding: '3rem 2rem',
          backgroundColor: 'var(--ink2)',
          border: '1px solid var(--border)',
          borderRadius: '2px'
        }}
      >
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.68rem',
            color: 'var(--gold)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            marginBottom: '0.8rem'
          }}
        >
          // Error 404
        </div>
        <h1
          style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            lineHeight: 1,
            color: 'var(--green)',
            marginBottom: '0.5rem',
            fontFamily: 'var(--sans)'
          }}
        >
          404<span style={{ color: 'var(--gold)' }}>.</span>
        </h1>
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '1rem',
            color: 'var(--text)',
            marginBottom: '0.5rem',
            fontWeight: 600
          }}
        >
          Page Not Found
        </p>
        <p
          style={{
            color: 'var(--muted)',
            marginBottom: '2rem',
            fontSize: '0.88rem',
            lineHeight: 1.7,
            fontWeight: 300
          }}
        >
          The resource you requested does not exist or has been relocated.
        </p>
        <Link to="/" className="btn btn-fill-g" style={{ display: 'inline-flex' }}>
          <FiHome size={14} /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
