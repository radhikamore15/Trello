import React from 'react';
import Board from './components/Board';
import Header from './components/Header';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <Board />
    </div>
  );
}

export default App;