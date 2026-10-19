import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FiMail, FiMapPin, FiCopy, FiCheck, FiSend, FiGithub, FiLinkedin, FiDownload } from 'react-icons/fi';
import SectionTitle from '../components/SectionTitle';
import { API_ENDPOINTS } from '../services/api';

const EMAIL_ADDRESS = 'aryanchaturvedi2006@gmail.com';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    honeypot: ''
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error', text: '' }
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL_ADDRESS).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const validate = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email.trim())) {
      errors.email = 'Please provide a valid email address';
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    // Bot honeypot: ignore silently if filled
    if (formData.honeypot) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStatusMessage({
          type: 'success',
          text: 'Message received successfully! I will reply shortly.'
        });
        setFormData({ name: '', email: '', message: '', honeypot: '' });
      }, 700);
      return;
    }

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(API_ENDPOINTS.contact, {
        name: formData.name.trim(),
        email: formData.email.trim(),
        message: formData.message.trim()
      });

      if (response.status === 201 || response.data?.success) {
        setStatusMessage({
          type: 'success',
          text: 'Message received successfully! I will reply shortly.'
        });
        setFormData({ name: '', email: '', message: '', honeypot: '' });
        setFieldErrors({});
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 429) {
          setStatusMessage({
            type: 'error',
            text: 'Too many contact requests from this IP. Please try again after 15 minutes.'
          });
        } else if (err.response.status === 400) {
          const serverError =
            err.response.data?.error || 'Invalid form input. Please check all fields.';
          setStatusMessage({
            type: 'error',
            text: serverError
          });
        } else {
          setStatusMessage({
            type: 'error',
            text: err.response.data?.error || 'Failed to send message. Please try again later.'
          });
        }
      } else {
        // Network or server unreachable
        setStatusMessage({
          type: 'error',
          text: 'Could not reach the server, please try again'
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="wrap">
        <SectionTitle id="contact-title" title="Let's" accentWord="Connect" subtitle="Get In Touch" />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <p
              style={{
                fontSize: '0.96rem',
                color: 'var(--muted)',
                lineHeight: 1.85,
                fontWeight: 300,
                marginBottom: '2rem'
              }}
            >
              Have an opportunity, internship inquiry, or technical collaboration in mind? Feel free to reach out directly via email or the contact form. I typically respond within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
              {/* Email Block with Copy Button - Odd / Green */}
              <div
                className="card card-green"
                style={{
                  backgroundColor: 'var(--ink2)',
                  padding: '1.2rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FiMail size={16} color="var(--green)" />
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.6rem',
                        color: 'var(--muted)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'block'
                      }}
                    >
                      Email
                    </span>
                    <a
                      href={`mailto:${EMAIL_ADDRESS}`}
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '0.9rem',
                        color: 'var(--text)',
                        fontWeight: 500
                      }}
                    >
                      {EMAIL_ADDRESS}
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn btn-icon-gold"
                  style={{
                    padding: '0.45rem 0.8rem',
                    fontSize: '0.65rem'
                  }}
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <FiCheck size={12} color="var(--green)" /> <span style={{ color: 'var(--green)' }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FiCopy size={12} color="var(--gold)" /> <span style={{ color: 'var(--gold)' }}>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Location Block - Even / Gold */}
              <div
                className="card card-gold"
                style={{
                  backgroundColor: 'var(--ink2)',
                  padding: '1.2rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <FiMapPin size={16} color="var(--gold)" />
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.6rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block'
                    }}
                  >
                    Location
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--sans)',
                      fontSize: '0.9rem',
                      color: 'var(--text)',
                      fontWeight: 500
                    }}
                  >
                    Jaipur, Rajasthan
                  </span>
                </div>
              </div>

              {/* Resume Download Block - Odd / Green */}
              <div
                className="card card-green"
                style={{
                  backgroundColor: 'var(--ink2)',
                  padding: '1.2rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FiDownload size={16} color="var(--green)" />
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.6rem',
                        color: 'var(--muted)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        display: 'block'
                      }}
                    >
                      Resume / CV
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--sans)',
                        fontSize: '0.9rem',
                        color: 'var(--text)',
                        fontWeight: 500
                      }}
                    >
                      Download Resume
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a
                    href={API_ENDPOINTS.resumePdf}
                    download="Aryan_Chaturvedi_Resume.pdf"
                    className="btn btn-fill-gold"
                    style={{
                      padding: '0.45rem 0.8rem',
                      fontSize: '0.65rem'
                    }}
                    aria-label="Download Resume PDF"
                  >
                    <FiDownload size={12} /> PDF
                  </a>

                  <a
                    href={API_ENDPOINTS.resumeDocx}
                    download="Aryan_Chaturvedi_Resume.docx"
                    className="btn btn-line-gold"
                    style={{
                      padding: '0.45rem 0.8rem',
                      fontSize: '0.65rem'
                    }}
                    aria-label="Download Resume DOCX"
                  >
                    <FiDownload size={12} /> DOCX
                  </a>
                </div>
              </div>
            </div>

            {/* Social Profile Links */}
            <div>
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '0.65rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.8rem'
                }}
              >
                Profiles &amp; Code
              </span>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
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
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div
              className="card"
              style={{
                backgroundColor: 'var(--ink2)',
                border: '1px solid var(--border)',
                borderRadius: '2px',
                padding: '2rem'
              }}
            >
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot Field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formData.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                />

                {/* Name Field */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="contact-name"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.64rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--ink3)',
                      border: `1px solid ${fieldErrors.name ? 'var(--error)' : 'var(--border)'}`,
                      borderRadius: '2px',
                      padding: '0.75rem 1rem',
                      color: 'var(--text)',
                      fontFamily: 'var(--sans)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  {fieldErrors.name && (
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.64rem',
                        color: 'var(--error)',
                        marginTop: '4px',
                        display: 'block'
                      }}
                    >
                      {fieldErrors.name}
                    </span>
                  )}
                </div>

                {/* Email Field */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label
                    htmlFor="contact-email"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.64rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--ink3)',
                      border: `1px solid ${fieldErrors.email ? 'var(--error)' : 'var(--border)'}`,
                      borderRadius: '2px',
                      padding: '0.75rem 1rem',
                      color: 'var(--text)',
                      fontFamily: 'var(--sans)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                  />
                  {fieldErrors.email && (
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.64rem',
                        color: 'var(--error)',
                        marginTop: '4px',
                        display: 'block'
                      }}
                    >
                      {fieldErrors.email}
                    </span>
                  )}
                </div>

                {/* Message Field */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    htmlFor="contact-message"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.64rem',
                      color: 'var(--muted)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.4rem'
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, opportunity or question..."
                    style={{
                      width: '100%',
                      backgroundColor: 'var(--ink3)',
                      border: `1px solid ${fieldErrors.message ? 'var(--error)' : 'var(--border)'}`,
                      borderRadius: '2px',
                      padding: '0.75rem 1rem',
                      color: 'var(--text)',
                      fontFamily: 'var(--sans)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'vertical',
                      lineHeight: 1.6,
                      transition: 'border-color 0.2s'
                    }}
                  />
                  {fieldErrors.message && (
                    <span
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '0.64rem',
                        color: 'var(--error)',
                        marginTop: '4px',
                        display: 'block'
                      }}
                    >
                      {fieldErrors.message}
                    </span>
                  )}
                </div>

                {/* Status Message (Success or Error) */}
                {statusMessage && (
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '0.72rem',
                      marginBottom: '1.25rem',
                      color: statusMessage.type === 'success' ? 'var(--green)' : 'var(--error)',
                      padding: '0.6rem 0.8rem',
                      backgroundColor: 'var(--ink3)',
                      border: `1px solid ${statusMessage.type === 'success' ? 'var(--green)' : 'var(--error)'}`,
                      borderRadius: '2px',
                      lineHeight: 1.5
                    }}
                  >
                    {statusMessage.text}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-fill-g"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? (
                    'Sending...'
                  ) : (
                    <>
                      <FiSend size={13} /> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
