import React, { useEffect, useRef } from 'react';

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width: number, height: number;
    let nodes: { x: number; y: number; vx: number; vy: number; phase: number }[] = [];
    let gridOffset = 0;
    const nodeCount = 80;
    const connectionDistance = 150;

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.6 * 0.5 + (Math.random() > 0.5 ? 0.3 : -0.3),
          vy: (Math.random() - 0.5) * 1.6 * 0.5 + (Math.random() > 0.5 ? 0.3 : -0.3),
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Layer 3: Vertical scrolling dot grid
      ctx.fillStyle = 'rgba(6, 182, 212, 0.05)';
      const gridSize = 30;
      gridOffset = (gridOffset + 0.5) % gridSize;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = -gridSize; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y + gridOffset, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Layer 1: Neural Network
      const time = Date.now() * 0.002;
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const pulse = 3 + Math.sin(time + node.phase);
        ctx.fillStyle = '#7C3AED';
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulse, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Layer 2: Scanline effect
      ctx.fillStyle = 'rgba(0, 255, 255, 0.015)';
      for (let i = 0; i < height; i += 4) {
        ctx.fillRect(0, i, width, 1);
      }

      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', init);
    init();
    const animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
    />
  );
};
