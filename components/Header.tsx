
import React, { useState, useRef, useEffect } from 'react';
import { HamburgerIcon, CloseIcon } from './icons';
import { GameControllerIcon } from './icons';

interface HeaderProps {
    onAdminToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAdminToggle }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const tapCount = useRef(0);
    const tapTimer = useRef<number | null>(null);
    const longPressTimer = useRef<number | null>(null);

    const handleLogoTap = () => {
        tapCount.current += 1;

        if (tapTimer.current) {
            clearTimeout(tapTimer.current);
        }

        if (tapCount.current === 2) {
            onAdminToggle();
            tapCount.current = 0;
        } else {
            tapTimer.current = window.setTimeout(() => {
                tapCount.current = 0;
            }, 300);
        }
    };
    
    const handleHomeLongPressStart = () => {
        longPressTimer.current = window.setTimeout(() => {
            onAdminToggle();
            setIsMenuOpen(false);
        }, 3000);
    };

    const handleHomeLongPressEnd = () => {
        if (longPressTimer.current) {
            clearTimeout(longPressTimer.current);
        }
    };
    
    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'Games', href: '#games' },
        { name: 'Blog', href: '#blog' },
    ];

    return (
        <header className="bg-gray-900/80 backdrop-blur-sm sticky top-0 z-40 py-4 px-4 md:px-8 shadow-lg shadow-indigo-500/10">
            <div className="container mx-auto flex justify-between items-center">
                <div 
                    className="flex items-center gap-2 cursor-pointer select-none"
                    onClick={handleLogoTap}
                    title="Double tap to open admin panel"
                >
                    <GameControllerIcon className="w-8 h-8 text-indigo-400"/>
                    <span className="text-2xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
                        Ayush's Arcade
                    </span>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <a key={link.name} href={link.href} className="text-lg font-medium text-gray-300 hover:text-indigo-400 transition-colors">
                            {link.name}
                        </a>
                    ))}
                </nav>

                <div className="md:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
                        <HamburgerIcon className="w-7 h-7" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-gray-900 bg-opacity-95 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex justify-end p-4">
                    <button onClick={() => setIsMenuOpen(false)} className="p-2">
                        <CloseIcon className="w-8 h-8" />
                    </button>
                </div>
                <nav className="flex flex-col items-center justify-center h-full gap-8 -mt-16">
                    {navLinks.map(link => (
                        <a 
                           key={link.name} 
                           href={link.href} 
                           className="text-4xl font-bold text-gray-200 hover:text-indigo-400 transition-colors" 
                           onClick={() => setIsMenuOpen(false)}
                           onTouchStart={link.name === 'Home' ? handleHomeLongPressStart : undefined}
                           onTouchEnd={link.name === 'Home' ? handleHomeLongPressEnd : undefined}
                           onMouseDown={link.name === 'Home' ? handleHomeLongPressStart : undefined}
                           onMouseUp={link.name === 'Home' ? handleHomeLongPressEnd : undefined}
                           onMouseLeave={link.name === 'Home' ? handleHomeLongPressEnd : undefined}
                           title={link.name === 'Home' ? 'Hold for 3s to open admin panel' : ''}
                        >
                            {link.name}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
