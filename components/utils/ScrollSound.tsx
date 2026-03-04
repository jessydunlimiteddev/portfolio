import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const ScrollSound: React.FC = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastScrollY = useRef(0);
  const isMuted = useRef(false);
  const [mutedState, setMutedState] = useState(false);
  const [initialized, setInitialized] = useState(false);

  // Initialize Audio Context on first user interaction
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      setInitialized(true);
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playMatrixSound = (speed: number) => {
    if (isMuted.current || !audioContextRef.current) return;

    const ctx = audioContextRef.current;
    
    // Matrix Data Sound Synthesis
    // We use FM Synthesis to create a "digital glitch" or "data packet" sound.
    
    const t = ctx.currentTime;
    
    // 1. Carrier Oscillator (The main tone)
    const carrier = ctx.createOscillator();
    const carrierGain = ctx.createGain();
    
    // 2. Modulator Oscillator (Modulates the carrier to make it sound robotic/digital)
    const modulator = ctx.createOscillator();
    const modulatorGain = ctx.createGain();

    // Configuration
    // High pitch random frequency for "data" feel
    const fundamental = 800 + Math.random() * 800; 
    
    carrier.type = 'sine';
    carrier.frequency.setValueAtTime(fundamental, t);

    modulator.type = 'square'; // Square wave modulation adds digital harmonics
    modulator.frequency.setValueAtTime(Math.random() * 50 + 20, t); // Low freq modulation (20-70Hz)

    // Modulation Depth
    const modulationIndex = 200; 
    modulatorGain.gain.setValueAtTime(modulationIndex, t);

    // Wiring: Modulator -> ModulatorGain -> Carrier.frequency
    modulator.connect(modulatorGain);
    modulatorGain.connect(carrier.frequency);

    // Envelope (Short and snappy)
    carrierGain.gain.setValueAtTime(0, t);
    carrierGain.gain.linearRampToValueAtTime(0.03, t + 0.005); // Attack (very fast)
    carrierGain.gain.exponentialRampToValueAtTime(0.001, t + 0.08); // Decay (short)

    // Output
    carrier.connect(carrierGain);
    
    // Add a Highpass filter to remove mud, keeping it "crisp"
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    
    carrierGain.connect(filter);
    filter.connect(ctx.destination);

    // Start/Stop
    carrier.start(t);
    modulator.start(t);
    carrier.stop(t + 0.1);
    modulator.stop(t + 0.1);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);

      // Only play sound if scroll distance is significant
      if (delta > 5) { 
        if (!audioContextRef.current) initAudio();
        
        // Trigger sound more frequently for "stream of data" feel
        // But limit slightly to avoid audio engine overload if scrolling super fast
        if (Math.random() > 0.3) {
          playMatrixSound(delta);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', initAudio);
    window.addEventListener('keydown', initAudio);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', initAudio);
      window.removeEventListener('keydown', initAudio);
    };
  }, []);

  const toggleMute = () => {
    isMuted.current = !isMuted.current;
    setMutedState(isMuted.current);
  };

  if (!initialized) return null;

  return (
    <button 
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-surface border border-border text-secondary hover:text-accent hover:border-accent transition-all duration-300 opacity-50 hover:opacity-100"
      title={mutedState ? "Unmute Sound" : "Mute Sound"}
    >
      {mutedState ? <VolumeX size={20} /> : <Volume2 size={20} />}
    </button>
  );
};