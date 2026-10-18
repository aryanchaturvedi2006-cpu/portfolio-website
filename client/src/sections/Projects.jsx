import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  FiExternalLink,
  FiGithub,
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiArrowRight
} from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import Lightbox from '../components/Lightbox';
import { portfolioData } from '../data/portfolioData';
import './Projects.css';

const filterCategories = ['All', 'Full Stack', 'Backend', 'AI/ML'];

const isPlaceholderLink = (url) => {
  if (!url) return true;
  return url.includes('REPO_URL') || url.includes('LIVE_URL');
};

// Extract real hostname or fallback to "${project.title} (screenshot)" (Requirement 1)
const getBrowserFrameLabel = (project) => {
  if (!project) return '';
  if (!isPlaceholderLink(project.live)) {
    try {
      const parsed = new URL(project.live);
      return parsed.hostname;
    } catch {
      return project.live.replace(/^https?:\/\//i, '').replace(/\/.*$/, '');
    }
  }
  return `${project.title} (screenshot)`;
};

const Projects = () => {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState(null);
  const [imgFailed, setImgFailed] = useState({});
  const [imgDimensions, setImgDimensions] = useState({});

  const trackRef = useRef(null);
  const slideRefs = useRef([]);
  const previouslyFocusedRef = useRef(null);

  // Dynamic image dimension handler (Requirement 2: no hardcoded values)
  const handleImageLoad = (id, e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    setImgDimensions((prev) => {
      if (
        prev[id]?.naturalWidth === naturalWidth &&
        prev[id]?.naturalHeight === naturalHeight
      ) {
        return prev;
      }
      return { ...prev, [id]: { naturalWidth, naturalHeight } };
    });
  };

  const handleImageRef = (id, el) => {
    if (el && el.complete && el.naturalWidth) {
      const { naturalWidth, naturalHeight } = el;
      setImgDimensions((prev) => {
        if (
          prev[id]?.naturalWidth === naturalWidth &&
          prev[id]?.naturalHeight === naturalHeight
        ) {
          return prev;
        }
        return { ...prev, [id]: { naturalWidth, naturalHeight } };
      });
    }
  };

  // Mouse drag tracking ref
  const dragRef = useRef({
    isPointerDown: false,
    startX: 0,
    startY: 0,
    scrollLeft: 0,
    isDragging: false,
    directionLocked: null,
    justDragged: false
  });

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const totalSlides = filteredProjects.length;

  // Scroll to a specific slide index
  const scrollToSlide = useCallback((index, instant = false) => {
    const track = trackRef.current;
    if (!track) return;
    const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
    const targetSlide = slideRefs.current[clampedIndex];
    if (!targetSlide) return;

    const targetScrollLeft =
      targetSlide.offsetLeft + targetSlide.offsetWidth / 2 - track.clientWidth / 2;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    track.scrollTo({
      left: Math.max(0, targetScrollLeft),
      behavior: instant || prefersReduced ? 'auto' : 'smooth'
    });

    setActiveIndex(clampedIndex);
    setHasInteracted(true);
  }, [totalSlides]);

  // Handle category chip click
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setActiveIndex(0);
    setScrollProgress(0);
    setHasInteracted(true);

    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  };

  // Track scroll position, active slide, and progress bar
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = null;

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        if (!track) return;

        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll > 0) {
          const progress = (track.scrollLeft / maxScroll) * 100;
          setScrollProgress(Math.min(100, Math.max(0, progress)));
        } else {
          setScrollProgress(100);
        }

        // Center calculation
        const trackCenter = track.scrollLeft + track.clientWidth / 2;
        let closestIdx = 0;
        let minDistance = Infinity;

        slideRefs.current.forEach((slide, idx) => {
          if (!slide) return;
          const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
          const dist = Math.abs(slideCenter - trackCenter);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        });

        setActiveIndex(closestIdx);
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [filteredProjects]);

  // Handle window resize re-centering
  useEffect(() => {
    const onResize = () => {
      scrollToSlide(activeIndex, true);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeIndex, scrollToSlide]);

  // Keyboard navigation when track is focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      if (activeIndex < totalSlides - 1) {
        scrollToSlide(activeIndex + 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      if (activeIndex > 0) {
        scrollToSlide(activeIndex - 1);
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      scrollToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      scrollToSlide(totalSlides - 1);
    }
  };

  // Mouse Drag handlers
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if (e.target.closest('a, button, input')) return;

    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      isPointerDown: true,
      startX: e.clientX,
      startY: e.clientY,
      scrollLeft: track.scrollLeft,
      isDragging: false,
      directionLocked: null,
      justDragged: false
    };
  };

  const handlePointerMove = (e) => {
    const drag = dragRef.current;
    if (!drag.isPointerDown) return;

    const dx = e.clientX - drag.startX;
    const dy = e.clientY - drag.startY;

    if (!drag.directionLocked) {
      if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 5) {
        // Vertical scroll detected: cancel horizontal drag to avoid hijacking vertical scroll
        drag.directionLocked = 'vertical';
        drag.isPointerDown = false;
        return;
      }
      if (Math.abs(dx) > 5) {
        drag.directionLocked = 'horizontal';
        drag.isDragging = true;
        setIsDragging(true);
        setHasInteracted(true);
        try {
          trackRef.current.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
        if (trackRef.current) {
          trackRef.current.style.scrollSnapType = 'none';
          trackRef.current.style.scrollBehavior = 'auto';
        }
      }
    }

    if (drag.isDragging && trackRef.current) {
      e.preventDefault();
      trackRef.current.scrollLeft = drag.scrollLeft - dx;
    }
  };

  const handlePointerUp = (e) => {
    const drag = dragRef.current;
    if (!drag.isPointerDown && !drag.isDragging) return;

    if (drag.isDragging) {
      drag.justDragged = true;
      setTimeout(() => {
        drag.justDragged = false;
      }, 150);

      const track = trackRef.current;
      if (track) {
        try {
          track.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
        track.style.scrollSnapType = 'x mandatory';
        track.style.scrollBehavior = '';
      }

      // Snap to nearest slide on release
      snapToNearestSlide();
    }

    drag.isPointerDown = false;
    drag.isDragging = false;
    drag.directionLocked = null;
    setIsDragging(false);
  };

  const snapToNearestSlide = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackCenter = track.scrollLeft + track.clientWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    slideRefs.current.forEach((slide, idx) => {
      if (!slide) return;
      const slideCenter = slide.offsetLeft + slide.offsetWidth / 2;
      const dist = Math.abs(slideCenter - trackCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = idx;
      }
    });

    scrollToSlide(closestIndex);
  };

  // Open Lightbox
  const handleOpenLightbox = (project) => {
    if (dragRef.current.justDragged) return;
    previouslyFocusedRef.current = document.activeElement;
    setActiveLightbox(project);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="section section-alt projects-section"
    >
      <div className="wrap">
        <SectionTitle
          id="projects-title"
          title="Projects Built"
          accentWord="From Scratch"
          subtitle="Featured Work"
          isGold={true}
        />

        {/* Filter Chips */}
        <div className="projects-filter-bar" role="tablist" aria-label="Filter projects by category">
          {filterCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleCategoryChange(cat)}
                className={`projects-filter-chip ${isActive ? 'active' : ''}`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Controls Bar: Counter, Hint, Dots, Prev/Next buttons */}
        <div className="projects-controls-bar">
          <div className="projects-controls-left">
            <span className="projects-counter" aria-live="polite">
              {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </span>

            <span
              className={`projects-hint ${hasInteracted ? 'hidden' : ''}`}
              aria-hidden="true"
            >
              swipe or drag <FiArrowRight size={11} />
            </span>
          </div>

          <div className="projects-controls-right">
            <div className="projects-dots-group" role="tablist" aria-label="Carousel slide dots">
              {filteredProjects.map((proj, i) => (
                <button
                  key={proj.id}
                  type="button"
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={`Go to slide ${i + 1}: ${proj.title}`}
                  className={`projects-dot ${activeIndex === i ? 'active' : 'inactive'}`}
                  onClick={() => scrollToSlide(i)}
                />
              ))}
            </div>

            <button
              type="button"
              className="projects-nav-btn"
              onClick={() => scrollToSlide(activeIndex - 1)}
              disabled={activeIndex === 0}
              aria-label="Previous slide"
            >
              <FiChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="projects-nav-btn"
              onClick={() => scrollToSlide(activeIndex + 1)}
              disabled={activeIndex === totalSlides - 1}
              aria-label="Next slide"
            >
              <FiChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Progress Bar (Secondary Gold) */}
        <div className="projects-progress-track" aria-hidden="true">
          <div
            className="projects-progress-bar"
            style={{ width: `${totalSlides <= 1 ? 100 : scrollProgress}%` }}
          />
        </div>
      </div>

      {/* Horizontal Carousel Track (Full-bleed, scroll-snap) */}
      <div
        className="projects-carousel-wrap"
        role="region"
        aria-roledescription="carousel"
        aria-label="Projects"
      >
        <div
          ref={trackRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`projects-carousel-track ${isDragging ? 'is-dragging' : ''}`}
          aria-label="Project slides carousel. Use left and right arrow keys to navigate."
        >
          {filteredProjects.map((project, idx) => {
            const livePlaceholder = isPlaceholderLink(project.live);
            const githubPlaceholder = isPlaceholderLink(project.github);
            const isSecondaryAccent = idx % 2 === 1;
            const isActive = activeIndex === idx;

            // Dynamic image sizing detection (Requirement 2)
            const dims = imgDimensions[project.id];
            const isLoaded = Boolean(dims);
            const isLarge = isLoaded ? dims.naturalWidth >= 1000 : true;

            return (
              <div
                key={project.id}
                ref={(el) => (slideRefs.current[idx] = el)}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} of ${totalSlides}`}
                className={`project-carousel-slide ${isActive ? 'active' : 'inactive'}`}
              >
                <div
                  className={`project-slide-card ${
                    isSecondaryAccent ? 'card-gold' : 'card-green'
                  }`}
                >
                  {/* Browser Window Framed Image */}
                  <div className="project-browser-frame">
                    <div className="project-browser-bar">
                      <div className="project-browser-dots" aria-hidden="true">
                        <span className="browser-dot dot-1" />
                        <span className="browser-dot dot-2" />
                        <span className="browser-dot dot-3" />
                      </div>
                      {/* Hostname from live URL or "${title} (screenshot)" (Requirement 1) */}
                      <span className="project-browser-label">
                        {getBrowserFrameLabel(project)}
                      </span>
                      <span className="project-browser-action" aria-hidden="true">
                        <FiMaximize2 size={10} /> view
                      </span>
                    </div>

                    <div
                      className="project-img-container"
                      onClick={() => handleOpenLightbox(project)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleOpenLightbox(project);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-label={`Open full screenshot of ${project.title}`}
                    >
                      {!imgFailed[project.id] && project.image ? (
                        <img
                          ref={(el) => handleImageRef(project.id, el)}
                          src={project.image}
                          alt={`${project.title} Preview`}
                          loading="lazy"
                          onLoad={(e) => handleImageLoad(project.id, e)}
                          onError={() =>
                            setImgFailed((prev) => ({ ...prev, [project.id]: true }))
                          }
                          className={`project-img ${
                            isLoaded && !isLarge ? 'project-img-contain' : 'project-img-cover'
                          }`}
                          style={
                            isLoaded && !isLarge
                              ? {
                                  maxWidth: `${dims.naturalWidth}px`,
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'contain',
                                  objectPosition: 'top'
                                }
                              : {
                                  width: '100%',
                                  height: '100%',
                                  aspectRatio: '16 / 9',
                                  objectFit: 'cover',
                                  objectPosition: 'top',
                                  maxWidth: '100%'
                                }
                          }
                        />
                      ) : (
                        <div className="project-preview-fallback">
                          <span>// preview</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Content Below Image */}
                  <div className="project-card-body">
                    {/* Header: Project Index & Category */}
                    <div className="project-header-row">
                      <span className="project-index">0{project.id} //</span>
                      <span className="project-category-tag">{project.category}</span>
                    </div>

                    {/* Title */}
                    <h3 className="project-title">{project.title}</h3>

                    {/* Subtitle with alternating accent */}
                    <div
                      className={`project-subtitle ${
                        isSecondaryAccent ? 'gold' : 'green'
                      }`}
                    >
                      {project.subtitle}
                    </div>

                    {/* Description */}
                    <p className="project-desc">{project.description}</p>

                    {/* Tech Badges */}
                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag} className="project-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Buttons with alternating accent */}
                    <div className="project-actions">
                      {!livePlaceholder ? (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={isSecondaryAccent ? 'btn btn-fill-gold' : 'btn btn-fill-g'}
                          aria-label={`View live demo of ${project.title}`}
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
                          aria-label={`${project.title} live demo coming soon`}
                        >
                          Coming soon
                        </button>
                      )}

                      {!githubPlaceholder ? (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-icon"
                          aria-label={`View source code for ${project.title} on GitHub`}
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
                          aria-label={`${project.title} repository coming soon`}
                        >
                          <FiGithub size={13} /> Coming soon
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shared Accessible Lightbox */}
      <Lightbox
        isOpen={Boolean(activeLightbox)}
        onClose={() => setActiveLightbox(null)}
        title={activeLightbox ? `${activeLightbox.title} Screenshot Preview` : ''}
        topbarLabel={activeLightbox ? `preview // ${getBrowserFrameLabel(activeLightbox)}` : ''}
        triggerRef={previouslyFocusedRef}
        image={{
          src: activeLightbox && !imgFailed[activeLightbox.id] ? activeLightbox.image : null,
          alt: activeLightbox ? `${activeLightbox.title} Full View` : '',
          naturalWidth: activeLightbox ? imgDimensions[activeLightbox.id]?.naturalWidth : undefined,
          naturalHeight: activeLightbox ? imgDimensions[activeLightbox.id]?.naturalHeight : undefined,
          maxWidth: activeLightbox && imgDimensions[activeLightbox.id]?.naturalWidth
            ? `min(100%, ${imgDimensions[activeLightbox.id].naturalWidth}px)`
            : '100%',
          maxHeight: activeLightbox && imgDimensions[activeLightbox.id]?.naturalHeight
            ? `min(65vh, ${imgDimensions[activeLightbox.id].naturalHeight}px)`
            : '65vh',
          onLoad: (e) => activeLightbox && handleImageLoad(activeLightbox.id, e)
        }}
        bottomContent={
          activeLightbox ? (
            <div className="lightbox-bottombar">
              <div className="lightbox-bottombar-left">
                <span className="lightbox-project-title">{activeLightbox.title}</span>
                <span className="lightbox-project-cat">{activeLightbox.category}</span>
              </div>

              <div className="lightbox-bottombar-actions">
                {!isPlaceholderLink(activeLightbox.live) ? (
                  <a
                    href={activeLightbox.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-fill-g"
                    aria-label={`View live demo of ${activeLightbox.title}`}
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

                {!isPlaceholderLink(activeLightbox.github) ? (
                  <a
                    href={activeLightbox.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-icon"
                    aria-label={`View source code for ${activeLightbox.title} on GitHub`}
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
            </div>
          ) : null
        }
      />
    </section>
  );
};

export default Projects;
