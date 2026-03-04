import React, { useEffect, useRef } from 'react';

export const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Standard Matrix character set (Katakana + Latin + Numbers)
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const characters = katakana + latin + nums;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    
    // Array to store the y-coordinate of the drop for each column
    const drops: number[] = new Array(columns).fill(1);
    
    const draw = () => {
      // Black with very high opacity to create faint trails, 
      // but "half way into the matrix" might imply we see the background content clearly.
      // We use a lower opacity fillRect to let trails persist slightly longer or shorter.
      ctx.fillStyle = 'rgba(5, 5, 5, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Randomly skip columns to create less density
        if (Math.random() > 0.98) continue;

        // Pick a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Matrix Color Logic
        // Primarily dark green/blue-ish (since our theme is blue accent)
        // Let's stick to the blue accent theme to match the site, but make it look digital.
        
        const isHead = Math.random() > 0.95; // The bright leading character
        
        if (isHead) {
           ctx.fillStyle = '#93c5fd'; // Light Blue (Tailwind blue-300)
           ctx.shadowBlur = 8;
           ctx.shadowColor = '#3b82f6';
        } else {
           // Darker blue/grey for the trail
           // vary opacity for depth
           const opacity = Math.random() * 0.5 + 0.1;
           ctx.fillStyle = `rgba(59, 130, 246, ${opacity})`; // Blue-500 with opacity
           ctx.shadowBlur = 0;
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly or if it passes height
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment y coordinate
        drops[i]++;
      }
    };

    let animationId: number;
    const interval = setInterval(draw, 40); // Slightly slower for more "cinematic" feel

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-30" 
      // opacity-30 blends it "half way" so it's not distracting
    />
  );
};