import React, { useState } from 'react';
import { FiMaximize2 } from 'react-icons/fi';
import './Lightbox.css';

const ProofThumbnail = ({
  proof,
  role,
  date,
  onOpen,
  className = ''
}) => {
  const [hasError, setHasError] = useState(false);

  // If proof is missing or fails to load, gracefully hide without broken image icon
  if (!proof?.src || hasError) return null;

  const isPortrait = proof.height && proof.width ? proof.height > proof.width : false;
  const isLetter =
    proof.src.includes('hostel') ||
    proof.src.includes('letter') ||
    (proof.alt && proof.alt.toLowerCase().includes('letter')) ||
    isPortrait;

  const badgeText = isLetter ? 'View Letter' : 'View Certificate';
  const accessibleName = `View ${role || (isLetter ? 'appointment letter' : 'certificate')}, enlarge`;

  return (
    <button
      type="button"
      onClick={(e) => {
        onOpen(proof, role, date, e.currentTarget);
      }}
      aria-label={accessibleName}
      className={`proof-stage-btn ${isPortrait ? 'proof-stage-portrait' : 'proof-stage-landscape'} ${className}`}
    >
      <div
        className="proof-stage-frame"
        style={
          isPortrait || !proof.width || !proof.height
            ? undefined
            : { aspectRatio: `${proof.width} / ${proof.height}` }
        }
      >
        <img
          src={proof.src}
          alt={proof.alt || accessibleName}
          width={proof.width}
          height={proof.height}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="proof-stage-img"
        />

        {/* Floating caption chip overlay at bottom-right */}
        <div className="proof-stage-chip" aria-hidden="true">
          <FiMaximize2 size={11} />
          <span>{badgeText}</span>
        </div>

        {/* Hover / focus "Click to enlarge" badge for portrait */}
        {isPortrait && (
          <div className="proof-enlarge-hint" aria-hidden="true">
            <span>Click to enlarge</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default ProofThumbnail;
