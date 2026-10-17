import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
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

    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.4,
      col: Math.random() > 0.4 ? 'rgba(0,230,118,' : 'rgba(245,197,24,',
      a: Math.random() * 0.35 + 0.08
    }));

    const anim = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + p.a + ')';
        ctx.fill();
      });
      animId = requestAnimationFrame(anim);
    };

    animId = requestAnimationFrame(anim);

    return () => {
      window.removeEventListener('resize', rsz);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} id="pcanvas" aria-hidden="true" />;
};

export default ParticleBackground;
