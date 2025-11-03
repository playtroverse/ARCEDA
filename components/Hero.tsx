
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-indigo-500/10 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900"></div>
      
      <div className="container mx-auto text-center px-4 z-10">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-4 animate-fade-in-down">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-500 to-cyan-400">
            Welcome to Ayush's Arcade
          </span>
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto mb-8 animate-fade-in-up">
          Your one-stop destination for classic arcade games. Built for modern browsers, optimized for fun.
        </p>
        <a 
          href="#games"
          className="inline-block bg-indigo-600 text-white font-bold text-xl px-10 py-4 rounded-full shadow-lg shadow-indigo-500/50 hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 active:scale-100 animate-bounce"
        >
          Play Now
        </a>
      </div>
    </section>
  );
};

export default Hero;
