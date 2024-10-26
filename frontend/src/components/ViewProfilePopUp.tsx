import { DialogContent } from "@/components/ui/dialog";
import { Iuser } from "@/utils/userSlice";
import {
  faCheck,
  faGenderless,
  faMars,
  faTimes,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ViewProfilePopUpProps {
  info: Iuser;
  onInterested: () => void;
  onUnInterested: () => void;
}
const ViewProfilePopUp: React.FC<ViewProfilePopUpProps> = ({
  info,
  onInterested,
  onUnInterested,
}) => {
  return (
    <DialogContent className="p-0 border-none max-w-[525px] h-3/4 bg-[#2c2b30] text-white flex flex-col justify-between">
      
    {/* Image Section with Overlay for Username, Age, and Name */}
    <div className="relative rounded-lg shadow-lg overflow-hidden h-[300px] w-full">
      <img
        src={info.photoUrl}
        alt={info.userName}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
        <div className="absolute bottom-4 left-4 text-left pl-2">
          <h2 className="text-xl font-semibold text-[#F58F7C] flex items-center gap-1">
            {info.userName}
            {info.gender === "M" ? (
              <FontAwesomeIcon icon={faMars} className="text-blue-500" />
            ) : info.gender === "F" ? (
              <FontAwesomeIcon icon={faVenus} className="text-pink-500" />
            ) : (
              <FontAwesomeIcon icon={faGenderless} className="text-gray-500" />
            )}
          </h2>
          <p className="text-lg text-white">{info.age}</p>
          <p className="text-md text-white">
            {info.firstName} {info.lastName}
          </p>
        </div>
      </div>
    </div>

    {/* About and Skills Section */}
    <div className="pl-6 -mt-6">
      <p className="text-[#D6D6D6] overflow-hidden">{info.about}</p>
      
      {/* Skills Section */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-[#F58F7C] mb-2">Skills:</h3>
        <ul className="flex gap-4 text-[#D6D6D6]">
          {info.skills && info.skills.length > 0 ? (
            info.skills.map((skill, index) => (
              <span
                className="bg-[#F58F7C] text-white px-3 py-1 rounded-md text-sm"
                key={index}
              >
                {skill}
              </span>
            ))
          ) : (
            <li>No skills listed</li>
          )}
        </ul>
      </div>
    </div>

    {/* Bottom Action Icons */}
    <div className="flex justify-center space-x-6 py-4">
      <FontAwesomeIcon
        icon={faCheck}
        className="text-4xl text-[#F58F7C] cursor-pointer"
        onClick={onInterested}
      />
      <FontAwesomeIcon
        icon={faTimes}
        className="text-4xl text-[#F2C4CE] cursor-pointer"
        onClick={onUnInterested}
      />
    </div>

  </DialogContent>
  );
};

export default ViewProfilePopUp;
