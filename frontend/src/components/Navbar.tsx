import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full bg-transparent py-4 px-8 flex justify-between items-center fixed top-0 z-10">
      <div className="text-white text-xl font-bold">YourLogo</div>
      <div className="flex space-x-6 text-white items-center">
        <Link to="/login">Login</Link>

        <Link
          to="/signup"
          className="bg-red-500 py-2 px-4 rounded-md hover:bg-red-600 transition"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
