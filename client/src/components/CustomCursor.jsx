import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    let rafId = null;
    let isActive = false;
    let hasMoved = false;

    let mx = -100;
    let my = -100;
    let rx = -100;
    let ry = -100;

    let ringScale = 1;
    let targetRingScale = 1;
    let dotScale = 1;
    let targetDotScale = 1;

    const prefersReducedMotion = () => {
      try {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      } catch {
        return false;
      }
    };

    const showCursor = () => {
      if (dotRef.current && !dotRef.current.classList.contains('c-visible')) {
        dotRef.current.classList.add('c-visible');
      }
      if (ringRef.current && !ringRef.current.classList.contains('c-visible')) {
        ringRef.current.classList.add('c-visible');
      }
    };

    const hideCursor = () => {
      if (dotRef.current) {
        dotRef.current.classList.remove('c-visible');
      }
      if (ringRef.current) {
        ringRef.current.classList.remove('c-visible');
      }
    };

    const checkInteractive = (target) => {
      if (!target) return;
      const isInput = Boolean(target.closest('input, textarea'));
      const isInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], [role="tab"], [role="menuitemradio"], [role="radio"], summary, .cursor-hover, .btn, .filter-chip, .project-card, .proof-thumbnail, .theme-swatch, .theme-option-btn, .theme-chip, .lightbox-back-btn, .lightbox-close-btn, .card'
        )
      );

      if (isInput) {
        dotRef.current?.classList.add('c-text-mode');
        ringRef.current?.classList.add('c-text-mode');
      } else {
        dotRef.current?.classList.remove('c-text-mode');
        ringRef.current?.classList.remove('c-text-mode');
      }

      if (isInteractive) {
        targetRingScale = 1.35;
        targetDotScale = 0.75;
        dotRef.current?.classList.add('cursor-hover');
        ringRef.current?.classList.add('cursor-hover');
      } else {
        targetRingScale = 1;
        targetDotScale = 1;
        dotRef.current?.classList.remove('cursor-hover');
        ringRef.current?.classList.remove('cursor-hover');
      }
    };

    const onPointerMove = (e) => {
      // If event is touch, hide custom cursor
      if (e.pointerType === 'touch') {
        hideCursor();
        return;
      }

      mx = e.clientX;
      my = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        rx = mx;
        ry = my;
      }

      if (!isActive) {
        isActive = true;
        document.documentElement.classList.add('custom-cursor-active');
      }

      showCursor();
      checkInteractive(e.target);
    };

    const onPointerLeave = (e) => {
      if (!e.relatedTarget && !e.toElement) {
        hideCursor();
      }
    };

    const onPointerEnter = (e) => {
      if (e.pointerType === 'touch') return;
      if (hasMoved) {
        showCursor();
      }
    };

    const onTouchStart = () => {
      hideCursor();
    };

    const loop = () => {
      if (hasMoved) {
        const reduced = prefersReducedMotion();
        if (reduced) {
          rx = mx;
          ry = my;
          ringScale = targetRingScale;
          dotScale = targetDotScale;
        } else {
          rx += (mx - rx) * 0.22;
          ry += (my - ry) * 0.22;
          ringScale += (targetRingScale - ringScale) * 0.22;
          dotScale += (targetDotScale - dotScale) * 0.22;
        }

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${dotScale.toFixed(3)})`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);
    document.addEventListener('mouseenter', onPointerEnter);
    window.addEventListener('blur', hideCursor);
    window.addEventListener('touchstart', onTouchStart, { passive: true });

    rafId = requestAnimationFrame(loop);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      document.documentElement.classList.remove('custom-cursor-active');
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
      document.removeEventListener('mouseenter', onPointerEnter);
      window.removeEventListener('blur', hideCursor);
      window.removeEventListener('touchstart', onTouchStart);
    };
  }, []);

  return (
    <>
      <div id="c-dot" ref={dotRef} aria-hidden="true" />
      <div id="c-ring" ref={ringRef} aria-hidden="true" />
    </>
  );
};

export default CustomCursor;
