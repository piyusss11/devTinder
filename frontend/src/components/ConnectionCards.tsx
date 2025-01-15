
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ProfileCardProps } from "./ProfileCard";
import { faGenderless, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

const ConnectionCards = ({

  userName,
  firstName,
  photoUrl,
  about,
  gender,
  age,
  skills,
}: ProfileCardProps) => {
  return (
    <div className="relative group bg-[#3A3A3F] shadow-lg rounded-lg overflow-hidden duration-200 ease-in-out hover:shadow-2xl hover:scale-105 transition-transform w-[454px] h-[512px] mb-6 flex flex-col">
      {/* Profile Image on top */}
      <div className="relative w-full h-[300px]">
        <img
          src={photoUrl}
          alt={userName}
          className="w-full h-full object-cover "
        />
        {/* Gradient fade effect at the bottom of the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
      </div>

      {/* Profile Info at the bottom */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#F58F7C]">
            {userName}  {gender === "M" ? (
              <FontAwesomeIcon icon={faMars} className="text-blue-500" />
            ) : gender === "F" ? (
              <FontAwesomeIcon icon={faVenus} className="text-pink-500" />
            ) : (
              <FontAwesomeIcon icon={faGenderless} className="text-gray-500" />
            )}
          </h2>
          <p className="text-white mt-1">
            {firstName} {age ? `, ${age}` : ""}
          </p>
          <p className="text-white mt-2 h-12 overflow-hidden">
            {about || "No description available."}
          </p>

          {/* Skills Section */}
          {skills && skills.length > 0 && (
            <div className="mt-4 overflow-hidden ">
              <h4 className="text-[#F58F7C] font-semibold">Skills:</h4>
              <div className="flex flex-wrap gap-2 mt-2 ">
                {skills.map((skill) => (
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
      </div>
    </div>
  );
};

export default ConnectionCards;
