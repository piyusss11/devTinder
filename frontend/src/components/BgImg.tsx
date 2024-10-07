// import React from 'react'

import { Link } from "react-router-dom";

const BgImg = () => {
    return (
      <div className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('https://tinder.com/static/build/8ad4e4299ef5e377d2ef00ba5c94c44c.webp')"
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>
  
        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Find Your Match</h1>
          <p className="text-white text-lg mb-8">Start swiping right today!</p>
          <Link to={"/login"}>
          <button className="bg-red-500 text-white py-2 px-6 rounded-md text-lg hover:bg-red-600 transition">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default BgImg;
  