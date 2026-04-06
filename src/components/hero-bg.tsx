'use client';

import { useEffect, useRef } from 'react';

export default function HeroBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;
      baseAlpha: number;
      orbitCenterX: number;
      orbitCenterY: number;
      orbitRadius: number;
      orbitSpeed: number;
      angle: number;

      constructor(w: number, h: number) {
        // Distribute orbit centers across the canvas
        this.orbitCenterX = Math.random() * w;
        this.orbitCenterY = Math.random() * h;
        this.orbitRadius = 20 + Math.random() * 80;
        this.orbitSpeed = (0.001 + Math.random() * 0.003) * (Math.random() > 0.5 ? 1 : -1);
        this.angle = Math.random() * Math.PI * 2;
        this.x = this.orbitCenterX + Math.cos(this.angle) * this.orbitRadius;
        this.y = this.orbitCenterY + Math.sin(this.angle) * this.orbitRadius;
        this.vx = 0;
        this.vy = 0;
        this.radius = 0.8 + Math.random() * 1.2;
        this.baseAlpha = 0.1 + Math.random() * 0.3;
        this.alpha = this.baseAlpha;
      }

      update(w: number, h: number, mx: number, my: number) {
        this.angle += this.orbitSpeed;

        const targetX = this.orbitCenterX + Math.cos(this.angle) * this.orbitRadius;
        const targetY = this.orbitCenterY + Math.sin(this.angle) * this.orbitRadius;

        // Mouse interaction — gentle attraction nearby, subtle glow
        const dx = this.x - mx;
        const dy = this.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.vx += dx * force * 0.003;
          this.vy += dy * force * 0.003;
          this.alpha = this.baseAlpha + force * 0.3;
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.05;
        }

        this.vx += (targetX - this.x) * 0.008;
        this.vy += (targetY - this.y) * 0.008;
        this.vx *= 0.95;
        this.vy *= 0.95;
        this.x += this.vx;
        this.y += this.vy;
      }
    }

    const getColor = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (isDark) {
        // Warm gold, visible on dark bg
        return { r: 196, g: 169, b: 130, boost: 1 };
      } else {
        // Darker tone for light bg
        return { r: 120, g: 100, b: 70, boost: 2.5 };
      }
    };

    const init = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const count = Math.min(100, Math.floor(w * 0.06));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h));
      }
    };

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      ctx.clearRect(0, 0, w, h);
      const col = getColor();

      for (const p of particles) {
        p.update(w, h, mouse.x, mouse.y);
      }

      // Lines
      const maxDist = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const a = (1 - dist / maxDist) * 0.08 * col.boost;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${col.r},${col.g},${col.b},${a})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col.r},${col.g},${col.b},${p.alpha * col.boost})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -1000; mouse.y = -1000; };

    resize();
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    canvas.addEventListener('mousemove', onMouse);
    canvas.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('mousemove', onMouse);
      canvas.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 z-0 h-full w-full"
    />
  );
}
