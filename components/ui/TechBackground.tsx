import React, { useEffect, useRef, useState } from 'react';

export const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hexStrings, setHexStrings] = useState<string[]>([]);

  useEffect(() => {
    setHexStrings(Array.from({ length: 12 }, () => 
      Math.random().toString(16).substr(2, 6).toUpperCase()
    ));
    
    const interval = setInterval(() => {
        setHexStrings(prev => {
            const newArr = [...prev];
            const idx = Math.floor(Math.random() * newArr.length);
            newArr[idx] = Math.random().toString(16).substr(2, 6).toUpperCase();
            return newArr;
        });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    // 3D Animation Configuration
    const fov = 350;
    const starCount = 150; 
    const stars = Array.from({ length: starCount }).map(() => ({
      x: (Math.random() - 0.5) * 4000,
      y: (Math.random() - 0.5) * 2000 - 500, // Bias upwards slightly
      z: Math.random() * 3000,
      size: Math.random() * 2,
      color: Math.random() > 0.5 ? '#00f3ff' : '#bc13fe'
    }));

    const draw = () => {
      // Clear background
      ctx.fillStyle = '#030008';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const time = Date.now();

      // --- 1. Neon Grid ---
      ctx.lineWidth = 1;
      
      const moveOffset = (time / 15) % 100; // Speed of grid movement
      
      // We'll draw the floor grid
      const horizonY = cy;

      // Vertical Lines (Perpendicular to horizon) - Magenta/Purple
      ctx.strokeStyle = 'rgba(188, 19, 254, 0.3)';
      for (let i = -20; i <= 20; i += 1) {
        if (i === 0 && Math.abs(width) < 500) continue; // skip center on small screens
        const xOffset = i * 150;
        
        ctx.beginPath();
        // Start from horizon, radiate out
        ctx.moveTo(cx, horizonY); 
        ctx.lineTo(cx + xOffset * 10, height * 2); // Extend past bottom
        ctx.stroke();
      }

      // Horizontal Lines (Parallel to horizon) - Cyan
      for (let i = 0; i < 20; i++) {
        // Exponential depth
        const z = 100 + (i * 100) - moveOffset;
        if (z < 1) continue;

        const perspectiveY = 8000 / z; 
        const floorY = horizonY + perspectiveY;
        
        if (floorY < height) {
            // Fade out as it gets closer to horizon
            const alpha = Math.min(0.6, (floorY - horizonY) / (height/2));
            
            ctx.shadowBlur = 5;
            ctx.shadowColor = '#00f3ff';
            ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
            
            ctx.beginPath();
            ctx.moveTo(0, floorY);
            ctx.lineTo(width, floorY);
            ctx.stroke();
            ctx.shadowBlur = 0; // Reset
        }
      }

      // --- 2. Horizon Glow ---
      const gradient = ctx.createLinearGradient(0, horizonY - 50, 0, horizonY + 50);
      gradient.addColorStop(0, 'rgba(188, 19, 254, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 243, 255, 0.3)');
      gradient.addColorStop(1, 'rgba(188, 19, 254, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, horizonY - 50, width, 100);


      // --- 3. Starfield / Data Particles ---
      stars.forEach(star => {
        star.z -= 8; // Faster speed
        if (star.z <= 0) {
            star.z = 3000;
            star.x = (Math.random() - 0.5) * 4000;
            star.y = (Math.random() - 0.5) * 2000;
        }
        
        const scale = fov / (fov + star.z);
        const x2d = star.x * scale + cx;
        const y2d = star.y * scale + cy;
        
        if (x2d > 0 && x2d < width && y2d > 0 && y2d < height) {
            const alpha = Math.min(1, (3000 - star.z) / 1000);
            ctx.fillStyle = star.color;
            ctx.globalAlpha = alpha;
            const size = Math.max(0.5, star.size * scale * 3);
            ctx.beginPath();
            ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalAlpha = 1.0;
        }
      });

      // --- 4. Vignette & Fade ---
      const radGrad = ctx.createRadialGradient(cx, cy, height/3, cx, cy, height);
      radGrad.addColorStop(0, 'transparent');
      radGrad.addColorStop(1, '#030008'); // Fade edges to background color
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-[#030008] overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      
      {/* --- CSS Animations --- */}
      <style>{`
        @keyframes scan {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 110%; opacity: 0; }
        }
        .hud-scanline {
          animation: scan 4s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        }
        @keyframes rotate-hud {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-rotate-hud {
          animation: rotate-hud 15s linear infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px #00f3ff, inset 0 0 5px #00f3ff; }
          50% { box-shadow: 0 0 20px #00f3ff, inset 0 0 10px #00f3ff; }
        }
        .animate-pulse-glow {
          animation: pulse-glow 3s infinite;
        }
      `}</style>
      
      {/* --- HUD OVERLAYS --- */}
      
      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(rgba(0, 243, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 243, 255, 0.3) 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start z-0">
         <div className="flex flex-col gap-1">
             <div className="flex gap-4 text-[10px] md:text-xs font-mono text-accent tracking-[0.2em] text-glow">
                <span className="animate-pulse text-neon-red">● REC</span>
                <span className="hidden md:inline">SYS.NEON.v9</span>
                <span>ID: 8492-NEON</span>
             </div>
             <div className="h-[2px] w-48 bg-gradient-to-r from-accent to-transparent mt-1 shadow-[0_0_10px_#00f3ff]"></div>
         </div>
      </div>

      {/* Left Data Column - Neon Hex */}
      <div className="absolute left-6 top-1/3 bottom-1/3 hidden md:flex flex-col justify-center gap-1 w-32">
         {hexStrings.slice(0, 10).map((val, i) => (
             <div key={i} className="text-[10px] font-mono text-accent/60 whitespace-nowrap overflow-hidden transition-all duration-300">
                 <span className="text-neon-purple opacity-70">0x{i.toString().padStart(2, '0')}:</span> 
                 <span className="text-glow ml-2">{val}</span>
             </div>
         ))}
      </div>

      {/* Right Circular HUD */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center justify-center opacity-80">
          <div className="w-40 h-40 rounded-full border border-accent/30 border-dashed animate-rotate-hud flex items-center justify-center box-glow">
              <div className="w-32 h-32 rounded-full border border-neon-purple/50 flex items-center justify-center">
                <div className="w-full h-[1px] bg-accent/30 animate-pulse"></div>
                <div className="absolute h-full w-[1px] bg-accent/30 animate-pulse"></div>
              </div>
          </div>
      </div>

      {/* Moving Scanline Beam */}
      <div className="absolute top-0 left-0 w-full h-[5vh] bg-gradient-to-b from-transparent via-accent/20 to-transparent hud-scanline pointer-events-none z-10"></div>
    </div>
  );
};