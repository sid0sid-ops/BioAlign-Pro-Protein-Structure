"use client";

import { motion } from "framer-motion";

const nodes = [
  { x: 6, y: 14 },
  { x: 18, y: 34 },
  { x: 34, y: 18 },
  { x: 52, y: 40 },
  { x: 70, y: 22 },
  { x: 88, y: 46 },
  { x: 24, y: 72 },
  { x: 48, y: 82 },
  { x: 78, y: 76 }
];

export function ScientificParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <svg className="h-full w-full opacity-45" role="presentation" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="particle-line" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.42" />
            <stop offset="52%" stopColor="#14b8a6" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.36" />
          </linearGradient>
        </defs>
        {nodes.slice(0, -1).map((node, index) => (
          <motion.line
            key={`${node.x}-${node.y}`}
            x1={node.x}
            y1={node.y}
            x2={nodes[index + 1].x}
            y2={nodes[index + 1].y}
            stroke="url(#particle-line)"
            strokeWidth="0.12"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0.2, 0.6, 0.25] }}
            transition={{ duration: 4.5, repeat: Infinity, delay: index * 0.2 }}
          />
        ))}
        {nodes.map((node, index) => (
          <motion.circle
            key={`${node.x}-${node.y}-circle`}
            cx={node.x}
            cy={node.y}
            r="0.55"
            fill={index % 3 === 0 ? "#14b8a6" : index % 3 === 1 ? "#3b82f6" : "#8b5cf6"}
            initial={{ opacity: 0.25, scale: 0.8 }}
            animate={{ opacity: [0.25, 0.8, 0.25], scale: [0.8, 1.35, 0.8] }}
            transition={{ duration: 3.8, repeat: Infinity, delay: index * 0.25 }}
          />
        ))}
      </svg>
    </div>
  );
}
