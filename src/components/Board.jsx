
// import React, { useState, useEffect } from 'react';
// import { DragDropContext, Droppable } from '@hello-pangea/dnd';
// import List from './List';
// import { v4 as uuid } from 'uuid';

// const Board = () => {
//   const [boardData, setBoardData] = useState([]);
//   const [newListTitle, setNewListTitle] = useState('');

//   useEffect(() => {
//     const saved = localStorage.getItem('boardData');
//     if (saved) {
//       setBoardData(JSON.parse(saved));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('boardData', JSON.stringify(boardData));
//   }, [boardData]);

//   const addList = () => {
//     if (!newListTitle.trim()) return;
//     const newList = {
//       id: uuid(),
//       title: newListTitle,
//       cards: [],
//     };
//     setBoardData([...boardData, newList]);
//     setNewListTitle('');
//   };

//   const onDragEnd = (result) => {
//     // Handle drag logic
//   };

//   return (
//     <div className="p-4">
//       <div className="mb-4 flex gap-2">
//         <input
//           className="border p-2 rounded w-64"
//           placeholder="Enter list title"
//           value={newListTitle}
//           onChange={(e) => setNewListTitle(e.target.value)}
//         />
//         <button
//           className="bg-green-500 text-white px-4 py-2 rounded"
//           onClick={addList}
//         >
//           Add List
//         </button>
//       </div>

//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="board" direction="horizontal" type="list">
//           {(provided) => (
//             <div
//               className="flex gap-4 overflow-x-auto"
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//             >
//               {boardData.map((list, index) => (
//                 <List
//                   key={list.id}
//                   list={list}
//                   index={index}
//                   setBoardData={setBoardData}
//                 />
//               ))}
//               {provided.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// export default Board;

import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import List from './List';
import { v4 as uuid } from 'uuid';

const Board = () => {
  const [boardData, setBoardData] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('boardData');
    if (saved) {
      setBoardData(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('boardData', JSON.stringify(boardData));
  }, [boardData]);

  const addList = () => {
    if (!newListTitle.trim()) return;
    const newList = {
      id: uuid(),
      title: newListTitle,
      cards: [],
    };
    setBoardData([...boardData, newList]);
    setNewListTitle('');
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (!destination) return;

    // Reorder lists
    if (type === 'list') {
      const newBoardData = Array.from(boardData);
      const [movedList] = newBoardData.splice(source.index, 1);
      newBoardData.splice(destination.index, 0, movedList);
      setBoardData(newBoardData);
      return;
    }

    // Reorder cards
    const sourceListIndex = boardData.findIndex(list => list.id === source.droppableId);
    const destListIndex = boardData.findIndex(list => list.id === destination.droppableId);

    const sourceList = boardData[sourceListIndex];
    const destList = boardData[destListIndex];

    const sourceCards = Array.from(sourceList.cards);
    const [movedCard] = sourceCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Move within the same list
      sourceCards.splice(destination.index, 0, movedCard);
      const updatedList = { ...sourceList, cards: sourceCards };
      const newBoardData = [...boardData];
      newBoardData[sourceListIndex] = updatedList;
      setBoardData(newBoardData);
    } else {
      // Move to different list
      const destCards = Array.from(destList.cards);
      destCards.splice(destination.index, 0, movedCard);

      const newBoardData = [...boardData];
      newBoardData[sourceListIndex] = { ...sourceList, cards: sourceCards };
      newBoardData[destListIndex] = { ...destList, cards: destCards };
      setBoardData(newBoardData);
    }
  };

  return (
    <div className="p-4">
      {/* Add List UI */}
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2 rounded w-64"
          placeholder="Enter list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={addList}
        >
          Add List
        </button>
      </div>

      {/* DragDropContext */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="flex gap-4 overflow-x-auto pb-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {boardData.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  setBoardData={setBoardData}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;
