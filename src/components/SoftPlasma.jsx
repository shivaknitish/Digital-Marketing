import React from 'react';
import './SoftPlasma.css';

const SoftPlasma = () => {
  console.log('SoftPlasma component is rendering');
  
  return (
    <div className="soft-plasma-container">
      <div className="plasma-wave wave-1"></div>
      <div className="plasma-wave wave-2"></div>
      <div className="plasma-wave wave-3"></div>
      <div className="plasma-glow"></div>
    </div>
  );
};

export default SoftPlasma;
