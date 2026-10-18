import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { FiArrowUp } from 'react-icons/fi';
import { ThemePicker, ThemeChipsMobile } from './ThemePicker';
import './Navbar.css';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' }
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Framer Motion scroll progress bar (thin gold fixed at top)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for Back-to-Top button (visible after 600px)
  useEffect(() => {
    const handleScrollPos = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScrollPos, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollPos);
  }, []);

  // IntersectionObserver for active section highlighting
  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'timeline', 'certifications', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.1
      }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleScroll = (href) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="site-header">
      {/* Scroll Progress Bar (Framer Motion scaleX + Gold) */}
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <nav id="nav" className="nav-bar" aria-label="Main Navigation">
        <a
          href="#hero"
          className="logo"
          onClick={(e) => {
            e.preventDefault();
            handleScroll('#hero');
          }}
          aria-label="Aryan Chaturvedi Home"
        >
          <span className="logo-ac">AC</span>
          <span className="logo-dot">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={`nav-link-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleScroll(item.href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right Actions */}
        <div className="nav-right-actions">
          <a
            href="mailto:aryanchaturvedi2006@gmail.com"
            className="nav-hire"
            aria-label="Hire Aryan Chaturvedi via Email"
          >
            Hire Me
          </a>

          <ThemePicker />

          <button
            type="button"
            className={`ham ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`mob-menu ${mobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <ul className="mob-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <li key={item.label}>
                <button
                  type="button"
                  className={`mob-link-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleScroll(item.href)}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        <ThemeChipsMobile />

        <a
          href="mailto:aryanchaturvedi2006@gmail.com"
          className="btn btn-line-gold"
          style={{ justifyContent: 'center' }}
          aria-label="Hire Me via Email"
        >
          Hire Me
        </a>
      </div>

      {/* Back to top floating button (after 600px of scroll) */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            className="btn-back-to-top"
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2 }}
          >
            <FiArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
