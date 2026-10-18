import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const colorsRef = useRef({ green: '', gold: '', border: '' });
  const isHoveredRef = useRef(false);

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

    const updateColors = () => {
      const computed = window.getComputedStyle(document.documentElement);
      colorsRef.current = {
        green: computed.getPropertyValue('--green').trim(),
        gold: computed.getPropertyValue('--gold').trim(),
        border: computed.getPropertyValue('--border').trim()
      };
      applyColors();
    };

    const applyColors = () => {
      const { green, gold, border } = colorsRef.current;
      if (dotRef.current && ringRef.current) {
        if (isHoveredRef.current) {
          dotRef.current.style.backgroundColor = gold;
          ringRef.current.style.borderColor = gold;
        } else {
          dotRef.current.style.backgroundColor = green;
          ringRef.current.style.borderColor = border || green;
        }
      }
    };

    updateColors();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          updateColors();
          break;
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

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
      const isInteractive = Boolean(
        target &&
          target.closest('a, button, input, textarea, select, .cursor-hover, [role="button"], [role="menuitemradio"]')
      );

      if (isInteractive !== isHoveredRef.current) {
        isHoveredRef.current = isInteractive;
        if (isInteractive) {
          document.body.classList.add('cursor-gold');
        } else {
          document.body.classList.remove('cursor-gold');
        }
        applyColors();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      if (rafId) cancelAnimationFrame(rafId);
      observer.disconnect();
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
