import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import MainNavBar from "../components/MainNavBar";

interface Profile {
  id: number;
  name: string;
  description: string;
  image: string;
}

const profiles: Profile[] = [
  { id: 1, name: "John Doe", description: "Loves hiking and photography.", image: "https://i3.wp.com/images.hindustantimes.com/img/2021/09/04/1600x900/rohit-ton-englnad_1630766456413_1630766462833.jpg?strip=all" },
  { id: 2, name: "Jane Smith", description: "Food enthusiast and baker.", image: "https://cdn.britannica.com/48/252748-050-C514EFDB/Virat-Kohli-India-celebrates-50th-century-Cricket-November-15-2023.jpg" },
  { id: 3, name: "Mark Johnson", description: "Travel lover and adventurer.", image: "https://crictoday.com/wp-content/uploads/2023/04/1-16-8.webp" },
  { id: 4, name: "Emma Wilson", description: "Tech geek and gamer.", image: "https://pop-culturalist.com/wp-content/uploads/2017/02/BarneyStinson-1024x579.jpg" },
  // Add more profiles here
];

const Feed: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#2C2B30] text-[#D6D6D6]">
      {/* Navbar */}
     <MainNavBar/>

      {/* Profile Cards */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map((profile) => (
          <div 
            key={profile.id} 
            className="relative group rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out h-[300px] w-full" // Fixed height for uniformity
          >
            {/* Full Image Background with Centering */}
            <div className="h-full w-full flex items-center justify-center">
              <img
                src={profile.image}
                alt={profile.name}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>

            {/* Gradient Fade & Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="absolute bottom-0 p-4 text-left">
                <h2 className="text-xl font-semibold text-[#F58F7C]">{profile.name}</h2>
                <p className="mt-1 text-[#D6D6D6]">{profile.description}</p>
              </div>
            </div>

            {/* Hover Icons */}
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <div className="flex space-x-6">
                <FontAwesomeIcon 
                  icon={faCheck} 
                  className="text-4xl text-[#F58F7C] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer" 
                />
                <FontAwesomeIcon 
                  icon={faTimes} 
                  className="text-4xl text-[#F2C4CE] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer" 
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;
