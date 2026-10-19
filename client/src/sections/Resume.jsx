import React from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiDownload } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { API_ENDPOINTS } from '../services/api';
import './Resume.css';

const Resume = () => {
  return (
    <section id="resume" aria-labelledby="resume-title" className="section">
      <div className="wrap resume-wrap">
        <SectionTitle
          id="resume-title"
          title="Download My"
          accentWord="CV"
          subtitle="06. Resume"
          isGold={false}
        />

        <p className="resume-desc">
          Get a copy of my full resume in your preferred format
        </p>

        <div className="resume-grid">
          {/* Card 1: PDF */}
          <motion.div
            className="resume-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <div className="resume-icon-badge green" aria-hidden="true">
              <FiFileText size={26} />
            </div>

            <h3 className="resume-card-title">Download PDF Resume</h3>
            <p className="resume-card-sub">Best for sharing &amp; applying</p>

            <a
              href={API_ENDPOINTS.resumePdf}
              download="Aryan_Chaturvedi_Resume.pdf"
              className="btn btn-fill-g resume-download-btn cursor-hover"
              aria-label="Download PDF Resume"
            >
              <FiDownload size={15} /> Download
            </a>
          </motion.div>

          {/* Card 2: DOCX */}
          <motion.div
            className="resume-card resume-card-gold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1 }}
          >
            <div className="resume-icon-badge gold" aria-hidden="true">
              <FiFileText size={26} />
            </div>

            <h3 className="resume-card-title">Download DOCX Resume</h3>
            <p className="resume-card-sub">Editable Word document</p>

            <a
              href={API_ENDPOINTS.resumeDocx}
              download="Aryan_Chaturvedi_Resume.docx"
              className="btn btn-fill-gold resume-download-btn cursor-hover"
              aria-label="Download DOCX Resume"
            >
              <FiDownload size={15} /> Download
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
