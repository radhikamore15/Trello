
import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import Card from './Card';
import { v4 as uuid } from 'uuid';

const List = ({ list, index, setBoardData }) => {
  const [newCardTitle, setNewCardTitle] = useState('');

  const deleteList = () => {
    if (window.confirm('Delete this list?')) {
      setBoardData(prev => prev.filter(l => l.id !== list.id));
    }
  };

  const addCard = () => {
    if (!newCardTitle.trim()) return;
    const newCard = {
      id: uuid(),
      title: newCardTitle
    };
    setBoardData(prev => prev.map(l => l.id === list.id ? { ...l, cards: [...l.cards, newCard] } : l));
    setNewCardTitle('');
  };

  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div className="bg-white rounded-lg shadow-md p-4 min-w-[250px]" ref={provided.innerRef} {...provided.draggableProps}>
          <div className="flex justify-between items-center mb-2" {...provided.dragHandleProps}>
            <input
              className="font-semibold text-lg w-full mr-2"
              value={list.title}
              onChange={(e) => setBoardData(prev => prev.map(l => l.id === list.id ? { ...l, title: e.target.value } : l))}
            />
            <button onClick={deleteList} className="text-red-500">×</button>
          </div>
          <Droppable droppableId={list.id} type="card">
            {(provided) => (
              <div className="space-y-2 mb-2" ref={provided.innerRef} {...provided.droppableProps}>
                {list.cards.map((card, i) => (
                  <Card key={card.id} card={card} index={i} listId={list.id} setBoardData={setBoardData} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="mt-2">
            <input
              className="border p-1 rounded w-full mb-1"
              placeholder="Add a card title"
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCard()}
            />
            <button className="bg-blue-500 text-white px-3 py-1 rounded w-full" onClick={addCard}>Add Card</button>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default List;

