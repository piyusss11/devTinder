import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackGroundImage from "../assets/BgImg.jpg";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { toast, ToastContainer } from "react-toastify";

const Login: React.FC = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    try {
      const response = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(response.data);
      dispatch(addUser(response.data));
      // toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed: Invalid email or password");
      console.error("Login failed:", error); // Show error to the user
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
        <form onSubmit={handleLogin}>
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
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              type="submit"
            >
              Login
            </button>
            <Link to="/signup" className="text-red-500 hover:text-red-600">
              Create an account
            </Link>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
