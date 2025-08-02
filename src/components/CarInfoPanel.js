// frontend/src/components/CarInfoPanel.js

import React from 'react';

const panelStyle = {
  padding: '20px',
  background: 'rgba(20, 20, 20, 0.8)',
  borderRadius: '8px',
  border: '1px solid #444',
  height: '100%',
};

const Stat = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #333' }}>
    <span style={{ color: '#aaa' }}>{label}</span>
    <strong>{value}</strong>
  </div>
);

function CarInfoPanel({ carData, isLoading, error }) {
  if (isLoading) {
    return <div style={panelStyle}><h3>Loading Specifications...</h3></div>;
  }

  if (error) {
    return (
        <div style={panelStyle}>
            <h3>Error</h3>
            <p style={{ color: '#ff6b6b' }}>{error}</p>
        </div>
    );
  }

  if (!carData) {
    return <div style={panelStyle}><h3>Car Specifications</h3><p style={{ color: '#aaa' }}>Select a car to see its details.</p></div>;
  }

  return (
    <div style={panelStyle}>
      <h3 style={{ borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '15px' }}>
        {carData.make} {carData.model}
      </h3>
      <Stat label="Year" value={carData.year} />
      {/* FINAL FIX: Using 'displacement' to show the engine size */}
      <Stat label="Engine" value={carData.displacement ? `${carData.displacement}L` : 'N/A'} />
      <Stat label="Horsepower" value={carData.horsepower ? `${carData.horsepower} HP` : 'N/A'} />
      <Stat label="Cylinders" value={carData.cylinders || 'N/A'} />
      <Stat label="Transmission" value={carData.transmission === 'a' ? 'Automatic' : 'Manual'} />
      <Stat label="Drive" value={carData.drive?.toUpperCase() || 'N/A'} />
    </div>
  );
}

export default CarInfoPanel;