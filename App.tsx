import React, { useState, useEffect, useMemo } from 'react';
import type { Game, BlogPost } from './types';
import useLocalStorage from './hooks/useLocalStorage';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import GamesSection from './components/GamesSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import GameModal from './components/GameModal';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

// Game Components
import TicTacToe from './games/TicTacToe';
// In a real app, these would be implemented as well
const SnakeGame: React.FC = () => <div className="text-center p-8">Snake Game Coming Soon!</div>;
const MemoryGame: React.FC = () => <div className="text-center p-8">Memory Game Coming Soon!</div>;
const RockPaperScissors: React.FC = () => <div className="text-center p-8">Rock Paper Scissors Coming Soon!</div>;


// Initial Data
const initialGames: Game[] = [
  { id: 'tictactoe', title: 'Tic-Tac-Toe', description: 'The classic game of X\'s and O\'s. Challenge a friend or the computer.', image: 'https://picsum.photos/seed/tictactoe/400/300', component: TicTacToe, isVisible: true },
  { id: 'snake', title: 'Snake', description: 'Navigate the snake to eat the food and grow longer, but don\'t hit the walls!', image: 'https://picsum.photos/seed/snake/400/300', component: SnakeGame, isVisible: true },
  { id: 'memory', title: 'Memory Cards', description: 'Test your memory by finding all the matching pairs of cards.', image: 'https://picsum.photos/seed/memory/400/300', component: MemoryGame, isVisible: true },
  { id: 'rps', title: 'Rock Paper Scissors', description: 'The timeless decision-making game. Can you beat the odds?', image: 'https://picsum.photos/seed/rps/400/300', component: RockPaperScissors, isVisible: false },
];

const initialBlogPosts: BlogPost[] = [
  { id: '1', title: 'Welcome to the Arcade!', excerpt: 'We are thrilled to launch Ayush\'s Arcade, your new home for browser-based classic games.', content: '', date: 'October 26, 2023', isPublished: true },
  { id: '2', title: 'New High Score System Coming Soon', excerpt: 'Get ready to compete! We are working on a global high score system to see who is the ultimate arcade champion.', content: '', date: 'October 24, 2023', isPublished: true },
  { id: '3', title: 'Behind the Scenes: Building Snake', excerpt: 'A deep dive into the technical challenges and fun moments of creating our version of the classic Snake game.', content: '', date: 'October 20, 2023', isPublished: false },
];

type StoredGame = Omit<Game, 'component'>;
const ADMIN_PASSWORD = "password123";

const App: React.FC = () => {
  const [storedGames, setStoredGames] = useLocalStorage<StoredGame[]>(
    'arcade-games',
    initialGames.map(({ component, ...rest }) => rest)
  );

  const games: Game[] = useMemo(() => {
    return storedGames.map(gameData => {
      const gameComponent = initialGames.find(g => g.id === gameData.id)?.component;
      return {
        ...gameData,
        component: gameComponent || (() => <div>Component not found</div>)
      };
    });
  }, [storedGames]);

  const setGames = (value: React.SetStateAction<Game[]>) => {
    const newGames = value instanceof Function ? value(games) : value;
    setStoredGames(newGames.map(({ component, ...rest }) => rest));
  };
  
  const [posts, setPosts] = useLocalStorage<BlogPost[]>('arcade-posts', initialBlogPosts);

  const [activeGame, setActiveGame] = useState<Game | null>(null);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useLocalStorage('isAdminLoggedIn', false);

  const handleAdminToggle = () => {
    setIsAdminPanelOpen(prev => !prev);
  };

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };
  
  const handleLogout = () => {
      setIsLoggedIn(false);
      setIsAdminPanelOpen(false);
  };
  
  const isMobilePreview = isAdminPanelOpen && isLoggedIn && window.innerWidth < 768;


  return (
    <>
      <div className={`transition-transform duration-300 ease-in-out ${isAdminPanelOpen && isLoggedIn ? 'mobile-preview-active' : ''}`}>
        <Header onAdminToggle={handleAdminToggle} />
        <main>
          <Hero />
          <GamesSection games={games} onPlayGame={setActiveGame} />
          <BlogSection posts={posts} />
        </main>
        <Footer />
      </div>

      {activeGame && (
        <GameModal title={activeGame.title} onClose={() => setActiveGame(null)}>
          <activeGame.component />
        </GameModal>
      )}
      
      {isAdminPanelOpen && !isLoggedIn && (
        <AdminLogin onLogin={handleLogin} />
      )}

      {isAdminPanelOpen && isLoggedIn && (
          <AdminPanel 
            games={games}
            setGames={setGames}
            posts={posts}
            setPosts={setPosts}
            onClose={() => setIsAdminPanelOpen(false)}
            onLogout={handleLogout}
          />
      )}

      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-fade-in-down { animation: fade-in-down 0.6s ease-out 0.2s forwards; opacity: 0; }
        .animate-fade-in-up { animation: fade-in-up 0.6s ease-out 0.4s forwards; opacity: 0; }
      `}</style>
    </>
  );
};

export default App;
