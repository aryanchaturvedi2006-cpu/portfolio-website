import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiExternalLink } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import ProofThumbnail from '../components/ProofThumbnail';
import { portfolioData } from '../data/portfolioData';

const CertCard = ({ cert, index, onOpenProof }) => {
  const isEven = index % 2 === 1;
  const cardClass = isEven ? 'card-gold' : 'card-green';
  const hasValidLink =
    Boolean(cert.link) &&
    !cert.link.includes('CERT_URL') &&
    (cert.link.startsWith('http://') || cert.link.startsWith('https://'));

  return (
    <motion.div
      className={`card ${cardClass}`}
      style={{
        backgroundColor: 'var(--ink3)',
        borderRadius: '2px',
        padding: '1.6rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '16px',
        height: '100%'
      }}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div>
        {/* Top Row: Icon Badge & Issued Date */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '2px',
              backgroundColor: isEven ? 'var(--gfaint)' : 'var(--faint)',
              border: `1px solid ${isEven ? 'var(--gborder)' : 'var(--border)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: isEven ? 'var(--gold)' : 'var(--green)',
            }}
            aria-hidden="true"
          >
            <FiAward size={18} />
          </div>

          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.66rem',
              color: isEven ? 'var(--gold)' : 'var(--green)',
              backgroundColor: isEven ? 'var(--gfaint)' : 'var(--faint)',
              border: `1px solid ${isEven ? 'var(--gborder)' : 'var(--border)'}`,
              padding: '3px 8px',
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
            marginBottom: '0.4rem',
            lineHeight: 1.3
          }}
        >
          {cert.title}
        </h3>

        {/* Issuer */}
        <div
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.72rem',
            color: isEven ? 'var(--gold)' : 'var(--green)',
            letterSpacing: '0.04em',
            marginBottom: cert.credentialId ? '0.35rem' : '0'
          }}
        >
          {cert.issuer}
        </div>

        {/* Credential ID */}
        {cert.credentialId && (
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.66rem',
              color: 'var(--muted)',
              letterSpacing: '0.04em'
            }}
          >
            Credential ID: {cert.credentialId}
          </div>
        )}
      </div>

      {/* Action Buttons: View Certificate / Verify Credential */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', paddingTop: '0.5rem' }}>
        {cert.proof && (
          <button
            type="button"
            onClick={(e) => onOpenProof(cert.proof, cert.title, cert.date, e.currentTarget)}
            className={isEven ? 'btn btn-fill-gold cursor-hover' : 'btn btn-fill-g cursor-hover'}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '9px 14px',
              fontSize: '0.78rem',
              cursor: 'pointer'
            }}
            aria-label={`View certificate for ${cert.title}`}
          >
            <FiExternalLink size={13} /> View Certificate
          </button>
        )}

        {hasValidLink && (
          <a
            href={cert.link}
            target="_blank"
            rel="noopener noreferrer"
            className={isEven ? 'btn btn-line-gold cursor-hover' : 'btn cursor-hover'}
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '8px 14px',
              fontSize: '0.75rem'
            }}
            aria-label={`Verify credential for ${cert.title}`}
          >
            <FiExternalLink size={12} /> Verify Credential
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Certifications = () => {
  const { certifications, achievements } = portfolioData;
  const [activeProof, setActiveProof] = useState(null);
  const triggerBtnRef = useRef(null);

  const handleOpenProof = (proofData, role, date, btnEl) => {
    triggerBtnRef.current = btnEl;
    setActiveProof({ proof: proofData, role, date });
  };

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
            alignItems: 'start',
            marginBottom: '4rem'
          }}
        >
          {certifications.map((cert, idx) => (
            <CertCard
              key={cert.id}
              cert={cert}
              index={idx}
              onOpenProof={handleOpenProof}
            />
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              alignItems: 'start'
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
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    borderRadius: '2px'
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
                          fontSize: '0.98rem',
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

                  {/* Large Proof Stage Button (Normal flow, no empty gap) */}
                  {proof && (
                    <ProofThumbnail
                      proof={proof}
                      role={title}
                      date={period}
                      onOpen={handleOpenProof}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Shared Accessible Lightbox for Proof Images */}
      <Lightbox
        isOpen={Boolean(activeProof)}
        onClose={() => setActiveProof(null)}
        title={activeProof ? `${activeProof.role} (${activeProof.date})` : ''}
        topbarLabel={
          activeProof
            ? `${
                activeProof.proof.src.includes('hostel') ||
                (activeProof.proof.alt &&
                  activeProof.proof.alt.toLowerCase().includes('letter'))
                  ? 'appointment letter'
                  : 'certificate'
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
