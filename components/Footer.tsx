
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 border-t border-indigo-500/20 py-8">
      <div className="container mx-auto px-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Ayush's Arcade. All Rights Reserved.</p>
        <p className="mt-2">Created with ❤️ by Ayush Kumar Mishra</p>
      </div>
    </footer>
  );
};

export default Footer;
