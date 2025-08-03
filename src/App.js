// frontend/src/App.js

import React, { useState } from 'react';
import NavBar from './components/NavBar';
import BrandCarSelection from './components/BrandCarSelection';
import CarViewer from './components/CarViewer';
import CarInfoPanel from './components/CarInfoPanel';
import OptimizationPanel from './components/OptimizationPanel';
import { fetchCarData } from './apiService';
import './index.css';

function App() {
  const [selectedCarModelUrl, setSelectedCarModelUrl] = useState(null);
  const [selectedCarModelName, setSelectedCarModelName] = useState('');
  const [carData, setCarData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCarSelect = async (brandId, carName) => {
    setIsLoading(true);
    setCarData(null);
    setError(null);

    // Using process.env.PUBLIC_URL to get the correct path for deployed assets
    const modelPaths = {
      'audi_A4': `${process.env.PUBLIC_URL}/models/Audi_A4.glb`, 
      'audi_A7': `${process.env.PUBLIC_URL}/models/Audi_A7.glb`, 
      'audi_R8': `${process.env.PUBLIC_URL}/models/Audi_R8.glb`,
      'audi_RS 5': `${process.env.PUBLIC_URL}/models/Audi_RS5.glb`, 
      'audi_RS 6': `${process.env.PUBLIC_URL}/models/Audi_RS6.glb`,
    };
    
    const urlKey = `${brandId}_${carName}`;
    const modelKeyForMl = modelPaths[urlKey]?.split('/')[3].replace('.glb', ''); // Index is now 3

    setSelectedCarModelUrl(modelPaths[urlKey] || null);
    setSelectedCarModelName(modelKeyForMl || '');

    try {
      const data = await fetchCarData(brandId, carName);
      setCarData(data);
    } catch (error) {
      console.error(error);
      setError('Could not retrieve specifications for this model.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white futuristic-font">
      <NavBar />
      <main className="p-8">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr', gap: '20px', alignItems: 'flex-start' }}>
          <CarInfoPanel carData={carData} isLoading={isLoading} error={error} />
          <div>
            <BrandCarSelection onCarSelect={handleCarSelect} />
            <h3 className="text-2xl mt-8 mb-4 text-center">3D Model Viewer</h3>
            {selectedCarModelUrl ? (
              <CarViewer modelUrl={selectedCarModelUrl} />
            ) : (
              <div style={{ height: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                <p>Select a car to view the model.</p>
              </div>
            )}
          </div>
          <OptimizationPanel modelName={selectedCarModelName} />
        </div>
      </main>
    </div>
  );
}

export default App;