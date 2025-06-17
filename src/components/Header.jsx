import React from 'react';

const Header = () => {
  const handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white shadow">
      <h1 className="text-xl font-bold text-blue-600">Trello Clone</h1>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleReset}>Reset Board</button>
    </header>
  );
};

export default Header;