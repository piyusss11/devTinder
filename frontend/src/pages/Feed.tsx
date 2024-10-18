import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faGenderless,
  faMars,
  faTimes,
  faVenus,
} from "@fortawesome/free-solid-svg-icons";
import { Local_Url } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { addFeed } from "../utils/feedSlice";
import { useToast } from "@/hooks/use-toast";
import MainNavBar from "../components/MainNavBar";
import SkeletonPage from "@/components/SkeletonPage";

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state: RootState) => state.feed);
  // console.log(document.cookie)
  const { toast } = useToast();
  const getFeed = async () => {
    if (feed.length > 0) return;
    try {
      const feed = await axios.get(`${Local_Url}/user/feed?page=1&limit=20`, {
        withCredentials: true,
      });

      dispatch(addFeed(feed.data.data));

      // console.log(feed);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReq = async (statusOfReq: string, id: string) => {
    try {
      await axios.post(
        `${Local_Url}/request/send/${statusOfReq}/${id}`,
        {},
        { withCredentials: true }
      );
      if (statusOfReq === "interested") {
        toast({ description: "Request sent successfully" });
      }
      if (statusOfReq === "uninterested") {
        toast({ description: "User Rejected succesfully" });
      }
    } catch (error) {
      toast({ description: "Cant send",title:"Error" ,variant: "destructive" });

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
      {feed.length === 0 ? (
        <div className="p-8">
          <SkeletonPage />
        </div>
      ) : (
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
                  <h2 className="text-xl font-semibold text-[#F58F7C] gap-1 flex items-center ">
                    {profile.userName}{" "}
                    {profile.gender === "M" ? (
                      <FontAwesomeIcon
                        icon={faMars}
                        className="text-blue-500"
                      />
                    ) : profile.gender === "F" ? (
                      <FontAwesomeIcon
                        icon={faVenus}
                        className="text-pink-500"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faGenderless}
                        className="text-gray-500"
                      />
                    )}
                  </h2>
                  <h1>{profile.age}</h1>
                  <p className="mt-1 text-[#D6D6D6] overflow-hidden max-h-12 ">
                    {profile.about}
                  </p>
                </div>
              </div>

              {/* Hover Icons */}
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <div className="flex space-x-6">
                  <FontAwesomeIcon
                    onClick={() => handleReq("interested", profile._id)}
                    icon={faCheck}
                    className="text-4xl text-[#F58F7C] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
                  />
                  <FontAwesomeIcon
                    onClick={() => handleReq("uninterested", profile._id)}
                    icon={faTimes}
                    className="text-4xl text-[#F2C4CE] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feed;
