import React, { Suspense, lazy } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../sections/Hero';

// Below-the-fold sections lazy-loaded for performance
const About = lazy(() => import('../sections/About'));
const Skills = lazy(() => import('../sections/Skills'));
const Projects = lazy(() => import('../sections/Projects'));
const Timeline = lazy(() => import('../sections/Timeline'));
const Certifications = lazy(() => import('../sections/Certifications'));
const Contact = lazy(() => import('../sections/Contact'));

const SectionFallback = () => (
  <div
    style={{
      minHeight: '200px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent'
    }}
    aria-hidden="true"
  >
    <div
      style={{
        width: '16px',
        height: '16px',
        border: '2px solid var(--border)',
        borderTopColor: 'var(--green)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }}
    />
  </div>
);

const Home = () => {
  return (
    <div className="portfolio-app">
      {/* Accessibility Skip Link */}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {/* Eager Navigation */}
      <Navbar />

      {/* Main Content Landmark */}
      <main id="main-content">
        {/* Eager Hero */}
        <Hero />

        {/* Lazy Loaded Below-the-Fold Sections */}
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Certifications />
          <Contact />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
