import { useEffect, useRef } from 'react';

export const AuroraBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width, height;
    let animationId;
    let time = 0;
    let mouse = { x: -1000, y: -1000 };

    function resize() {
      width = window.innerWidth;
      height = document.documentElement.scrollHeight;
      canvas.width = width;
      canvas.height = height;
    }
    resize();

    // ====== STARFIELD — 350 stars ======
    const stars = [];
    for (let i = 0; i < 350; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.3,
        baseOpacity: Math.random() * 0.8 + 0.2,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        twinkleOffset: Math.random() * Math.PI * 2,
      });
    }

    function drawStars() {
      stars.forEach((star) => {
        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        const opacity = star.baseOpacity * (0.4 + twinkle * 0.6);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Bright star glow
        if (star.radius > 1.3) {
          const glowSize = star.radius * 5;
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, glowSize);
          const isCyan = Math.random() > 0.5;
          glow.addColorStop(0, `rgba(${isCyan ? '0, 229, 255' : '180, 130, 255'}, ${opacity * 0.5})`);
          glow.addColorStop(0.5, `rgba(${isCyan ? '0, 229, 255' : '180, 130, 255'}, ${opacity * 0.15})`);
          glow.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(star.x, star.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      });
    }

    // ====== NEBULA CLOUDS — Large flowing gradient blobs ======
    class NebulaCloud {
      constructor(x, y, radius, color, speed, drift) {
        this.baseX = x;
        this.baseY = y;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.drift = drift;
        this.offset = Math.random() * Math.PI * 2;
      }

      draw(t) {
        const x = this.baseX + Math.sin(t * this.speed * 0.3 + this.offset) * this.drift;
        const y = this.baseY + Math.cos(t * this.speed * 0.2 + this.offset) * this.drift * 0.6;
        const pulse = 1 + Math.sin(t * this.speed * 0.5 + this.offset) * 0.15;
        const r = this.radius * pulse;

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, r);
        gradient.addColorStop(0, this.color.replace('OPACITY', '0.18'));
        gradient.addColorStop(0.3, this.color.replace('OPACITY', '0.10'));
        gradient.addColorStop(0.6, this.color.replace('OPACITY', '0.04'));
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    const nebulaClouds = [
      // Hero area — big dramatic blobs
      new NebulaCloud(width * 0.2, height * 0.05, 500, 'rgba(0, 229, 255, OPACITY)', 0.008, 80),
      new NebulaCloud(width * 0.8, height * 0.08, 450, 'rgba(138, 43, 226, OPACITY)', 0.006, 100),
      new NebulaCloud(width * 0.5, height * 0.12, 350, 'rgba(80, 50, 255, OPACITY)', 0.009, 60),
      
      // About area
      new NebulaCloud(width * 0.15, height * 0.22, 400, 'rgba(138, 43, 226, OPACITY)', 0.007, 70),
      new NebulaCloud(width * 0.85, height * 0.25, 350, 'rgba(0, 229, 255, OPACITY)', 0.005, 90),

      // Skills area
      new NebulaCloud(width * 0.5, height * 0.35, 500, 'rgba(0, 150, 255, OPACITY)', 0.006, 80),
      new NebulaCloud(width * 0.1, height * 0.38, 300, 'rgba(138, 43, 226, OPACITY)', 0.008, 50),

      // Projects area
      new NebulaCloud(width * 0.7, height * 0.48, 450, 'rgba(0, 229, 255, OPACITY)', 0.007, 90),
      new NebulaCloud(width * 0.3, height * 0.52, 400, 'rgba(138, 43, 226, OPACITY)', 0.005, 70),

      // Journey area
      new NebulaCloud(width * 0.5, height * 0.65, 500, 'rgba(80, 50, 255, OPACITY)', 0.006, 80),
      new NebulaCloud(width * 0.2, height * 0.7, 350, 'rgba(0, 229, 255, OPACITY)', 0.008, 60),

      // Contact area
      new NebulaCloud(width * 0.8, height * 0.82, 400, 'rgba(138, 43, 226, OPACITY)', 0.007, 70),
      new NebulaCloud(width * 0.4, height * 0.9, 500, 'rgba(0, 229, 255, OPACITY)', 0.005, 100),
    ];

    // ====== AURORA WAVES — More visible ======
    class AuroraWave {
      constructor(baseY, color1, color2, amplitude, frequency, speed, opacityBase) {
        this.baseY = baseY;
        this.color1 = color1;
        this.color2 = color2;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.speed = speed;
        this.opacityBase = opacityBase;
        this.offset = Math.random() * Math.PI * 2;
      }

      draw(t) {
        ctx.save();
        ctx.beginPath();

        const points = [];
        for (let x = -10; x <= width + 10; x += 3) {
          const y = this.baseY
            + Math.sin(x * this.frequency + t * this.speed + this.offset) * this.amplitude
            + Math.sin(x * this.frequency * 0.5 + t * this.speed * 0.7 + 1) * this.amplitude * 0.6
            + Math.cos(x * this.frequency * 0.3 + t * this.speed * 0.4 + 2) * this.amplitude * 0.35;
          points.push({ x, y });
        }

        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) {
          ctx.lineTo(points[i].x, points[i].y);
        }

        ctx.lineTo(width + 10, this.baseY + this.amplitude * 5);
        ctx.lineTo(-10, this.baseY + this.amplitude * 5);
        ctx.closePath();

        const gradient = ctx.createLinearGradient(0, this.baseY - this.amplitude * 1.5, 0, this.baseY + this.amplitude * 4);
        gradient.addColorStop(0, this.color1);
        gradient.addColorStop(0.4, this.color2);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.globalAlpha = this.opacityBase + Math.sin(t * 0.2 + this.offset) * 0.04;
        ctx.fill();
        ctx.restore();
      }
    }

    const auroraWaves = [
      // Hero — intense
      new AuroraWave(height * 0.06, 'rgba(0, 229, 255, 0.15)', 'rgba(138, 43, 226, 0.06)', 80, 0.003, 0.5, 0.12),
      new AuroraWave(height * 0.10, 'rgba(138, 43, 226, 0.12)', 'rgba(0, 229, 255, 0.05)', 100, 0.002, 0.35, 0.10),
      new AuroraWave(height * 0.04, 'rgba(0, 180, 255, 0.10)', 'rgba(100, 50, 255, 0.04)', 50, 0.004, 0.6, 0.08),

      // About/Skills
      new AuroraWave(height * 0.28, 'rgba(138, 43, 226, 0.10)', 'rgba(0, 229, 255, 0.04)', 90, 0.0025, 0.4, 0.08),
      new AuroraWave(height * 0.33, 'rgba(0, 229, 255, 0.08)', 'rgba(138, 43, 226, 0.03)', 60, 0.003, 0.5, 0.07),

      // Projects
      new AuroraWave(height * 0.50, 'rgba(0, 229, 255, 0.12)', 'rgba(138, 43, 226, 0.05)', 85, 0.002, 0.35, 0.09),
      new AuroraWave(height * 0.54, 'rgba(80, 50, 255, 0.08)', 'rgba(0, 229, 255, 0.03)', 55, 0.0035, 0.45, 0.06),

      // Journey/Education
      new AuroraWave(height * 0.70, 'rgba(138, 43, 226, 0.10)', 'rgba(0, 229, 255, 0.04)', 75, 0.003, 0.4, 0.08),

      // Contact/Bottom
      new AuroraWave(height * 0.85, 'rgba(0, 229, 255, 0.10)', 'rgba(138, 43, 226, 0.04)', 65, 0.0025, 0.5, 0.08),
    ];

    // ====== SHOOTING STARS — More frequent ======
    class ShootingStar {
      constructor() { this.reset(); }

      reset() {
        this.x = Math.random() * width * 1.5;
        this.y = Math.random() * height * 0.3;
        this.length = Math.random() * 150 + 80;
        this.speed = Math.random() * 8 + 5;
        this.angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.active = false;
        this.timer = Math.random() * 400 + 100;
      }

      update() {
        if (!this.active) {
          this.timer--;
          if (this.timer <= 0) this.active = true;
          return;
        }
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        if (this.x > width + 200 || this.y > height + 200) this.reset();
      }

      draw() {
        if (!this.active) return;
        const tailX = this.x - Math.cos(this.angle) * this.length;
        const tailY = this.y - Math.sin(this.angle) * this.length;

        const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        gradient.addColorStop(0.2, `rgba(0, 229, 255, ${this.opacity * 0.6})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bright head
        const headGlow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 6);
        headGlow.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
        headGlow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = headGlow;
        ctx.fill();
      }
    }

    const shootingStars = Array.from({ length: 5 }, () => new ShootingStar());

    // ====== MOUSE GLOW ======
    function drawMouseGlow() {
      if (mouse.x < 0) return;
      const scrollY = window.scrollY;
      const canvasMouseY = mouse.y + scrollY;
      
      const glow = ctx.createRadialGradient(mouse.x, canvasMouseY, 0, mouse.x, canvasMouseY, 300);
      glow.addColorStop(0, 'rgba(0, 229, 255, 0.04)');
      glow.addColorStop(0.5, 'rgba(138, 43, 226, 0.02)');
      glow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(mouse.x, canvasMouseY, 300, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
    }

    // ====== MAIN LOOP ======
    function animate() {
      ctx.clearRect(0, 0, width, height);
      time++;

      drawStars();
      
      nebulaClouds.forEach((cloud) => cloud.draw(time));
      auroraWaves.forEach((wave) => wave.draw(time));
      drawMouseGlow();

      shootingStars.forEach((star) => {
        star.update();
        star.draw();
      });

      animationId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        stars.forEach((s) => {
          s.x = Math.random() * width;
          s.y = Math.random() * height;
        });
      }, 200);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    const heightCheck = setInterval(() => {
      const newHeight = document.documentElement.scrollHeight;
      if (Math.abs(newHeight - height) > 100) resize();
    }, 2000);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      clearInterval(heightCheck);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};
