import React, { useEffect, useRef } from 'react';

export const BackgroundCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic 3D depth particle constellation
    const count = Math.min(Math.floor((width * height) / 18000), 70);
    const particles = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height * 2, // extend beyond viewport for scroll
        z: Math.random() * 2 + 0.5,   // depth layer for parallax (0.5 to 2.5)
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        baseRadius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.4 + 0.1,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 3;
    let currentScroll = window.scrollY;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleScroll = () => {
      currentScroll = window.scrollY;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.005;

      // 1. Dynamic Parallax Cyber Grid
      const scrollOffset = (currentScroll * 0.4) % 60;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.022)';
      ctx.lineWidth = 1;
      const gridSize = 60;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -scrollOffset; y < height; y += gridSize) {
        if (y < 0) continue;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Interactive Ambient Light Beam (Follows mouse + parallax)
      const lightGrad = ctx.createRadialGradient(
        mouseX,
        mouseY,
        10,
        mouseX,
        mouseY,
        Math.max(width * 0.45, 350)
      );
      lightGrad.addColorStop(0, 'rgba(255, 255, 255, 0.06)');
      lightGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.015)');
      lightGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Floating 3D Depth Constellation Nodes with Scroll Parallax
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height * 2;
        if (p.y > height * 2) p.y = 0;

        // Calculate screen Y based on individual Z-depth parallax factor
        const screenY = (p.y - currentScroll * (p.z * 0.35)) % (height + 100);
        const actualY = screenY < -50 ? screenY + height + 100 : screenY;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, actualY, p.baseRadius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * (p.z / 2)})`;
        ctx.fill();

        // Connect nearby nodes within the same depth layer
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const screenY2 = (p2.y - currentScroll * (p2.z * 0.35)) % (height + 100);
          const actualY2 = screenY2 < -50 ? screenY2 + height + 100 : screenY2;

          const dist = Math.hypot(p.x - p2.x, actualY - actualY2);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, actualY);
            ctx.lineTo(p2.x, actualY2);
            const lineAlpha = (1 - dist / 110) * 0.12 * Math.min(p.z, p2.z);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90 transition-opacity duration-700"
      style={{ willChange: 'transform' }}
    />
  );
};

export default BackgroundCanvas;
