import { faCheck, faGenderless, faMars, faTimes, faVenus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
// wihthout the functions
export interface ProfileCardProps {
  _id: string;
  userName: string;
  firstName?: string;
  photoUrl: string;
  about?: string;
  gender?: string;
  age?: number;
  skills?: string[];
}
const ProfileCard = ({ _id, userName, photoUrl, about,age,gender }: ProfileCardProps) => {
  return (
    <div
      key={_id}
      className="sticky top-10 group rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out h-[300px] w-full" // Fixed height for uniformity
    >
      {/* Full Image Background with Centering */}
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={photoUrl}
          alt={userName}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Gradient Fade & Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent ">
        <div className="absolute bottom-0 p-4 text-left mb-2">
          <h2 className="text-xl font-semibold text-[#F58F7C]">{userName} {gender === "M" ? (
                    <FontAwesomeIcon icon={faMars} className="text-blue-500" />
                  ) : gender === "F" ? (
                    <FontAwesomeIcon icon={faVenus} className="text-pink-500" />
                  ) : (
                    <FontAwesomeIcon
                      icon={faGenderless}
                      className="text-gray-500"
                    />
                  )}</h2>
          <h1 className="text-white">{age}</h1>
          <p className="mt-1 text-[#D6D6D6] max-h-7 ">{about}</p>
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
  );
};

export default ProfileCard;
