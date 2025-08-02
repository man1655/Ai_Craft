import React, { useState, useEffect } from "react";

const AICraftLoader = ({ onLoadingComplete, duration = 2000 }) => {
  const [particles, setParticles] = useState([]);
  const [logoScale, setLogoScale] = useState(0);

  useEffect(() => {
    // Generate particles
    const particleArray = [];
    for (let i = 0; i < 80; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? 'cyan' : 'purple',
        opacity: Math.random() * 0.8 + 0.2,
      });
    }
    setParticles(particleArray);

    // Animate particles
    const particleInterval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
      })));
    }, 50);

    // Logo animation
    setTimeout(() => setLogoScale(1), 500);

    // Complete loading
    const completeTimer = setTimeout(() => {
      onLoadingComplete?.();
    }, duration);

    return () => {
      clearInterval(particleInterval);
      clearTimeout(completeTimer);
    };
  }, [onLoadingComplete, duration]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-purple-900 overflow-hidden">
      {/* Particle Field */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute rounded-full ${particle.color === 'cyan' ? 'bg-cyan-400' : 'bg-purple-400'}`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              boxShadow: `0 0 10px ${particle.color === 'cyan' ? '#06b6d4' : '#8b5cf6'}`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Animated Logo */}
        <div 
          className="mb-8 transition-all duration-1000"
          style={{ transform: `scale(${logoScale})` }}
        >
          <div className="relative w-32 h-32 mx-auto">
            {/* Rotating Rings */}
            <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-spin opacity-60"></div>
            <div className="absolute inset-4 border-4 border-purple-400 rounded-full animate-spin opacity-60" style={{animationDirection: 'reverse'}}></div>
            <div className="absolute inset-8 border-4 border-pink-400 rounded-full animate-spin opacity-60"></div>
            
            {/* Center */}
            <div className="absolute inset-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">AI</span>
            </div>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-5xl font-bold mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 animate-pulse">
            AI_Craft
          </span>
        </h1>

        {/* Loading Text */}
        <div className="text-gray-300 text-lg">
          <span>Generating Particle Field</span>
          <div className="inline-flex ml-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce mx-1" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AICraftLoader;