import React from 'react';
import { v4 as uuid } from 'uuid';

const AddList = ({ setBoardData }) => {
  const handleAddList = () => {
    const title = prompt('Enter list title:');
    if (title) {
      setBoardData(prev => [...prev, { id: uuid(), title, cards: [] }]);
    }
  };

  return (
    <button className="min-w-[250px] p-4 bg-blue-100 rounded hover:bg-blue-200" onClick={handleAddList}>+ Add List</button>
  );
};

export default AddList;