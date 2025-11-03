
import React from 'react';
import { CloseIcon } from './icons';

interface GameModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const GameModal: React.FC<GameModalProps> = ({ title, onClose, children }) => {
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-indigo-500/50 rounded-2xl shadow-2xl shadow-indigo-500/20 w-full max-w-lg max-h-[90vh] flex flex-col relative animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-indigo-400">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-gray-700">
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-4 sm:p-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GameModal;
