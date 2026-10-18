import React, { useEffect, useRef } from 'react';

const parseColorToRgb = (colorStr) => {
  if (!colorStr) return [0, 230, 118];
  const s = colorStr.trim();
  if (s.startsWith('#')) {
    const hex = s.slice(1);
    if (hex.length === 3) {
      return [
        parseInt(hex[0] + hex[0], 16),
        parseInt(hex[1] + hex[1], 16),
        parseInt(hex[2] + hex[2], 16)
      ];
    }
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16)
    ];
  }
  const match = s.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (match) {
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
  }
  return [0, 230, 118];
};

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W, H;
    let animId;

    const rsz = () => {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    };
    rsz();
    window.addEventListener('resize', rsz);

    const colorsRef = {
      primary: [0, 230, 118],
      secondary: [245, 197, 24]
    };

    const updateColors = () => {
      const computed = window.getComputedStyle(document.documentElement);
      const greenVal = computed.getPropertyValue('--green');
      const goldVal = computed.getPropertyValue('--gold');
      if (greenVal) colorsRef.primary = parseColorToRgb(greenVal);
      if (goldVal) colorsRef.secondary = parseColorToRgb(goldVal);
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

    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
      isPrimary: Math.random() > 0.5,
      a: Math.random() * 0.35 + 0.08
    }));

    const anim = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const [r, g, b] = p.isPrimary ? colorsRef.primary : colorsRef.secondary;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${p.a})`;
        ctx.fill();
      });
      animId = requestAnimationFrame(anim);
    };

    animId = requestAnimationFrame(anim);

    return () => {
      window.removeEventListener('resize', rsz);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} id="pcanvas" aria-hidden="true" />;
};

export default ParticleBackground;
