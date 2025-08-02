// frontend/src/components/OptimizationPanel.js

import React, { useState } from 'react';
import { fetchOptimizationPrediction } from '../apiService';

const panelStyle = {
    padding: '20px',
    background: 'rgba(20, 20, 20, 0.8)',
    borderRadius: '8px',
    border: '1px solid #444',
    height: '100%',
};

// ADDING THIS MISSING COMPONENT DEFINITION
const Stat = ({ label, value }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #333' }}>
    <span style={{ color: '#aaa' }}>{label}</span>
    <strong>{value}</strong>
  </div>
);

const upgradeOptions = {
  Engine: [
    { name: 'Stock', cost: 0, hp_gain: 0 },
    { name: 'ECU Tune', cost: 1500, hp_gain: 50 },
    { name: 'Turbo Kit', cost: 5000, hp_gain: 120 },
  ],
  Brakes: [
    { name: 'Stock', cost: 0, hp_gain: 0 },
    { name: 'Street Performance Pads', cost: 800, hp_gain: 0 },
    { name: 'Big Brake Kit', cost: 3500, hp_gain: 0 },
  ],
  Suspension: [
    { name: 'Stock', cost: 0, hp_gain: 0 },
    { name: 'Sport Lowering Springs', cost: 1200, hp_gain: 0 },
    { name: 'Coilover Kit', cost: 4000, hp_gain: 0 },
  ],
  Tires: [
    { name: 'Stock', cost: 0, hp_gain: 0 },
    { name: 'Performance Summer Tires', cost: 1600, hp_gain: 0 },
    { name: 'Track-Ready Slicks', cost: 2800, hp_gain: 0 },
  ],
};

const Dropdown = ({ label, options, onChange }) => (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', color: '#aaa' }}>{label}</label>
      <select onChange={onChange} style={{ width: '100%', padding: '8px', background: '#333', color: 'white', border: '1px solid #555' }}>
        {options.map((opt, index) => (
          <option key={index} value={index}>{opt.name} (${opt.cost})</option>
        ))}
      </select>
    </div>
);

function OptimizationPanel({ modelName }) {
  const [selections, setSelections] = useState({ Engine: 0, Brakes: 0, Suspension: 0, Tires: 0 });
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectionChange = (part, index) => {
    setSelections(prev => ({ ...prev, [part]: parseInt(index) }));
  };

  const handleSimulate = async () => {
    setIsLoading(true);
    setPrediction(null);
    
    let total_cost = 0;
    let total_hp_gain = 0;

    for (const part in selections) {
        const optionIndex = selections[part];
        const selectedOption = upgradeOptions[part][optionIndex];
        total_cost += selectedOption.cost;
        total_hp_gain += selectedOption.hp_gain;
    }
    
    try {
      const data = await fetchOptimizationPrediction({
        modelName,
        mod_cost: total_cost,
        mod_hp_gain: total_hp_gain,
      });
      setPrediction(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!modelName) {
      return (
        <div style={panelStyle}>
            <h3>Optimization</h3>
            <p style={{ color: '#aaa' }}>Select a car to begin optimizing.</p>
        </div>
      )
  }

  return (
    <div style={panelStyle}>
        <h3 style={{ borderBottom: '1px solid #555', paddingBottom: '10px', marginBottom: '15px' }}>Optimization</h3>
        <Dropdown label="Engine" options={upgradeOptions.Engine} onChange={(e) => handleSelectionChange('Engine', e.target.value)} />
        <Dropdown label="Brakes" options={upgradeOptions.Brakes} onChange={(e) => handleSelectionChange('Brakes', e.target.value)} />
        <Dropdown label="Suspension" options={upgradeOptions.Suspension} onChange={(e) => handleSelectionChange('Suspension', e.target.value)} />
        <Dropdown label="Tires" options={upgradeOptions.Tires} onChange={(e) => handleSelectionChange('Tires', e.target.value)} />

        <button onClick={handleSimulate} disabled={isLoading} style={{ width: '100%', padding: '12px', background: '#61dafb', color: 'black', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}>
            {isLoading ? 'Simulating...' : 'Simulate'}
        </button>

        {prediction && (
          <div style={{ marginTop: '20px' }}>
            <h4>Simulation Results:</h4>
            <Stat label="New 0-60 Time" value={`${prediction.predicted_0_to_60}s`} />
            <Stat label="New Horsepower" value={`${prediction.new_hp} HP`} />
            <Stat label="Total Upgrade Cost" value={`$${prediction.total_cost}`} />
          </div>
        )}
    </div>
  );
}

export default OptimizationPanel;