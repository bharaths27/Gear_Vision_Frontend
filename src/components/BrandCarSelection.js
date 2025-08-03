// frontend/src/components/BrandCarSelection.js

import React, { useState } from 'react';

const brands = [
  {
    id: 'audi',
    name: 'Audi',
    logo: '/logos/audi.png',
    cars: ['A4', 'A7', 'R8', 'RS 5', 'RS 6'],
  },
];

function BrandCarSelection({ onCarSelect }) {
  const [selectedBrand, setSelectedBrand] = useState(brands[0]); // Default to Audi selected

  return (
    <div style={{ marginBottom: '20px', textAlign: 'center' }}>
      <div
        className="flex overflow-x-auto gap-6 justify-center mb-6"
        style={{ padding: '10px' }}
      >
        {brands.map((brand) => (
          <div
            key={brand.id}
            style={{
              cursor: 'default',
              border: '2px solid #fff',
              padding: '10px',
              borderRadius: '8px',
              minWidth: '100px',
              textAlign: 'center',
            }}
          >
            {/* UPDATED IMAGE PATH */}
            <img
              src={`${process.env.PUBLIC_URL}${brand.logo}`}
              alt={brand.name}
              style={{ width: '60px', height: '60px', objectFit: 'contain', margin: '0 auto' }}
            />
            <div>{brand.name}</div>
          </div>
        ))}
      </div>

      <div style={{ minHeight: '50px' }}>
        {selectedBrand.cars.map((carName) => (
          <div
            key={carName}
            onClick={() => onCarSelect(selectedBrand.id, carName)}
            style={{
              cursor: 'pointer', display: 'inline-block', padding: '6px 12px',
              margin: '4px', backgroundColor: '#fff', color: '#000', borderRadius: '4px'
            }}
          >
            {carName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandCarSelection;