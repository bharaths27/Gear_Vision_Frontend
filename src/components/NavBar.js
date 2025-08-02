import React from 'react';

function NavBar() {
  return (
    <nav 
      className="w-full bg-gray-900 text-white py-4 px-8 flex flex-col justify-center items-center futuristic-font"
      style={{ textAlign: 'center' }}
    >
      <h1 className="text-5xl font-bold">Gear Vision</h1>
      <p className="text-sm mt-1">Your vision, our gear</p>
    </nav>
  );
}

export default NavBar;
