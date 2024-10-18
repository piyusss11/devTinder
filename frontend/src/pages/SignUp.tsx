import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import BackGroundImage from "../assets/BgImg.jpg";

const Signup: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        firstName,
        lastName,
        userName,
        emailId,
        password,
        photoUrl,
        age,
        gender,
      });

      console.log(response.data);


      toast({
        description: "User created successfully! Redirecting to login...",
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000); // Wait for 3 seconds before navigating
    } catch (error) {
      console.error("Signup failed:", error);
      toast({
        description: "Signup failed! Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${BackGroundImage})`,
      }}
    >
      {/* For shadowing the background */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl z-20">
        <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
        <form
          onSubmit={handleSignup}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              type="text"
              id="firstName"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              type="text"
              id="lastName"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userName"
            >
              User Name
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              type="text"
              id="userName"
              placeholder="User Name"
              required
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              id="gender"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              type="number"
              id="age"
              placeholder="Age"
              required
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="emailId"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              type="email"
              id="emailId"
              placeholder="Email"
              required
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          <div>
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
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="photoUrl"
            >
              Photo URL
            </label>
            <input
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              type="text"
              id="photoUrl"
              placeholder="Photo URL"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
          </div>

          <div className="col-span-2 flex items-center justify-between">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
              type="submit"
            >
              Sign Up
            </button>
            <Link to="/login" className="text-red-500 hover:text-red-600">
              Already have an account? Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
