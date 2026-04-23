// Confetti Canvas - STRICT IMPLEMENTATION
import { useEffect, useRef } from 'react';
import './ConfettiCanvas.css';

const ConfettiCanvas = ({ active, onComplete }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confetti = [];
    const confettiCount = 100;
    const colors = ['#a855f7', '#06b6d4', '#fbbf24', '#ec4899', '#10b981'];

    class Confetto {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 4;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
      }

      isOffScreen() {
        return this.y > canvas.height;
      }
    }

    for (let i = 0; i < confettiCount; i++) {
      confetti.push(new Confetto());
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      confetti.forEach((c, index) => {
        c.update();
        c.draw();

        if (c.isOffScreen()) {
          confetti.splice(index, 1);
        }
      });

      if (confetti.length > 0) {
        animationId = requestAnimationFrame(animate);
      } else {
        if (onComplete) onComplete();
      }
    };

    animate();

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return <canvas ref={canvasRef} className="confetti-canvas" />;
};

export default ConfettiCanvas;
