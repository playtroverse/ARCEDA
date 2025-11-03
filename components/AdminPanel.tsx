
import React, { useState } from 'react';
import type { Game, BlogPost } from '../types';

interface AdminPanelProps {
    games: Game[];
    setGames: React.Dispatch<React.SetStateAction<Game[]>>;
    posts: BlogPost[];
    setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
    onClose: () => void;
    onLogout: () => void;
}

type AdminTab = 'games' | 'blog';

const AdminPanel: React.FC<AdminPanelProps> = ({ games, setGames, posts, setPosts, onClose, onLogout }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('games');
    const [isMobilePreview, setIsMobilePreview] = useState(false);

    const toggleGameVisibility = (id: string) => {
        setGames(prevGames =>
            prevGames.map(game =>
                game.id === id ? { ...game, isVisible: !game.isVisible } : game
            )
        );
    };

    const togglePostPublished = (id: string) => {
        setPosts(prevPosts =>
            prevPosts.map(post =>
                post.id === id ? { ...post, isPublished: !post.isPublished } : post
            )
        );
    };

    return (
        <div className={`fixed inset-0 z-50 flex ${isMobilePreview ? 'justify-end' : ''}`}>
             <div 
                className={`fixed inset-0 bg-black/60 transition-opacity duration-300 ${isMobilePreview ? 'opacity-100' : 'opacity-100'}`} 
                onClick={onClose}
             ></div>

            <div className={`relative bg-gray-800 h-full shadow-2xl transition-all duration-300 ease-in-out flex flex-col ${isMobilePreview ? 'w-[420px]' : 'w-full md:w-1/2 lg:w-1/3'}`}>
                {/* Header */}
                <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-indigo-500/30">
                    <h2 className="text-xl font-bold text-indigo-400">Admin Panel</h2>
                    <div>
                        <button onClick={() => setIsMobilePreview(!isMobilePreview)} className="p-2 text-sm bg-gray-700 rounded mr-2 hover:bg-indigo-600">
                           {isMobilePreview ? 'Exit Preview' : 'Mobile Preview'}
                        </button>
                        <button onClick={onClose} className="p-2 bg-gray-700 rounded hover:bg-red-600">
                            Close
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-700">
                    <button 
                        onClick={() => setActiveTab('games')}
                        className={`flex-1 p-4 text-lg font-semibold transition-colors ${activeTab === 'games' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                        Manage Games
                    </button>
                    <button 
                        onClick={() => setActiveTab('blog')}
                        className={`flex-1 p-4 text-lg font-semibold transition-colors ${activeTab === 'blog' ? 'bg-indigo-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                    >
                        Manage Blog
                    </button>
                </div>
                
                {/* Content */}
                <div className="flex-grow p-4 overflow-y-auto">
                    {activeTab === 'games' && (
                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold mb-4">Games</h3>
                            {games.map(game => (
                                <div key={game.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-lg">{game.title}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={game.isVisible} onChange={() => toggleGameVisibility(game.id)} className="sr-only peer" />
                                        <div className="w-14 h-8 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeTab === 'blog' && (
                         <div className="space-y-4">
                            <h3 className="text-2xl font-bold mb-4">Blog Posts</h3>
                            {posts.map(post => (
                                <div key={post.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
                                    <span className="text-lg truncate pr-4">{post.title}</span>
                                     <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={post.isPublished} onChange={() => togglePostPublished(post.id)} className="sr-only peer" />
                                        <div className="w-14 h-8 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-green-500"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                 {/* Footer */}
                <div className="p-4 bg-gray-900 border-t border-indigo-500/30">
                    <button 
                        onClick={onLogout}
                        className="w-full bg-red-600 text-white font-bold text-lg py-3 rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
            {/* Mobile preview adds this class to the main content wrapper */}
            <style>{`
                .mobile-preview-active {
                    transform: scale(0.95) translateX(-5%);
                    transform-origin: top left;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 4px solid #4f46e5;
                    box-shadow: 0 0 30px rgba(79, 70, 229, 0.5);
                    pointer-events: none;
                }
            `}</style>
        </div>
    );
};

export default AdminPanel;
