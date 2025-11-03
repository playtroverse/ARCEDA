
import React, { useState, useEffect } from 'react';

const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const winner = calculateWinner(board);

  const handleClick = (i: number) => {
    if (winner || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const renderSquare = (i: number) => {
    const value = board[i];
    const colorClass = value === 'X' ? 'text-cyan-400' : 'text-amber-400';
    return (
      <button
        className={`w-20 h-20 sm:w-28 sm:h-28 bg-gray-800 rounded-lg flex items-center justify-center text-5xl sm:text-6xl font-bold transition-transform transform active:scale-95 ${colorClass}`}
        onClick={() => handleClick(i)}
      >
        {value}
      </button>
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (board.every(Boolean)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-amber-400">{status}</h2>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
      </div>
      <button
        onClick={resetGame}
        className="mt-6 px-6 py-3 bg-indigo-600 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition-all transform active:scale-95"
      >
        Reset Game
      </button>
    </div>
  );
};

function calculateWinner(squares: Array<string | null>): string | null {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
