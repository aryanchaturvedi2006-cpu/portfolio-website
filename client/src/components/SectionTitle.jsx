import React from 'react';

const SectionTitle = ({ title, subtitle, accentWord, isGold = false, id }) => {
  return (
    <div style={{ marginBottom: '2.5rem' }}>
      {subtitle && (
        <div className={`eyebrow ${isGold ? 'gold' : ''}`}>
          {subtitle}
        </div>
      )}
      <h2 id={id} className="sec-title">
        {title}
        {accentWord && (
          <>
            {' '}
            <span className={isGold ? 'gold' : 'g'}>{accentWord}.</span>
          </>
        )}
      </h2>
    </div>
  );
};

export default SectionTitle;
