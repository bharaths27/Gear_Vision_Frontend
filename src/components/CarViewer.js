// frontend/src/components/CarViewer.js

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Bounds } from '@react-three/drei';

function Model({ modelUrl }) {
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
}

function CarViewer({ modelUrl }) {
  return (
    <div style={{ width: '100%', height: '100%', minHeight: '50vh' }}>
      <Canvas
        camera={{ position: [0, 2, 7], fov: 50 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight intensity={1.5} position={[10, 10, 5]} />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <Model modelUrl={modelUrl} />
          </Bounds>
        </Suspense>
        <OrbitControls enablePan={false} makeDefault />
      </Canvas>
    </div>
  );
}

export default CarViewer;