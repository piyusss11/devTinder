import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faTimes,
  faMars,
  faVenus,
  faGenderless,
} from "@fortawesome/free-solid-svg-icons";
import { ProfileCardProps } from "./ProfileCard";

interface RequestCardProps {
  profile: ProfileCardProps;
  _id: string;
  handleReq: (action: string, id: string) => void;
}

const RequestCards: React.FC<RequestCardProps> = ({
  profile,
  _id,
  handleReq,
}) => {
  return (
    <div className="relative group bg-[#3A3A3F] shadow-lg rounded-lg overflow-hidden duration-200 ease-in-out hover:shadow-2xl hover:scale-105 transition-transform w-[454px] h-[600px] mb-6 flex flex-col">
      {/* Profile Image on top */}
      <div className="relative w-full h-[300px]">
        <img
          src={profile.photoUrl}
          alt={profile.userName}
          className="w-full h-full object-cover "
        />
        {/* Gradient fade effect at the bottom of the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      </div>

      {/* Profile Info at the bottom */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#F58F7C]">
            {profile.userName} {profile.gender === "M" ? (
              <FontAwesomeIcon icon={faMars} className="text-blue-500" />
            ) : profile.gender === "F" ? (
              <FontAwesomeIcon icon={faVenus} className="text-pink-500" />
            ) : (
              <FontAwesomeIcon icon={faGenderless} className="text-gray-500" />
            )}
          </h2>
          <p className="text-white mt-1">
            {profile.firstName} {profile.age ? `, ${profile.age}` : ""}
          </p>
          <p className="text-white mt-2 overflow-hidden h-12">
            {profile.about || "No description available."}
          </p>

          {/* Skills Section */}
          {profile.skills && profile.skills.length > 0 && (
            <div className="mt-4 overflow-hidden h-16 ">
              <h4 className="text-[#F58F7C] font-semibold">Skills:</h4>
              <div className="flex flex-wrap space-x-2 mt-2 overflow-hidden">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-[#F58F7C] text-white px-3 py-1 rounded-md text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Icons */}
        <div className="mt-4 flex justify-center space-x-6">
          <FontAwesomeIcon
            onClick={() => handleReq("accepted", _id)}
            icon={faCheck}
            className="text-5xl text-[#F58F7C] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
          />
          <FontAwesomeIcon
            onClick={() => handleReq("rejected", _id)}
            icon={faTimes}
            className="text-5xl text-[#F2C4CE] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default RequestCards;
