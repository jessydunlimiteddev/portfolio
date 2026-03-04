import React, { useEffect, useRef } from 'react';

export const HeroGraphic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;
      
      // Handle DPI for crisp rendering on high-res screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      
      // Scale context to match DPI
      ctx.scale(dpr, dpr);
      
      // Set CSS size
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    // ----------------------------
    // 3D Model Data (Icosahedron)
    // ----------------------------
    const t = (1.0 + Math.sqrt(5.0)) / 2.0;
    
    // Base Vertices
    const baseVertices = [
      [-1, t, 0], [1, t, 0], [-1, -t, 0], [1, -t, 0],
      [0, -1, t], [0, 1, t], [0, -1, -t], [0, 1, -t],
      [t, 0, -1], [t, 0, 1], [-t, 0, -1], [-t, 0, 1]
    ];

    // Connectivity
    const edges = [
        [0, 11], [0, 5], [0, 1], [0, 7], [0, 10], [1, 5], [1, 9], [1, 8], [1, 7],
        [2, 11], [2, 10], [2, 6], [2, 3], [2, 4], [3, 9], [3, 4], [3, 8], [3, 6],
        [4, 9], [4, 5], [4, 11], [5, 9], [6, 7], [6, 8], [6, 10], [7, 8], [8, 9], [10, 11]
    ];

    // Animation State
    let angleX = 0;
    let angleY = 0;
    let animationFrameId: number;

    // Reuse projection array to avoid Garbage Collection spikes per frame
    const projected = new Array(baseVertices.length).fill(null).map(() => ({ x: 0, y: 0, z: 0 }));

    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update Rotation
      angleX += 0.002;
      angleY += 0.003;

      // Layout calculations
      const isMobile = width < 768;
      const cx = width * (isMobile ? 0.5 : 0.75);
      const cy = height * 0.5;
      const baseSize = Math.min(width, height) * (isMobile ? 0.35 : 0.25);

      // Pre-calculate rotation trigonometry
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);

      // 1. Project Vertices
      // ------------------
      for (let i = 0; i < baseVertices.length; i++) {
        const v = baseVertices[i];
        const x = v[0];
        const y = v[1];
        const z = v[2];

        // Rotate around Y axis
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;

        // Rotate around X axis
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;

        // Perspective Projection
        // Standard formula: x' = x / (1 - z/d)
        // Adjusted constant for visual effect
        const scale = 4 / (4 - z2 * 0.2); 
        
        projected[i].x = cx + x1 * baseSize * scale;
        projected[i].y = cy + y2 * baseSize * scale;
        projected[i].z = z2;
      }

      // 2. Draw Edges
      // -------------
      // Use 'lighter' blend mode for neon effect overlapping
      ctx.globalCompositeOperation = 'lighter'; 

      // Pass 1: Glow (Thick, Low Opacity)
      // Batch all lines into one path for performance (avoids multiple draw calls)
      ctx.beginPath();
      for (let i = 0; i < edges.length; i++) {
         const e = edges[i];
         const p1 = projected[e[0]];
         const p2 = projected[e[1]];
         // Simple near-plane culling to prevent glitching when points are too close to camera
         if (p1.z > -5 && p2.z > -5) {
             ctx.moveTo(p1.x, p1.y);
             ctx.lineTo(p2.x, p2.y);
         }
      }
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)'; // Fixed cyan glow
      ctx.stroke();

      // Pass 2: Core (Thin, Variable Opacity based on depth)
      // Cannot batch efficiently because opacity changes per line based on depth
      ctx.lineWidth = 1.5;
      for (let i = 0; i < edges.length; i++) {
         const e = edges[i];
         const p1 = projected[e[0]];
         const p2 = projected[e[1]];
         
         const zAvg = (p1.z + p2.z) / 2;
         // Map depth Z (approx -2 to 2) to Alpha
         let alpha = 0.3 + (zAvg + 2) * 0.15;
         alpha = Math.max(0.1, Math.min(1, alpha)); // Clamp 0.1 - 1.0

         ctx.beginPath();
         ctx.moveTo(p1.x, p1.y);
         ctx.lineTo(p2.x, p2.y);
         // Use template literal for performant color definition
         ctx.strokeStyle = `rgba(0, 243, 255, ${alpha})`;
         ctx.stroke();
      }

      // 3. Draw Nodes (Vertices)
      // ------------------------
      for (let i = 0; i < projected.length; i++) {
         const p = projected[i];
         // Only draw nodes that are somewhat in front
         if (p.z > -1.5) {
             const alpha = Math.max(0.2, 0.5 + p.z * 0.2);
             ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
             ctx.beginPath();
             ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
             ctx.fill();
         }
      }
      
      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over'; 
      
      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <canvas ref={canvasRef} className="opacity-70" />
    </div>
  );
};