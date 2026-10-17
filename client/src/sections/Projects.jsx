import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { portfolioData } from '../data/portfolioData';

const filterCategories = ['All', 'Full Stack', 'Backend', 'AI/ML'];

const isPlaceholderLink = (url) => {
  if (!url) return true;
  return url.includes('REPO_URL') || url.includes('LIVE_URL');
};

const ProjectPreviewImage = ({ src, alt, isEven }) => {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="project-preview-wrap"
      style={{
        width: '100%',
        aspectRatio: '16 / 9',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: 'var(--ink3)',
        borderRadius: '2px',
        border: `1px solid ${isEven ? 'var(--gborder)' : 'var(--border)'}`,
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {!failed && src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailed(true)}
          className="project-preview-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
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
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '0.72rem',
              color: 'var(--muted)',
              letterSpacing: '0.1em'
            }}
          >
            // preview
          </span>
        </div>
      )}
    </div>
  );
};

const Projects = () => {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="section section-alt">
      <div className="wrap">
        <SectionTitle title="Projects Built" accentWord="From Scratch" subtitle="Featured Work" isGold={true} />

        {/* Filter Buttons - Active Chip Gold Fill with Black Text */}
        <motion.div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.6rem',
            marginBottom: '2.5rem'
          }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.72rem',
                  padding: '0.6rem 1.2rem',
                  borderRadius: '2px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: isActive ? 'var(--gold)' : 'var(--ink3)',
                  color: isActive ? 'var(--btn-fill-text, #000000)' : 'var(--muted)',
                  border: `1px solid ${isActive ? 'var(--gold)' : 'var(--border)'}`,
                  fontWeight: isActive ? 600 : 500
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '1.8rem',
            alignItems: 'stretch'
          }}
        >
          <AnimatePresence>
            {filteredProjects.map((project, idx) => {
              const livePlaceholder = isPlaceholderLink(project.live);
              const githubPlaceholder = isPlaceholderLink(project.github);
              const isEven = idx % 2 === 1;
              const cardClass = isEven ? 'card-gold' : 'card-green';

              return (
                <motion.div
                  key={project.id}
                  layout
                  className={`card ${cardClass}`}
                  style={{
                    backgroundColor: 'var(--ink2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '1.8rem',
                    borderRadius: '2px'
                  }}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                >
                  {/* Card Content Top */}
                  <div>
                    {/* Project Preview Image */}
                    <ProjectPreviewImage
                      src={project.image}
                      alt={`${project.title} Preview`}
                      isEven={isEven}
                    />

                    {/* Header: Project Index and Category Tag */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem'
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.62rem',
                          color: 'var(--gold)',
                          letterSpacing: '0.1em'
                        }}
                      >
                        0{project.id} //
                      </span>

                      <span
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: '0.62rem',
                          color: 'var(--gold)',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          border: '1px solid var(--gborder)',
                          padding: '2px 8px',
                          borderRadius: '2px',
                          backgroundColor: 'var(--gfaint)'
                        }}
                      >
                        {project.category}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '1.4rem',
                        fontWeight: 800,
                        color: 'var(--text)',
                        letterSpacing: '-0.02em',
                        marginBottom: '0.25rem'
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Subtitle */}
                    <div
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.72rem',
                        color: isEven ? 'var(--gold)' : 'var(--green)',
                        letterSpacing: '0.04em',
                        marginBottom: '0.9rem'
                      }}
                    >
                      {project.subtitle}
                    </div>

                    {/* Description */}
                    <p
                      style={{
                        fontSize: '0.88rem',
                        color: 'var(--muted)',
                        lineHeight: 1.75,
                        fontWeight: 300,
                        marginBottom: '1.25rem'
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tech Stack Badges - All Gold */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                        marginBottom: '1.8rem'
                      }}
                    >
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontFamily: 'var(--mono)',
                            fontSize: '0.62rem',
                            color: 'var(--gold)',
                            backgroundColor: 'var(--gfaint)',
                            border: '1px solid var(--gborder)',
                            padding: '3px 8px',
                            borderRadius: '2px',
                            letterSpacing: '0.04em'
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Actions Bottom */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.75rem',
                      alignItems: 'center',
                      paddingTop: '1.25rem',
                      borderTop: `1px solid ${isEven ? 'var(--gborder)' : 'var(--border)'}`
                    }}
                  >
                    {/* Live Demo Button */}
                    {!livePlaceholder ? (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={isEven ? 'btn btn-fill-gold' : 'btn btn-fill-g'}
                      >
                        <FiExternalLink size={13} /> Live Demo
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="btn btn-line"
                        style={{
                          opacity: 0.45,
                          cursor: 'not-allowed',
                          pointerEvents: 'none'
                        }}
                      >
                        Coming soon
                      </button>
                    )}

                    {/* GitHub Button */}
                    {!githubPlaceholder ? (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-icon"
                      >
                        <FiGithub size={13} /> GitHub
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="btn btn-icon"
                        style={{
                          opacity: 0.45,
                          cursor: 'not-allowed',
                          pointerEvents: 'none'
                        }}
                      >
                        <FiGithub size={13} /> Coming soon
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
