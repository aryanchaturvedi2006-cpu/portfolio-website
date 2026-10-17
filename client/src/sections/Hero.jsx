import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi';
import './Hero.css';

const Hero = () => {
  const apiUrl = import.meta.env.VITE_API_URL || '';

  const handleScrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.08
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: 'easeOut' }
    }
  };

  return (
    <section id="hero">
      <div className="hero-bg-g" aria-hidden="true" />
      <div className="hero-bg-gold" aria-hidden="true" />

      <div className="hero-wrap">
        {/* Left Content Column */}
        <motion.div
          className="hero-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={itemVariants}>
            <div className="hero-eyebrow">
              <span className="pulse" />
              B.Tech CSE &amp; AI — JK Lakshmipat University · 2024–28
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1 className="hero-name" variants={itemVariants}>
            <span className="hn-line1">Aryan</span>
            <span className="hn-line2">Chaturvedi.</span>
          </motion.h1>

          {/* Typewriter Roles */}
          <motion.div className="hero-sub" variants={itemVariants}>
            <span className="tw-gold">
              <TypeAnimation
                sequence={[
                  'Full Stack Developer.',
                  2000,
                  'MERN Stack Developer.',
                  2000,
                  'AI/ML Enthusiast.',
                  2000,
                  'B.Tech CSE & AI Student.',
                  2000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </motion.div>

          {/* Description */}
          <motion.p className="hero-desc" variants={itemVariants}>
            I build intelligent web applications powered by data. From full-stack cafeteria solutions with Razorpay and Next.js, to live IPL news scraping and match prediction — I turn real problems into clean, working software.
          </motion.p>

          {/* Buttons */}
          <motion.div className="hero-btns" variants={itemVariants}>
            <button
              type="button"
              className="btn btn-fill-g"
              onClick={handleScrollToProjects}
            >
              View Projects <FiArrowDown size={13} />
            </button>

            <a
              href={`${apiUrl}/api/resume/pdf`}
              className="btn btn-fill-gold"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <FiDownload size={13} /> Download CV (PDF)
            </a>

            <a
              href={`${apiUrl}/api/resume/docx`}
              className="btn btn-line"
              target="_blank"
              rel="noopener noreferrer"
              download
            >
              <FiDownload size={13} /> Download CV (DOCX)
            </a>

            <a
              href="https://github.com/aryanchaturvedi2006-cpu"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-icon"
              aria-label="GitHub Profile"
            >
              <FiGithub size={14} /> GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/aryan-chaturvedi-401181329/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-icon"
              aria-label="LinkedIn Profile"
            >
              <FiLinkedin size={14} /> LinkedIn
            </a>
          </motion.div>

          {/* Hero Stats */}
          <motion.div className="hero-stats" variants={itemVariants}>
            <div>
              <span className="hstat-num g">4</span>
              <span className="hstat-lbl">Projects Built</span>
            </div>
            <div>
              <span className="hstat-num g">10+</span>
              <span className="hstat-lbl">Technologies</span>
            </div>
            <div>
              <span className="hstat-num gold">2024</span>
              <span className="hstat-lbl">Started Coding</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Info Card Column */}
        <motion.div
          className="hero-card"
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.25 }}
        >
          <div className="hc-tag">// quick.info</div>
          <div className="hc-row">
            <span className="hc-k">name</span>
            <span className="hc-v">Aryan Chaturvedi</span>
          </div>
          <div className="hc-sep" />
          <div className="hc-row">
            <span className="hc-k">university</span>
            <span className="hc-v">JK Lakshmipat University</span>
          </div>
          <div className="hc-row">
            <span className="hc-k">degree</span>
            <span className="hc-v">B.Tech CSE &amp; AI</span>
          </div>
          <div className="hc-row">
            <span className="hc-k">batch</span>
            <span className="hc-v">2024 – 2028</span>
          </div>
          <div className="hc-sep" />
          <div className="hc-row">
            <span className="hc-k">location</span>
            <span className="hc-v">Jaipur, Rajasthan</span>
          </div>
          <div className="hc-row">
            <span className="hc-k">status</span>
            <span className="hc-v g">● Open to Internships</span>
          </div>
          <div className="hc-row">
            <span className="hc-k">role</span>
            <span className="hc-v gold">Boys' Hostel Coordinator</span>
          </div>
          <div className="hc-row">
            <span className="hc-k">role</span>
            <span className="hc-v gold">Discipline Coordinator</span>
          </div>
        </motion.div>
      </div>

      <div className="scroll-cue">scroll</div>
    </section>
  );
};

export default Hero;
