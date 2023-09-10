export const numRows = 20;
export const numCols = 20;

export const CellType = {
  EMPTY: 0,
  SNAKE: 1,
  TARGET: 2,
};

export const startSnakeBody = [
  { x: 5, y: 5 },
  { x: 5, y: 6 },
  { x: 5, y: 7 },
];

export const randomPos = () => ({
  x: Math.floor(Math.random() * numCols),
  y: Math.floor(Math.random() * numRows),
});
