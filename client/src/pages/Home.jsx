// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SnackList from "../components/SnackList";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        
        {/* Hero Section */}
        <section className="text-center py-20 px-4 bg-gradient-to-b from-yellow-50 to-white">
          <h1 className="text-5xl font-bold text-yellow-500 mb-4">Welcome to SnackVerse</h1>
          <p className="mt-4 text-xl max-w-2xl mx-auto text-gray-600 leading-relaxed">
            Discover your favorite snacks in one place — sweet, salty, crunchy, or chewy! 
            From classic favorites to exciting new flavors, we have something for every craving.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={() => navigate('/products')}
              className="px-8 py-3 bg-yellow-400 text-white font-semibold rounded-full hover:bg-yellow-500 transition-colors"
            >
              Explore All Snacks
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="px-8 py-3 border-2 border-yellow-400 text-yellow-600 font-semibold rounded-full hover:bg-yellow-50 transition-colors"
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-white">
          <SnackList />
        </section>

        {/* Call to Action Section */}
        <section className="py-16 bg-yellow-50 text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Ready to Start Snacking?</h2>
            <p className="text-lg text-gray-600 mb-8">
              Join thousands of happy customers who have found their perfect snacks with us!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigate('/products')}
                className="px-8 py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Shop Now
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-3 border border-yellow-500 text-yellow-600 font-semibold rounded-lg hover:bg-yellow-50 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
