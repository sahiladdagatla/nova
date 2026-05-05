import React from 'react';

export const AmbientPulse: React.FC = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[10000] flex items-end gap-1 px-3 py-2 glass-panel border-cyan-500/30">
      <div className="flex items-end gap-1 h-4">
        {[2, 1, 3, 2, 1].map((delay, i) => (
          <div
            key={i}
            className="w-1 bg-cyan-400 rounded-full animate-bounce h-full"
            style={{ 
              animationDuration: `${0.6 + delay * 0.2}s`,
              height: `${20 + Math.random() * 80}%`
            }}
          />
        ))}
      </div>
      <span className="text-[10px] font-mono text-cyan-400/60 ml-2 uppercase tracking-widest">Ambient Link</span>
    </div>
  );
};
