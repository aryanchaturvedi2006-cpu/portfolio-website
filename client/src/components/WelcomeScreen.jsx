import React, { useState, useEffect, useCallback } from 'react';
import './WelcomeScreen.css';

const WelcomeScreen = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    if (isClosing || isDismissed) return;
    setIsClosing(true);
    setTimeout(() => {
      document.body.style.overflow = '';
      setIsDismissed(true);
    }, 500);
  }, [isClosing, isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Auto-dismiss after 1.8 seconds of clean presentation
    const timer = setTimeout(() => {
      handleDismiss();
    }, 1800);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [handleDismiss, isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`welcome-screen ${isClosing ? 'welcome-screen-exit' : ''}`}
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Aryan Chaturvedi welcomes you"
    >
      <div className="welcome-inner">
        <h1 className="welcome-name">Aryan Chaturvedi</h1>
        <div className="welcome-text">welcomes you</div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
