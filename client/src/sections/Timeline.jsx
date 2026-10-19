import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiBriefcase, FiExternalLink } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import { portfolioData } from '../data/portfolioData';
import './Timeline.css';

const Timeline = () => {
  const { timeline } = portfolioData;
  const containerRef = useRef(null);
  const triggerBtnRef = useRef(null);
  const [activeProof, setActiveProof] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 70%']
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001
  });

  return (
    <section id="timeline" aria-labelledby="timeline-title" className="section">
      <div className="wrap">
        <SectionTitle
          id="timeline-title"
          title="Experience &"
          accentWord="Education"
          subtitle="Journey"
          isGold={false}
        />

        <div className="timeline-container" ref={containerRef}>
          {/* Static Background Track */}
          <div className="timeline-track" aria-hidden="true" />

          {/* Animated Green Line Drawing Downward */}
          <motion.div
            className="timeline-line-active"
            style={{ scaleY }}
            aria-hidden="true"
          />

          {/* Timeline Items */}
          {timeline.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isEvenItem = index % 2 === 1;
            const dotColor = isEvenItem ? 'gold' : 'green';
            const cardClass = isEvenItem ? 'card-gold' : 'card-green';

            return (
              <div
                key={item.id}
                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
              >
                {/* Node Dot with Icon - Alternating Green and Gold (Education items are Gold) */}
                <motion.div
                  className={`timeline-dot ${dotColor}`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  aria-hidden="true"
                >
                  {item.type === 'education' ? (
                    <FaGraduationCap size={15} color={dotColor === 'gold' ? 'var(--gold)' : 'var(--green)'} />
                  ) : (
                    <FiBriefcase size={15} />
                  )}
                </motion.div>

                {/* Card with Slide-in Animation */}
                <motion.div
                  className="timeline-card-wrap"
                  initial={{ opacity: 0, x: isLeft ? -35 : 35 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, ease: 'easeOut', delay: 0.12 }}
                >
                  <div
                    className={`card ${cardClass}`}
                    style={{
                      backgroundColor: 'var(--ink2)',
                      borderRadius: '2px',
                      padding: '1.6rem',
                      position: 'relative'
                    }}
                  >
                    {/* Period and Type Badge Row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '8px',
                        marginBottom: '0.75rem'
                      }}
                    >
                      {/* Period Badge in Gold */}
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.64rem',
                          color: 'var(--gold)',
                          backgroundColor: 'var(--gfaint)',
                          border: '1px solid var(--gborder)',
                          padding: '3px 8px',
                          borderRadius: '2px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          fontWeight: 500
                        }}
                      >
                        {item.period}
                      </span>

                      {/* Org Label */}
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.64rem',
                          color: isEvenItem ? 'var(--gold)' : 'var(--green)',
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase'
                        }}
                      >
                        {item.org}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--text)',
                        letterSpacing: '-0.02em',
                        marginBottom: '0.6rem'
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--muted)',
                        lineHeight: 1.7,
                        fontWeight: 300,
                        marginBottom: item.proof ? '0.4rem' : 0
                      }}
                    >
                      {item.description}
                    </p>

                    {/* View Certificate Button */}
                    {item.proof && (
                      <div style={{ marginTop: '1.1rem' }}>
                        <button
                          type="button"
                          onClick={(e) => {
                            triggerBtnRef.current = e.currentTarget;
                            setActiveProof({ proof: item.proof, role: item.title, date: item.period });
                          }}
                          className={isEvenItem ? 'btn btn-fill-gold cursor-hover' : 'btn btn-fill-g cursor-hover'}
                          style={{
                            width: '100%',
                            justifyContent: 'center',
                            padding: '9px 14px',
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                          aria-label={`View certificate for ${item.title}`}
                        >
                          <FiExternalLink size={13} /> View Certificate
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Accessible Lightbox Modal */}
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

export default Timeline;
