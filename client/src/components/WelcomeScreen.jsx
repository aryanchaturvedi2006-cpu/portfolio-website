import React, { useState, useEffect, useCallback, useRef } from 'react';
import './WelcomeScreen.css';

const TARGET_TEXT = 'welcomes you';
const GLYPHS = '!<>-_/[]{}*^?#_01abcdef';

const renderLetters = (word) =>
  [...word].map((c, i) => (
    <span key={i} className="splash-char-mask">
      <span className="splash-char">{c}</span>
    </span>
  ));

const WelcomeScreen = () => {
  const [shouldShow] = useState(() => {
    try {
      return !sessionStorage.getItem('ac-splash-seen');
    } catch {
      return true;
    }
  });

  const [isCompleted, setIsCompleted] = useState(!shouldShow);
  const [exitMode, setExitMode] = useState('');
  const [progress, setProgress] = useState(0);
  const [scrambleText, setScrambleText] = useState('            ');
  const [showCaret, setShowCaret] = useState(false);

  const startTimeRef = useRef(0);
  const hasFinishedRef = useRef(false);
  const animFrameRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const originalOverflowRef = useRef('');

  const finishSplash = useCallback(() => {
    if (hasFinishedRef.current) return;
    hasFinishedRef.current = true;
    try {
      sessionStorage.setItem('ac-splash-seen', 'true');
    } catch {}
    document.body.style.overflow = originalOverflowRef.current || '';
    document.documentElement.classList.remove('splash-active');
    window.dispatchEvent(new CustomEvent('ac-splash-done'));
    setIsCompleted(true);
  }, []);

  const triggerExit = useCallback(
    (fast = false) => {
      if (hasFinishedRef.current || exitMode) return;
      setExitMode(fast ? 'fast' : 'normal');
      setTimeout(finishSplash, fast ? 400 : 700);
    },
    [finishSplash, exitMode]
  );

  useEffect(() => {
    if (!shouldShow) {
      window.dispatchEvent(new CustomEvent('ac-splash-done'));
      return;
    }

    const isReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    originalOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.classList.add('splash-active');

    if (isReduced) {
      setScrambleText(TARGET_TEXT);
      setProgress(100);
      const timer = setTimeout(() => {
        setExitMode('fast');
        setTimeout(finishSplash, 300);
      }, 800);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = originalOverflowRef.current || '';
        document.documentElement.classList.remove('splash-active');
      };
    }

    startTimeRef.current = performance.now();

    const loop = (now) => {
      if (hasFinishedRef.current) return;
      const elapsed = now - startTimeRef.current;
      setProgress(elapsed >= 2300 ? 100 : (elapsed / 23) | 0);

      if (elapsed >= 1300 && elapsed < 2200) {
        setShowCaret(true);
        if (now - lastUpdateRef.current > 35) {
          lastUpdateRef.current = now;
          const dt = elapsed - 1300;
          setScrambleText(
            TARGET_TEXT.replace(/\S/g, (ch, i) =>
              dt < i * 45 ? '\u00A0' : dt >= i * 45 + 300 ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]
            )
          );
        }
      } else if (elapsed >= 2200) {
        setShowCaret(false);
        setScrambleText(TARGET_TEXT);
      }

      if (elapsed >= 2300 && !exitMode) {
        triggerExit(false);
        return;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    const onKey = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') triggerExit(true);
    };
    window.addEventListener('keydown', onKey);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflowRef.current || '';
      document.documentElement.classList.remove('splash-active');
    };
  }, [finishSplash, shouldShow, triggerExit, exitMode]);

  if (isCompleted || !shouldShow) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`splash-overlay ${exitMode ? 'splash-exiting' : ''} ${exitMode === 'fast' ? 'splash-fast-exit' : ''}`}
      onClick={() => triggerExit(true)}
      aria-label="Cinematic intro splash screen"
    >
      <span className="splash-sr-only">Aryan Chaturvedi welcomes you</span>
      <div className="splash-curtain-top" aria-hidden="true" />
      <div className="splash-curtain-bottom" aria-hidden="true" />

      <div className="splash-center" aria-hidden="true">
        <div className="splash-mono-label">PORTFOLIO / 2026</div>
        <div className="splash-accent-line" />

        <h1 className="splash-name">
          <span className="splash-word splash-w1">{renderLetters('Aryan')}</span>
          <span className="splash-space">&nbsp;</span>
          <span className="splash-word splash-w2">{renderLetters('Chaturvedi')}</span>
        </h1>

        <div className="splash-subtitle-wrap">
          <div className="splash-subtitle">
            <span>{scrambleText}</span>
            {showCaret && <span className="splash-caret" />}
          </div>
        </div>
      </div>

      <div className="splash-footer" aria-hidden="true">
        <div className="splash-counter">{String(progress).padStart(3, '0')}</div>
        <button
          type="button"
          className="splash-skip-btn cursor-hover"
          onClick={(e) => {
            e.stopPropagation();
            triggerExit(true);
          }}
          aria-label="Skip intro animation"
        >
          Skip &#8629;
        </button>
      </div>

      <div className="splash-progress-bar" style={{ width: `${progress}%` }} aria-hidden="true" />
    </div>
  );
};

export default WelcomeScreen;
