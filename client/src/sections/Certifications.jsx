import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import ProofThumbnail from '../components/ProofThumbnail';
import { portfolioData } from '../data/portfolioData';

const CertCard = ({ cert, index }) => {
  const [imgError, setImgError] = useState(false);
  const isPlaceholder = !cert.link || cert.link.includes('CERT_URL');
  const isEven = index % 2 === 1;
  const cardClass = isEven ? 'card-gold' : 'card-green';

  return (
    <motion.div
      className={`card ${cardClass}`}
      style={{
        backgroundColor: 'var(--ink3)',
        borderRadius: '2px',
        padding: '1.6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div>
        {/* Certificate Image or Fallback Placeholder */}
        <div
          style={{
            width: '100%',
            height: '150px',
            backgroundColor: 'var(--ink4)',
            border: `1px solid ${isEven ? 'var(--gborder)' : 'var(--border)'}`,
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative',
            marginBottom: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {!imgError ? (
            <img
              src={cert.image}
              alt={`${cert.title} Certificate`}
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <FiAward size={34} color={isEven ? 'var(--gold)' : 'var(--green)'} />
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.62rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase'
                }}
              >
                // cert.preview
              </span>
            </div>
          )}
        </div>

        {/* Date and Issuer Row - Issuer Text is Gold */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.64rem',
              color: 'var(--gold)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase'
            }}
          >
            {cert.issuer}
          </span>

          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.62rem',
              color: 'var(--gold)',
              backgroundColor: 'var(--gfaint)',
              border: '1px solid var(--gborder)',
              padding: '2px 7px',
              borderRadius: '2px',
              letterSpacing: '0.06em'
            }}
          >
            {cert.date}
          </span>
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '1.2rem',
            fontWeight: 700,
            color: 'var(--text)',
            letterSpacing: '-0.02em',
            marginBottom: '0.6rem',
            lineHeight: 1.25
          }}
        >
          {cert.title}
        </h3>

        {/* Credential ID - Gold Text */}
        {cert.credentialId && (
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.66rem',
              color: 'var(--gold)',
              letterSpacing: '0.04em',
              marginBottom: '1.25rem'
            }}
          >
            Credential ID: {cert.credentialId}
          </div>
        )}
      </div>

      {/* Button */}
      <div style={{ marginTop: '1.25rem' }}>
        {!isPlaceholder ? (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className={isEven ? 'btn btn-fill-gold' : 'btn btn-fill-g'}
            style={{ width: '100%', justifyContent: 'center' }}
            aria-label={`View certificate for ${cert.title}`}
          >
            <FiExternalLink size={13} /> View Certificate
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="btn btn-line"
            style={{
              width: '100%',
              justifyContent: 'center',
              opacity: 0.45,
              cursor: 'not-allowed',
              pointerEvents: 'none'
            }}
            aria-label={`${cert.title} certificate link coming soon`}
          >
            Link coming soon
          </button>
        )}
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const { certifications, achievements } = portfolioData;
  const [activeProof, setActiveProof] = useState(null);
  const triggerBtnRef = useRef(null);

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section section-alt">
      <div className="wrap">
        <SectionTitle
          id="certifications-title"
          title="Certifications &"
          accentWord="Credentials"
          subtitle="Achievements"
          isGold={true}
        />

        {/* Certifications Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.8rem',
            marginBottom: '4rem'
          }}
        >
          {certifications.map((cert, idx) => (
            <CertCard key={cert.id} cert={cert} index={idx} />
          ))}
        </div>

        {/* Achievements & Responsibilities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="eyebrow gold" style={{ marginBottom: '0.6rem' }}>
            Leadership &amp; Honors
          </div>

          <h3
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '1.45rem',
              fontWeight: 800,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem'
            }}
          >
            Achievements &amp; Responsibilities
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1rem'
            }}
          >
            {achievements.map((item, aIdx) => {
              const isEvenA = aIdx % 2 === 1;
              const aCardClass = isEvenA ? 'card-gold' : 'card-green';
              const aBorder = isEvenA ? 'var(--gborder)' : 'var(--border)';
              const aBg = isEvenA ? 'var(--gfaint)' : 'var(--faint)';

              const title = typeof item === 'string' ? item : item.title;
              const period = typeof item === 'object' ? item.period : null;
              const proof = typeof item === 'object' ? item.proof : null;

              return (
                <div
                  key={title}
                  className={`card ${aCardClass}`}
                  style={{
                    backgroundColor: 'var(--ink3)',
                    padding: '1.4rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '2px',
                        backgroundColor: aBg,
                        border: `1px solid ${aBorder}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--gold)',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                      aria-hidden="true"
                    >
                      <FiAward size={16} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: 'var(--sans)',
                          fontSize: '0.95rem',
                          color: 'var(--text)',
                          fontWeight: 600,
                          display: 'block',
                          marginBottom: '2px'
                        }}
                      >
                        {title}
                      </span>
                      {period && (
                        <span
                          style={{
                            fontFamily: 'var(--mono)',
                            fontSize: '0.64rem',
                            color: 'var(--gold)',
                            letterSpacing: '0.04em'
                          }}
                        >
                          {period}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Proof Thumbnail Button (Requirement 2) */}
                  {proof && (
                    <ProofThumbnail
                      proof={proof}
                      role={title}
                      date={period}
                      onOpen={(proofData, role, date, btnEl) => {
                        triggerBtnRef.current = btnEl;
                        setActiveProof({ proof: proofData, role, date });
                      }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Shared Accessible Lightbox for Leadership Proofs */}
      <Lightbox
        isOpen={Boolean(activeProof)}
        onClose={() => setActiveProof(null)}
        title={activeProof ? `${activeProof.role} (${activeProof.date})` : ''}
        topbarLabel={
          activeProof
            ? `${
                activeProof.proof.src.includes('hackjklu')
                  ? 'certificate'
                  : 'appointment letter'
              } // ${activeProof.role}`
            : ''
        }
        triggerRef={triggerBtnRef}
        image={
          activeProof
            ? {
                src: activeProof.proof.src,
                alt: activeProof.proof.alt,
                width: activeProof.proof.width,
                height: activeProof.proof.height
              }
            : null
        }
        caption={
          activeProof
            ? {
                title: activeProof.role,
                date: activeProof.date
              }
            : null
        }
      />
    </section>
  );
};

export default Certifications;
