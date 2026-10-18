import React from 'react';
import { FiFileText } from 'react-icons/fi';
import './Lightbox.css';

const ProofThumbnail = ({
  proof,
  role,
  date,
  onOpen,
  className = ''
}) => {
  if (!proof?.src) return null;

  const isCertificate =
    proof.src.includes('hackjklu') || proof.src.includes('certificate');
  const label = isCertificate ? 'View certificate' : 'View letter';
  const ariaLabel = isCertificate
    ? 'View HackJKLU certificate'
    : "View Boys' Hostel Coordinator appointment letter";

  // Explicit width & height to avoid layout shift (Requirement 2)
  const thumbWidth = 160;
  const thumbHeight = Math.round(thumbWidth * (proof.height / proof.width));

  return (
    <button
      type="button"
      onClick={(e) => {
        onOpen(proof, role, date, e.currentTarget);
      }}
      aria-label={ariaLabel}
      className={`leadership-proof-btn ${className}`}
    >
      <div className="leadership-proof-thumb-wrap">
        <img
          src={proof.src}
          alt={proof.alt || label}
          width={thumbWidth}
          height={thumbHeight}
          loading="lazy"
          className="leadership-proof-thumb"
        />
        <div className="leadership-proof-badge">
          <FiFileText size={12} aria-hidden="true" />
          <span>{label}</span>
        </div>
      </div>
    </button>
  );
};

export default ProofThumbnail;
