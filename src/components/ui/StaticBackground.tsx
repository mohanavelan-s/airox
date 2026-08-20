import React from 'react';

export const StaticBackground: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="global-background fixed inset-0 z-0 pointer-events-none select-none overflow-hidden"
      style={{
        backgroundImage: `url('/assets/airox-global-background.svg'), url('/images/a_high_resolution_futuristic_tech_themed_abstract.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        willChange: 'transform',
      }}
    >
      {/* Subtle Central Radial Shield for Text Readability without hiding the background */}
      <div className="absolute inset-0 bg-radial from-transparent via-black/10 to-black/25 pointer-events-none" />
    </div>
  );
};


