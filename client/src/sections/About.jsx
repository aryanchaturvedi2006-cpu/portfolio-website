import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

const About = () => {
  const { about } = portfolioData;
  const [imgError, setImgError] = useState(false);

  return (
    <section id="about" aria-labelledby="about-title" className="section section-alt">
      <div className="wrap">
        <SectionTitle id="about-title" title="About" accentWord="Me" subtitle="Background" isGold={true} />

        <motion.div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Left Column: Square Photo Frame with Gold Corner Accents */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '320px',
              aspectRatio: '1 / 1',
              margin: '0 auto'
            }}
          >
            {/* Gold Corner Accents on the Left */}
            <div
              style={{
                position: 'absolute',
                top: '-1px',
                left: '-1px',
                width: '16px',
                height: '16px',
                borderTop: '2px solid var(--gold)',
                borderLeft: '2px solid var(--gold)',
                zIndex: 2
              }}
              aria-hidden="true"
            />
            <div
              style={{
                position: 'absolute',
                bottom: '-1px',
                left: '-1px',
                width: '16px',
                height: '16px',
                borderBottom: '2px solid var(--gold)',
                borderLeft: '2px solid var(--gold)',
                zIndex: 2
              }}
              aria-hidden="true"
            />

            {/* Inner Frame Box */}
            <div
              style={{
                width: '100%',
                height: '100%',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                overflow: 'hidden',
                backgroundColor: 'var(--ink3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}
            >
              {!imgError ? (
                <img
                  src={about.photo}
                  alt="Aryan Chaturvedi - Full Stack Developer"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'var(--ink3)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '4.2rem',
                      fontWeight: 800,
                      color: 'var(--green)',
                      letterSpacing: '-0.03em',
                      lineHeight: 1
                    }}
                  >
                    AC<span style={{ color: 'var(--gold)' }}>.</span>
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.62rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase'
                    }}
                  >
                    // profile.preview
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Bio and Info Chips */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
            <p
              style={{
                fontSize: '0.98rem',
                color: 'var(--text)',
                lineHeight: 1.85,
                fontWeight: 300
              }}
            >
              {about.bio}
            </p>

            {/* Info Chips - Alternating Green and Gold */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {/* Location Chip - Odd / Green */}
              <div
                className="card card-green"
                style={{
                  padding: '0.85rem 1.15rem',
                  backgroundColor: 'var(--ink3)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.6rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '2px'
                  }}
                >
                  Location
                </span>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    fontWeight: 500
                  }}
                >
                  {about.location}
                </span>
              </div>

              {/* Status Chip - Even / Gold */}
              <div
                className="card card-gold"
                style={{
                  padding: '0.85rem 1.15rem',
                  backgroundColor: 'var(--ink3)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.6rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '2px'
                  }}
                >
                  Status
                </span>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.9rem',
                    color: 'var(--green)',
                    fontWeight: 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <span className="pulse" /> {about.status}
                </span>
              </div>

              {/* Degree Chip - Odd / Green */}
              <div
                className="card card-green"
                style={{
                  padding: '0.85rem 1.15rem',
                  backgroundColor: 'var(--ink3)'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '0.6rem',
                    color: 'var(--muted)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '2px'
                  }}
                >
                  Degree
                </span>
                <span
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '0.9rem',
                    color: 'var(--text)',
                    fontWeight: 500
                  }}
                >
                  {about.degree}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
