import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      return;
    }

    let mx = 0;
    let my = 0;
    let rx = 0;
    let ry = 0;
    let rafId = null;

    const onMouseMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${mx}px`;
        dotRef.current.style.top = `${my}px`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      rafId = requestAnimationFrame(loop);
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (target && target.closest('a, button, input, textarea, select, .cursor-hover, [role="button"]')) {
        document.body.classList.add('cursor-gold');
      } else {
        document.body.classList.remove('cursor-gold');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
      document.body.classList.remove('cursor-gold');
    };
  }, []);

  return (
    <>
      <div id="c-dot" ref={dotRef} />
      <div id="c-ring" ref={ringRef} />
    </>
  );
};

export default CustomCursor;
