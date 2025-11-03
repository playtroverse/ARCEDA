
import React from 'react';
import type { Game } from '../types';
import GameCard from './GameCard';

interface GamesSectionProps {
  games: Game[];
  onPlayGame: (game: Game) => void;
}

const GamesSection: React.FC<GamesSectionProps> = ({ games, onPlayGame }) => {
  const visibleGames = games.filter(g => g.isVisible);
  
  return (
    <section id="games" className="py-20 md:py-32 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-12">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Our Games
          </span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleGames.map((game) => (
            <GameCard key={game.id} game={game} onPlay={onPlayGame} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesSection;
