
import React from 'react';
import type { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-indigo-500/40 transition-all duration-300 transform hover:-translate-y-2 group">
      <img src={game.image} alt={game.title} className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity" />
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-indigo-400">{game.title}</h3>
        <p className="text-gray-400 mb-4 h-20 overflow-hidden">{game.description}</p>
        <button 
          onClick={() => onPlay(game)} 
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors transform active:scale-95"
        >
          Play Game
        </button>
      </div>
    </div>
  );
};

export default GameCard;
