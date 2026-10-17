import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import { FaGraduationCap } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';
import './Timeline.css';

const Timeline = () => {
  const { timeline } = portfolioData;
  const containerRef = useRef(null);

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
    <section id="timeline" className="section">
      <div className="wrap">
        <SectionTitle
          title="Experience &"
          accentWord="Education"
          subtitle="Journey"
          isGold={true}
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

            return (
              <div
                key={item.id}
                className={`timeline-item ${isLeft ? 'left' : 'right'}`}
              >
                {/* Node Dot with Icon & Pulsing Green Glow */}
                <motion.div
                  className="timeline-dot"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.1 }}
                  aria-hidden="true"
                >
                  {item.type === 'education' ? (
                    <FaGraduationCap size={15} />
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
                    className="card"
                    style={{
                      backgroundColor: 'var(--ink2)',
                      border: '1px solid var(--border)',
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
                          backgroundColor: 'rgba(245, 197, 24, 0.06)',
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
                          color: 'var(--green)',
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
                        fontWeight: 300
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
