import React, { useState } from 'react';
import { Draggable } from '@hello-pangea/dnd';
import CardModal from './CardModal.jsx';

const Card = ({ card, index, listId, setBoardData }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided) => (
          <div
            className="bg-gray-100 p-2 rounded shadow cursor-pointer hover:bg-gray-200"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={() => setOpen(true)}
          >
            {card.title}
          </div>
        )}
      </Draggable>
      {open && (
        <CardModal card={card} listId={listId} setBoardData={setBoardData} onClose={() => setOpen(false)} />
      )}
    </>
  );
};

export default Card;
