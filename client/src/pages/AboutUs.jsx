import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <div className="bg-white flex flex-col items-center py-16 px-6">
          <div className="max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-yellow-600 mb-6">About SnackVerse</h1>
            <p className="text-lg text-gray-700 mb-8">
              Welcome to <span className="font-semibold text-yellow-500">SnackVerse</span> — your one-stop destination for discovering and enjoying your favorite snacks!
              We're passionate about bringing the joy of snacking to every home, offering a curated selection of treats from all corners of the world.
            </p>

            <div className="grid sm:grid-cols-2 gap-8 text-left">
              <div>
                <h2 className="text-2xl font-semibold text-yellow-500 mb-2">🍪 Our Mission</h2>
                <p className="text-gray-600">
                  To connect snack lovers with the most delicious, exciting, and high-quality snacks available, both locally and globally.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-yellow-500 mb-2">🌍 Why SnackVerse?</h2>
                <p className="text-gray-600">
                  Whether you crave sweet, salty, spicy, or savory — we make snack discovery fun, easy, and delightful with a smooth browsing and shopping experience.
                </p>
              </div>
            </div>

            <div className="mt-12">
              <h3 className="text-xl text-yellow-600 font-semibold mb-3">🚀 Built with ❤️ using React, Tailwind, Python & Django</h3>
              <p className="text-gray-500">SnackVerse is developed by a solo developer who believes in blending food and technology creatively.</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
