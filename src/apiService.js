// frontend/src/apiService.js

// Use the live URLs from your deployed Render services
const BACKEND_URL = 'https://gear-vision-backend.onrender.com';
const ML_SERVICE_URL = 'https://gear-vision-ml-service.onrender.com';

// Fetches the list of all official car makes from the API
export const fetchCarMakes = async () => {
  const url = `${BACKEND_URL}/api/carmakes`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch car makes.');
  return response.json();
};

// Fetches the list of models for a specific make
export const fetchCarModels = async (make) => {
  const url = `${BACKEND_URL}/api/car-models/${make}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch car models.');
  return response.json();
};

// Fetches the detailed specifications for a specific model
export const fetchCarData = async (make, model) => {
  const url = `${BACKEND_URL}/api/car-info/${make}/${model}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Could not retrieve specifications for this model.');
  }
  const data = await response.json();
  return data[0];
};

// Calls the ML service to get a performance prediction
export const fetchOptimizationPrediction = async (payload) => {
  const url = `${ML_SERVICE_URL}/predict`;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!response.ok) throw new Error('Prediction API call failed');
  return response.json();
};