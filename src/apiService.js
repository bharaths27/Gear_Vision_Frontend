// frontend/src/apiService.js

export const fetchCarData = async (make, model) => {
  const url = `http://localhost:5001/api/car-info/${make}/${model}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Could not retrieve specifications for this model.');
  }
  const data = await response.json();
  return data[0];
};

export const fetchOptimizationPrediction = async (payload) => {
  const response = await fetch('http://localhost:5002/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Prediction API call failed');
  return response.json();
};