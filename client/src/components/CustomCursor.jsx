import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let rafId = null;
    let isActive = false;
    let hasMoved = false;

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;

    let ringScale = 1;
    let targetRingScale = 1;
    let dotScale = 1;
    let targetDotScale = 1;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;

      if (!hasMoved) {
        hasMoved = true;
        rx = mx;
        ry = my;
        if (dotRef.current) dotRef.current.classList.add('c-visible');
        if (ringRef.current) ringRef.current.classList.add('c-visible');
      }
    };

    const onMouseLeave = () => {
      if (dotRef.current) dotRef.current.classList.remove('c-visible');
      if (ringRef.current) ringRef.current.classList.remove('c-visible');
    };

    const onMouseEnter = () => {
      if (hasMoved) {
        if (dotRef.current) dotRef.current.classList.add('c-visible');
        if (ringRef.current) ringRef.current.classList.add('c-visible');
      }
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const isInput = Boolean(target.closest('input, textarea'));
      const isInteractive = Boolean(
        target.closest(
          'a, button, [role="button"], [role="tab"], [role="menuitemradio"], summary, .cursor-hover, .btn, .filter-chip, .project-card, .proof-thumbnail, .theme-swatch'
        )
      );

      if (isInput) {
        if (dotRef.current) dotRef.current.classList.add('c-text-mode');
        if (ringRef.current) ringRef.current.classList.add('c-text-mode');
      } else {
        if (dotRef.current) dotRef.current.classList.remove('c-text-mode');
        if (ringRef.current) ringRef.current.classList.remove('c-text-mode');
      }

      if (isInteractive) {
        targetRingScale = 1.35;
        targetDotScale = 0.75;
        if (dotRef.current) dotRef.current.classList.add('cursor-hover');
        if (ringRef.current) ringRef.current.classList.add('cursor-hover');
      } else {
        targetRingScale = 1;
        targetDotScale = 1;
        if (dotRef.current) dotRef.current.classList.remove('cursor-hover');
        if (ringRef.current) ringRef.current.classList.remove('cursor-hover');
      }
    };

    const loop = () => {
      if (hasMoved) {
        rx += (mx - rx) * 0.2;
        ry += (my - ry) * 0.2;
        ringScale += (targetRingScale - ringScale) * 0.2;
        dotScale += (targetDotScale - dotScale) * 0.2;

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%) scale(${dotScale.toFixed(3)})`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${rx.toFixed(2)}px, ${ry.toFixed(2)}px, 0) translate(-50%, -50%) scale(${ringScale.toFixed(3)})`;
        }
      }
      rafId = requestAnimationFrame(loop);
    };

    const activate = () => {
      if (isActive) return;
      isActive = true;
      document.documentElement.classList.add('custom-cursor-active');

      window.addEventListener('mousemove', onMouseMove, { passive: true });
      document.addEventListener('mouseleave', onMouseLeave);
      document.addEventListener('mouseenter', onMouseEnter);
      window.addEventListener('mouseover', onMouseOver, { passive: true });
      rafId = requestAnimationFrame(loop);
    };

    const deactivate = () => {
      if (!isActive) return;
      isActive = false;
      document.documentElement.classList.remove('custom-cursor-active');

      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseover', onMouseOver);

      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      if (dotRef.current) {
        dotRef.current.classList.remove('c-visible', 'cursor-hover', 'c-text-mode');
      }
      if (ringRef.current) {
        ringRef.current.classList.remove('c-visible', 'cursor-hover', 'c-text-mode');
      }
    };

    const syncState = () => {
      const shouldEnable = finePointerQuery.matches && !reducedMotionQuery.matches;
      if (shouldEnable) {
        activate();
      } else {
        deactivate();
      }
    };

    syncState();

    const handleMediaChange = () => syncState();

    try {
      finePointerQuery.addEventListener('change', handleMediaChange);
      reducedMotionQuery.addEventListener('change', handleMediaChange);
    } catch {
      finePointerQuery.addListener?.(handleMediaChange);
      reducedMotionQuery.addListener?.(handleMediaChange);
    }

    return () => {
      deactivate();
      try {
        finePointerQuery.removeEventListener('change', handleMediaChange);
        reducedMotionQuery.removeEventListener('change', handleMediaChange);
      } catch {
        finePointerQuery.removeListener?.(handleMediaChange);
        reducedMotionQuery.removeListener?.(handleMediaChange);
      }
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
