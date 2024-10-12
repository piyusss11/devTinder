import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { Local_Url } from "../utils/constants";

const EditProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [userName, setUserName] = useState(user.userName);
  const [age, setAge] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState<"M" | "F" | "O" | "">("");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState("");

  const navigate = useNavigate();

  // Load profile data (assumed user is already logged in)
  useEffect(() => {
    // const loadProfile = async () => {
    //   try {
    //     const response = await axios.get(`${Local_Url}/profile`);
    //     const {
    //       firstName,
    //       lastName,
    //       userName,
    //       age,
    //       gender,
    //       photoUrl,
    //       about,
    //       skills,
    //     } = response.data;

    //     setFirstName(firstName);
    //     setLastName(lastName);
    //     setUserName(userName);
    //     setAge(age);
    //     setGender(gender || "");
    //     setPhotoUrl(photoUrl);
    //     setAbout(about || "");
    //     setSkills(skills || []);
    //   } catch (error) {
    //     console.error("Error loading profile:", error);
    //   }
    // };

    // loadProfile();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${Local_Url}/profile/edit`, {
        firstName,
        lastName,
        userName,
        age,
        gender,
        photoUrl,
        about,
        skills,
      });

      toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setTimeout(() => {
        navigate("/profile"); // Redirect to profile view page
      }, 3000);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Profile update failed! Please try again.");
    }
  };

  const handleSkillAdd = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handlePasswordChange = () => {
    navigate("/change-password"); // Redirect to change password page
  };

  return (
    <div
      style={{ backgroundImage: `url(${user.photoUrl})` }}
      className="min-h-screen flex items-center justify-center bg-cover bg-gradient-to-b from-[#1F1E24] to-[#2C2B30] text-[#D6D6D6]"
    >
      {/* Overlay effect */}
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="bg-[#3A3A3F] bg-opacity-90 p-10 rounded-lg shadow-2xl w-full max-w-4xl z-20 relative max-h-screen overflow-y-scroll">
        <h2 className="text-4xl font-extrabold text-center mb-8 text-[#F58F7C]">
          Edit Profile
        </h2>
        <form
          onSubmit={handleProfileUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div>
            <label
              className="block text-[#F2C4CE] font-semibold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58F7C]"
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-[#F2C4CE] font-semibold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58F7C]"
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <div>
            <label
              className="block text-[#F2C4CE] font-semibold mb-2"
              htmlFor="userName"
            >
              User Name
            </label>
            <input
              className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58F7C]"
              type="text"
              id="userName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              className="block text-[#F2C4CE] font-semibold mb-2"
              htmlFor="age"
            >
              Age
            </label>
            <input
              className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58F7C]"
              type="number"
              id="age"
              value={age || ""}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </div>

          <div>
            <label
              className="block text-[#F2C4CE] font-semibold mb-2"
              htmlFor="gender"
            >
              Gender
            </label>
            <select
              className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58F7C]"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as "M" | "F" | "O")}
            >
              <option value="">Select Gender</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>

          {/* Photo URL */}
          <div className="col-span-2">
            <label
              className="block text-[#F2C4CE] font-semibold mb-2"
              htmlFor="photoUrl"
            >
              Photo URL
            </label>
            <input
              className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58F7C]"
              type="text"
              id="photoUrl"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="Enter the URL of your profile photo"
            />
            {/* Image preview */}
            {photoUrl && (
              <div className="mt-10 flex justify-center">
                <img
                  src={photoUrl}
                  alt="Profile Preview"
                  className="w-32 h-32 rounded-full border border-[#F58F7C] object-cover"
                />
              </div>
            )}
          </div>

          <div className="col-span-2">
            <label
              className="block text-[#F2C4CE] font-semibold mb-2"
              htmlFor="about"
            >
              About
            </label>
            <textarea
              className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58F7C]"
              id="about"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder="Tell us about yourself"
            />
          </div>

          <div className="col-span-2">
            <label
              className="block text-[#F2C4CE] font-semibold mb-2"
              htmlFor="skills"
            >
              Skills
            </label>
            <div className="flex items-center">
              <input
                className="flex-1 px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58F7C]"
                type="text"
                id="skills"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
              />
              <button
                type="button"
                className="ml-3 px-4 py-2 bg-[#F58F7C] text-white rounded-lg hover:bg-[#D97363] transition"
                onClick={handleSkillAdd}
              >
                Add
              </button>
            </div>
            <div className="mt-3 space-y-2 space-x-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block bg-[#F58F7C] text-white px-3 py-1 rounded-full"
                >
                  {skill}
                  <button
                    type="button"
                    className="ml-2 text-sm text-gray-100 hover:text-gray-300"
                    onClick={() => handleSkillRemove(skill)}
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="col-span-2 flex items-center justify-between mt-4">
            <button
              className="px-6 py-2 bg-gradient-to-r from-[#F58F7C] to-[#E06E64] text-white font-semibold rounded-lg hover:shadow-lg transition"
              type="submit"
            >
              Update Profile
            </button>
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition"
              onClick={handlePasswordChange}
            >
              Change Password
            </button>
          </div>
        </form>

        <ToastContainer />
      </div>
    </div>
  );
};

export default EditProfile;
