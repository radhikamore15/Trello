import { useState, useEffect } from 'react';

const useBoardData = () => {
  const [data, setData] = useState(() => {
    const stored = localStorage.getItem('boardData');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('boardData', JSON.stringify(data));
  }, [data]);

  return [data, setData];
};

export default useBoardData;