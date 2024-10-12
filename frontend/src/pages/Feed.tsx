import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import MainNavBar from "../components/MainNavBar";
import { Local_Url } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { addFeed } from "../utils/feedSlice";
import { toast, ToastContainer } from "react-toastify";

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state: RootState) => state.feed);
  // console.log(document.cookie)


  const getFeed = async () => {
    try {
      const feed = await axios.get(`${Local_Url}/user/feed?page=1&limit=10`,{withCredentials:true});
      
      dispatch(addFeed(feed.data.data));
      
      // console.log(feed);
    } catch (error) {
      console.log(error);
    }
  };
  const sendRegqIn = async (id: string) => {
    try {
      await axios.post(`${Local_Url}/request/send/interested/${id}`);
      toast.success("Request sent successfully");
      console.log(document.cookie)
      
    } catch (error) {
      toast.warn("Cant send");
      console.log(document.cookie)

      console.log(error);
    }
  };
  const sendReqUnin = async (id: string) => {
    try {
      await axios.post(`${Local_Url}/request/send/uninterested/${id}`);
      toast.success("We got it you dont like them around");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  return (
    <div className="min-h-screen bg-[#2C2B30] text-[#D6D6D6]">
      {/* Navbar */}
      <MainNavBar />

      {/* Profile Cards */}
      <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {feed.map((profile) => (
          <div
            key={profile._id}
            className="relative group rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out h-[300px] w-full" // Fixed height for uniformity
          >
            {/* Full Image Background with Centering */}
            <div className="h-full w-full flex items-center justify-center">
              <img
                src={profile.photoUrl}
                alt={profile.userName}
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
            </div>

            {/* Gradient Fade & Text */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              <div className="absolute bottom-0 p-4 text-left">
                <h2 className="text-xl font-semibold text-[#F58F7C]">
                  {profile.userName}
                </h2>
                <p className="mt-1 text-[#D6D6D6]">{profile.about}</p>
              </div>
            </div>

            {/* Hover Icons */}
            <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              <div className="flex space-x-6">
                <FontAwesomeIcon
                  onClick={()=>sendRegqIn(profile._id)}
                  icon={faCheck}
                  className="text-4xl text-[#F58F7C] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
                />
                <FontAwesomeIcon
                  onClick={()=>sendReqUnin(profile._id)}
                  icon={faTimes}
                  className="text-4xl text-[#F2C4CE] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Feed;
