import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import MainNavBar from "../components/MainNavBar";
import { Link } from "react-router-dom";

const Profile: React.FC = () => {
  // Access the user info from Redux state
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1F1E24] to-[#2C2B30] text-[#D6D6D6]">
      {/* Navbar */}
      <MainNavBar />

      {/* Profile Section */}
      <div className="max-w-5xl mx-auto py-16 px-6 md:px-12">
        <div className="bg-[#3A3A3F] bg-opacity-80 rounded-lg shadow-2xl p-8 md:p-12 lg:flex lg:space-x-12 transition transform hover:scale-105 hover:shadow-3xl">
          
          {/* Profile Image Section */}
          <div className="flex-shrink-0 relative">
            <img
              src={user.photoUrl || "/placeholder-image.jpg"} // Placeholder if no image available
              alt={user.userName}
              className="w-72 h-72 md:w-96 md:h-96 object-cover rounded-full border-8 border-[#F58F7C] shadow-lg"
            />
            {/* Creative Circle Decoration behind the image */}
            <div className="absolute top-0 left-0 w-72 h-72 md:w-96 md:h-96 bg-gradient-to-br from-[#F58F7C] to-transparent rounded-full opacity-30 blur-lg -z-10"></div>
          </div>

          {/* User Info Section */}
          <div className="flex-grow mt-10 lg:mt-0">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#F58F7C] mb-4">
              {user.userName}
            </h1>
            <p className="text-xl text-[#D6D6D6] mb-6">{user.emailId}</p>

            <div className="space-y-8 text-lg">
              {/* First and Last Name */}
              <div className="flex flex-col lg:flex-row lg:space-x-10">
                <div>
                  <label className="block text-[#F2C4CE] font-semibold">First Name</label>
                  <p className="mt-1 text-[#D6D6D6]">{user.firstName || "N/A"}</p>
                </div>
                <div className="mt-6 lg:mt-0">
                  <label className="block text-[#F2C4CE] font-semibold">Last Name</label>
                  <p className="mt-1 text-[#D6D6D6]">{user.lastName || "N/A"}</p>
                </div>
              </div>

              {/* Gender and Age */}
              <div className="flex flex-col lg:flex-row lg:space-x-10">
                <div>
                  <label className="block text-[#F2C4CE] font-semibold">Gender</label>
                  <p className="mt-1 text-[#D6D6D6]">{user.gender || "N/A"}</p>
                </div>
                <div className="mt-6 lg:mt-0">
                  <label className="block text-[#F2C4CE] font-semibold">Age</label>
                  <p className="mt-1 text-[#D6D6D6]">{user.age || "N/A"}</p>
                </div>
              </div>

              {/* About Me */}
              <div>
                <label className="block text-[#F2C4CE] font-semibold">About Me</label>
                <p className="mt-1 text-[#D6D6D6]">{user.about || "No information provided."}</p>
              </div>

              {/* Skills */}
              <div>
                <label className="block text-[#F2C4CE] font-semibold">Skills</label>
                {user.skills && user.skills.length > 0 ? (
                  <ul className="mt-1 list-disc list-inside">
                    {user.skills.map((skill: string, index: number) => (
                      <li key={index} className="text-[#D6D6D6]">{skill}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-[#D6D6D6]">No skills added yet.</p>
                )}
              </div>
            </div>
            
            {/* Edit Profile Button */}
            <div className="mt-12 flex justify-center lg:justify-end">
              <Link to="/profile/edit">
                <button className="bg-[#F58F7C] hover:bg-[#D97363] text-white py-3 px-8 rounded-full text-lg font-bold transition duration-300 shadow-lg hover:shadow-2xl">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
