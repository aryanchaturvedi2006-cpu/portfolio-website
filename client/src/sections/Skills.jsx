import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SectionTitle from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

const SkillItem = ({ skill, index, accentColor = 'var(--green)' }) => {
  const [isActive, setIsActive] = useState(false);
  const isGold = accentColor.includes('gold');
  const glowShadow = `0 0 10px ${accentColor}`;

  return (
    <div
      style={{
        position: 'relative',
        marginBottom: '1rem',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onClick={() => setIsActive((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setIsActive((prev) => !prev);
        }
      }}
      aria-label={`${skill.name} ${skill.percent}% proficiency`}
    >
      {/* Skill Name and Percent */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '5px'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '0.84rem',
            color: 'var(--text)',
            fontWeight: 400
          }}
        >
          {skill.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '0.68rem',
            color: 'var(--muted)'
          }}
        >
          {skill.percent}%
        </span>
      </div>

      {/* Progress Track */}
      <div
        style={{
          position: 'relative',
          height: '3px',
          backgroundColor: 'var(--ink4)',
          border: `1px solid ${isGold ? 'var(--gborder)' : 'var(--border)'}`,
          borderRadius: '2px',
          overflow: 'visible'
        }}
      >
        <motion.div
          style={{
            height: '100%',
            backgroundColor: accentColor,
            borderRadius: '2px',
            boxShadow: isActive ? glowShadow : 'none',
            transition: 'box-shadow 0.2s ease'
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.percent}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.04 }}
        />
      </div>

      {/* Tooltip on Hover or Tap - Gold Border & Text */}
      {isActive && (
        <div
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 4px)',
            right: 0,
            backgroundColor: 'var(--ink4)',
            color: 'var(--gold)',
            border: '1px solid var(--gold)',
            borderRadius: '2px',
            padding: '3px 8px',
            fontFamily: 'var(--mono)',
            fontSize: '0.63rem',
            letterSpacing: '0.06em',
            zIndex: 10,
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            boxShadow: '0 4px 12px var(--ink)'
          }}
        >
          {skill.name} - {skill.percent}% proficiency
        </div>
      )}
    </div>
  );
};

const Skills = () => {
  const { skills } = portfolioData;

  const categories = [
    { title: 'Frontend', items: skills.frontend, accent: 'var(--green)', cardClass: 'card-green' },
    { title: 'Backend', items: skills.backend, accent: 'var(--gold)', cardClass: 'card-gold' },
    { title: 'Tools & Technologies', items: skills.tools, accent: 'var(--green)', cardClass: 'card-green' }
  ];

  return (
    <section id="skills" aria-labelledby="skills-title" className="section">
      <div className="wrap">
        <SectionTitle id="skills-title" title="Technical" accentWord="Proficiency" subtitle="Skills" isGold={false} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '1.5rem',
            alignItems: 'start'
          }}
        >
          {categories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              className={`card ${cat.cardClass}`}
              style={{
                backgroundColor: 'var(--ink2)',
                padding: '1.8rem 1.6rem 1.2rem',
                borderRadius: '2px'
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: catIdx * 0.12 }}
            >
              {/* Category Header */}
              <div
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.68rem',
                  color: cat.accent,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: cat.accent
                  }}
                  aria-hidden="true"
                />
                {cat.title}
              </div>

              {/* Skills List */}
              <div>
                {cat.items.map((skill, idx) => (
                  <SkillItem key={skill.name} skill={skill} index={idx} accentColor={cat.accent} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
