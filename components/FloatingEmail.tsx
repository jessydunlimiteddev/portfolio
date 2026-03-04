import React from 'react';

export const FloatingEmail: React.FC = () => {
  return (
    <div className="fixed bottom-0 right-12 hidden lg:flex flex-col items-center gap-6 text-secondary z-40">
      <span 
        className="font-mono text-sm text-accent tracking-widest writing-vertical-rl"
        style={{ writingMode: 'vertical-rl' }}
      >
        SYSTEM_INITIALIZED
      </span>
      <div className="w-[1px] h-24 bg-secondary mt-2"></div>
    </div>
  );
};