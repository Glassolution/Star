"use client";

import { motion } from "framer-motion";

// Cross marker component
function CrossMarker({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 0.6, scale: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <line x1="5" y1="0" x2="5" y2="10" stroke="#FFD400" strokeWidth="1" />
        <line x1="0" y1="5" x2="10" y2="5" stroke="#FFD400" strokeWidth="1" />
      </svg>
    </motion.div>
  );
}

// Technical label component
function TechLabel({ 
  text, 
  position, 
  delay = 0 
}: { 
  text: string; 
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'left' | 'right';
  delay?: number;
}) {
  const positionStyles = {
    'top-left': { top: '5%', left: '3%' },
    'top-right': { top: '5%', right: '3%' },
    'bottom-left': { bottom: '15%', left: '3%' },
    'bottom-right': { bottom: '15%', right: '3%' },
    'left': { top: '50%', left: '2%', transform: 'translateY(-50%)' },
    'right': { top: '50%', right: '2%', transform: 'translateY(-50%)' },
  };

  return (
    <motion.div
      className="absolute pointer-events-none font-mono text-[9px] tracking-wider"
      style={{
        ...positionStyles[position],
        color: 'rgba(255, 208, 0, 0.25)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
    >
      {text}
    </motion.div>
  );
}

export function GridOverlay() {
  // Cross markers positioned at grid intersections near hero and CTA
  const heroCrosses = [
    // Around hero section (center-top area)
    { x: 20, y: 25, delay: 0.1 },
    { x: 30, y: 30, delay: 0.2 },
    { x: 70, y: 25, delay: 0.15 },
    { x: 80, y: 30, delay: 0.25 },
    { x: 25, y: 45, delay: 0.3 },
    { x: 75, y: 45, delay: 0.35 },
    { x: 15, y: 35, delay: 0.4 },
    { x: 85, y: 35, delay: 0.45 },
    // Near CTA section (bottom area)
    { x: 20, y: 80, delay: 0.5 },
    { x: 80, y: 80, delay: 0.55 },
    { x: 25, y: 85, delay: 0.6 },
    { x: 75, y: 85, delay: 0.65 },
    { x: 15, y: 75, delay: 0.7 },
    { x: 85, y: 75, delay: 0.75 },
    // Additional crosses for balance
    { x: 35, y: 20, delay: 0.8 },
    { x: 65, y: 20, delay: 0.85 },
    { x: 40, y: 88, delay: 0.9 },
    { x: 60, y: 88, delay: 0.95 },
  ];

  // Technical labels
  const labels = [
    { text: 'DEPLOY', position: 'top-left' as const, delay: 1.2 },
    { text: 'SECURE', position: 'top-right' as const, delay: 1.3 },
    { text: 'API', position: 'left' as const, delay: 1.4 },
    { text: 'FAST', position: 'right' as const, delay: 1.5 },
    { text: 'SCAN', position: 'bottom-left' as const, delay: 1.6 },
    { text: 'BUILD', position: 'bottom-right' as const, delay: 1.7 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Cross markers */}
      {heroCrosses.map((cross, index) => (
        <CrossMarker key={index} x={cross.x} y={cross.y} delay={cross.delay} />
      ))}
      
      {/* Technical labels */}
      {labels.map((label, index) => (
        <TechLabel key={index} text={label.text} position={label.position} delay={label.delay} />
      ))}
    </div>
  );
}
