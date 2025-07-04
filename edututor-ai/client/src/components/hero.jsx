import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="text-center py-16 px-6 bg-black text-white">
      <h1 className="text-4xl md:text-5xl font-bold text-neon glow mb-6">
        Personalized Learning with AI
      </h1>
      <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
        Welcome to EduTutor AI — where adaptive learning meets generative intelligence.
        Experience personalized education like never before.
      </p>
      <Link to="/signup">
        <button className="neon-button text-lg px-6 py-3">🚀 ENROLL NOW</button>
      </Link>
    </section>
  );
}

export default Hero;
