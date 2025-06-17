import React, { useState } from 'react';

const CardModal = ({ card, listId, setBoardData, onClose }) => {
  const [title, setTitle] = useState(card.title);

  const saveChanges = () => {
    setBoardData(prev => prev.map(list => {
      if (list.id === listId) {
        const updatedCards = list.cards.map(c => c.id === card.id ? { ...c, title } : c);
        return { ...list, cards: updatedCards };
      }
      return list;
    }));
    onClose();
  };

  const deleteCard = () => {
    setBoardData(prev => prev.map(list => list.id === listId ? { ...list, cards: list.cards.filter(c => c.id !== card.id) } : list));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow w-96">
        <h2 className="text-lg font-bold mb-2">Edit Card</h2>
        <input className="border p-2 w-full mb-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        <div className="flex justify-between">
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={saveChanges}>Save</button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={deleteCard}>Delete</button>
          <button className="bg-gray-300 text-black px-4 py-2 rounded" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CardModal;