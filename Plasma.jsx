import React from "react";
import "./Plasma.css";

export default function Plasma() {
  return (
    <div className="plasma-container">
      <svg>
        <filter id="plasma">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.01 0.04"
            numOctaves="3"
            seed="0"
          >
            <animate
              attributeName="baseFrequency"
              dur="10s"
              from="0.01 0.04"
              to="0.02 0.08"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="30" />
        </filter>
      </svg>
    </div>
  );
}