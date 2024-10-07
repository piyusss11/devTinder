// import React from 'react'

import { Link } from "react-router-dom";
import BackGroundImage from "../assets/BgImg.jpg";

const BgImg = () => {
    return (
      <div className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage:  `url(${BackGroundImage})`
        }}
      >
        {/* Black Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>    
  
        {/* Content */}
        <div className="relative z-10 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-bold md:mb-2">Find Your Match</h1>
          <p className="text-white md:text-lg mb-2 md:mb-4">Start swiping right today!</p>
          <Link to={"/login"}>
          <button className="bg-red-500 text-white py-1 md:py-2 px-4 md:px-6 rounded-md md:text-lg tracking-tighter hover:bg-red-600 transition">
            Get Started
          </button>
          </Link>
        </div>
      </div>
    );
  }
  
  export default BgImg;
  