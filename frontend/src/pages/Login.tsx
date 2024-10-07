import React, { useState } from "react";
import { Link } from "react-router-dom";
import BackGroundImage from "../assets/BgImg.jpg";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("yash@gmail.com");
  const [password, setPassword] = useState("Yash@123");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/login",{
        email,
        password
      })
      console.log(response)
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${BackGroundImage})`,
      }}
    >
      {/* for shadowing the background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md z-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              type="email"
              id="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              type="password"
              id="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button onClick={handleLogin}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              type="submit"
            >
              Login
            </button>
            <Link to="/register" className="text-red-500 hover:text-red-600">
              Create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
