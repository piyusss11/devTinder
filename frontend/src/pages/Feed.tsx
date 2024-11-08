import React, { useEffect, useState } from "react";
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
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import ViewProfilePopUp from "@/components/ViewProfilePopUp";
import PaginationForFeed from "@/components/PaginationForFeed";
import { FiltersDialog } from "@/components/FiltersDialog";
import { motion } from "framer-motion";

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state: RootState) => state.feed);
  const { toast } = useToast();

  // State to track refresh
  const [refreshFeed, setRefreshFeed] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const limit = 6;
  const [gender, setGender] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [minAge, setMinAge] = useState<null | number>(null);
  const [maxAge, setMaxAge] = useState<null | number>(null);
  const [animatedId, setAnimatedId] = useState<string | null>(null);
  const [animationDirection, setAnimationDirection] = useState<
    "left" | "right" | null
  >(null);

  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePreviousPage = () => setPage((prev) => Math.max(prev - 1, 1));

  const handleFilters = (
    gender: string,
    skills: string,
    minAge: null | number,
    maxAge: null | number
  ) => {
    setGender(gender);
    setSkills(skills);
    setMinAge(minAge);
    setMaxAge(maxAge);
  };

  const getFeed = async () => {
    try {
      const feedResponse = await axios.get(
        `${Local_Url}/user/feed?page=${page}&limit=${limit}&gender=${gender}&skills=${skills}&minAge=${minAge}&maxAge=${maxAge}`,
        {
          withCredentials: true,
        }
      );
      dispatch(addFeed(feedResponse.data.data));
      setRefreshFeed(false);
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
        setAnimationDirection("right");
      } else if (statusOfReq === "uninterested") {
        toast({ description: "User Rejected successfully" });
        setAnimationDirection("left");
      }

      setAnimatedId(id);
      setRefreshFeed(true);

      // Reset animation state after 0.5s (animation duration)
      setTimeout(() => {
        setAnimatedId(null);
        setAnimationDirection(null);
      }, 5000);
    } catch (error) {
      toast({
        description: "Can't send request",
        title: "Error",
        variant: "destructive",
      });
      console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, [page, refreshFeed, gender, skills, minAge, maxAge]);

  return (
    <div className="min-h-screen bg-[#2C2B30] text-[#D6D6D6]">
      <MainNavBar />
      {feed.length === 0 ? (
        <div className="p-8">
          <SkeletonPage />
        </div>
      ) : (
        <div>
          <FiltersDialog onFilters={handleFilters} />
          <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {feed.map((profile) => (
              <Dialog key={profile._id}>
                <DialogTrigger>
                  <motion.div
                    className={`relative group rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out h-[300px] w-full`}
                    initial={{ opacity: 1 }}
                    animate={{
                      x:
                        animatedId === profile._id
                          ? animationDirection === "right"
                            ? 100
                            : -100
                          : 0,
                      opacity: animatedId === profile._id ? 0 : 1,
                      backgroundColor:
                        animatedId === profile._id
                          ? animationDirection === "right"
                            ? "rgba(76, 175, 80, 0.5)"
                            : "rgba(244, 67, 54, 0.5)"
                          : "transparent",
                    }}
                    transition={{ duration: 0.5 }}
                  >
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

                    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                      <div className="flex space-x-6">
                        <FontAwesomeIcon
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the dialog from opening
                            handleReq("interested", profile._id);
                          }}
                          icon={faCheck}
                          className="text-4xl text-[#F58F7C] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
                        />
                        <FontAwesomeIcon
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent the dialog from opening
                            handleReq("uninterested", profile._id);
                          }}
                          icon={faTimes}
                          className="text-4xl text-[#F2C4CE] hover:scale-110 transition-transform duration-200 ease-in-out cursor-pointer"
                        />
                      </div>
                    </div>
                  </motion.div>
                  <ViewProfilePopUp
                    info={profile}
                    onInterested={() => handleReq("interested", profile._id)}
                    onUnInterested={() =>
                      handleReq("uninterested", profile._id)
                    }
                  />
                </DialogTrigger>
              </Dialog>
            ))}
          </div>
        </div>
      )}
      <PaginationForFeed
        page={page}
        onNext={handleNextPage}
        onPrevious={handlePreviousPage}
      />
    </div>
  );
};

export default Feed;
