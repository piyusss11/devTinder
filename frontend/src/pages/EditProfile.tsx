import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { Local_Url } from "../utils/constants";
import { useToast } from "@/hooks/use-toast";
import MainNavBar from "../components/MainNavBar";
import ProfileCard from "../components/ProfileCard";
import ChangePasswordPopUp from "../components/ChangePasswordPopUp";
import { motion } from "framer-motion";

const EditProfile: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [userName, setUserName] = useState(user.userName);
  const [age, setAge] = useState<number | undefined>(user.age);
  const [gender, setGender] = useState<"M" | "F" | "O" | "">("M");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState<string[]>(user.skills);
  const [newSkill, setNewSkill] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${Local_Url}/profile/edit`,
        {
          firstName,
          lastName,
          userName,
          age,
          gender,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );

      toast({ description: "Profile updated successfully." });

      setTimeout(() => {
        navigate("/"); // Redirect to profile view page
        document.location.reload();
      }, 3000);
    } catch (error) {
      console.error("Profile update failed:", error);
      toast({
        description: "Profile update failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSkillAdd = () => {
    if (newSkill && !skills.includes(newSkill)) {
      if (skills.length < 10) {
        setSkills([...skills, newSkill]);
        setNewSkill("");
      } else {
        toast({
          description: "You can only add up to 10 skills.",
        });
      }
    }
  };

  const handleSkillRemove = (skill: string) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1F1E24]">
      {/* Main NavBar */}
      <MainNavBar />

      {/* Page Content */}
      <div className="flex flex-col md:flex-row mt-10 max-w-7xl mx-auto w-full gap-10">
        {/* Left Column: Edit Profile Form */}
        <motion.div
          className="bg-[#3A3A3F] bg-opacity-90 p-10 rounded-lg shadow-2xl w-full md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-[#F58F7C] mb-6">
            Edit Profile
          </h2>
          <form
            onSubmit={handleProfileUpdate}
            className="grid grid-cols-1 gap-6"
          >
            {[
              { label: "First Name", value: firstName, setValue: setFirstName, type: "text", id: "firstName" },
              { label: "Last Name", value: lastName, setValue: setLastName, type: "text", id: "lastName" },
              { label: "User Name", value: userName, setValue: setUserName, type: "text", id: "userName", required: true },
              { label: "Age", value: age || "", setValue: setAge, type: "number", id: "age" },
            ].map(({ label, value, setValue, type, id, required }) => (
              <div key={id}>
                <label className="block text-[#F2C4CE] font-semibold mb-2" htmlFor={id}>
                  {label}
                </label>
                <motion.input
                  className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none"
                  type={type}
                  id={id}
                  value={value}
                  onChange={(e) => setValue(type === 'number' ? Number(e.target.value) : e.target.value)}
                  required={required}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            ))}
            
            <div>
              <label className="block text-[#F2C4CE] font-semibold mb-2" htmlFor="gender">
                Gender
              </label>
              <motion.select
                className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none"
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value as "M" | "F" | "O")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
              </motion.select>
            </div>

            <div className="col-span-2">
              <label className="block text-[#F2C4CE] font-semibold mb-2" htmlFor="photoUrl">
                Photo URL
              </label>
              <motion.input
                className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none"
                type="text"
                id="photoUrl"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              {photoUrl && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={photoUrl}
                    alt="Profile Preview"
                    className="w-32 h-32 rounded-full border border-[#F58F7C] object-cover"
                  />
                </div>
              )}
            </div>

            <div className="col-span-2">
              <label className="block text-[#F2C4CE] font-semibold mb-2" htmlFor="about">
                About
              </label>
              <motion.textarea
                className="w-full px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none"
                id="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="col-span-2">
              <label className="block text-[#F2C4CE] font-semibold mb-2" htmlFor="skills">
                Skills
              </label>
              <div className="flex items-center">
                <motion.input
                  className="flex-1 px-3 py-2 text-[#1F1E24] border border-[#F58F7C] rounded-lg focus:outline-none"
                  type="text"
                  id="skills"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                <motion.button
                  type="button"
                  className="ml-3 px-4 py-2 bg-[#F58F7C] text-white rounded-lg"
                  onClick={handleSkillAdd}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  Add
                </motion.button>
              </div>
              <div className="mt-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-block bg-[#F58F7C] text-white px-3 py-1 rounded-full mr-2 mb-2"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-sm text-gray-100"
                      onClick={() => handleSkillRemove(skill)}
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="col-span-2 flex items-center justify-between mt-4">
              <motion.button
                className="px-6 py-2 bg-gradient-to-r from-[#F58F7C] to-[#E06E64] text-white font-semibold rounded-lg"
                type="submit"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Update Profile
              </motion.button>

              <ChangePasswordPopUp />
            </div>
          </form>
        </motion.div>
        {/* Right Column: Profile Card */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ProfileCard
            _id={user._id}
            userName={userName}
            photoUrl={photoUrl}
            about={about}
            age={age}
            gender={gender}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default EditProfile;
