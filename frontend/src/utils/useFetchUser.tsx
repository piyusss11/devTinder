import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "./appStore";
import { addUser } from "./userSlice";

export const useFetchUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);

  const fetchUserData = async () => {
    // Only fetch user if there's no userData in the state
    if (userData?._id) return;

    try {
      const response = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data)); // Dispatch the user data to Redux store
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          navigate("/login"); // Redirect to login if unauthorized
        }
        console.log(error.response);
      } else {
        console.log("An unexpected error occurred:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData(); // Call the function to fetch user data
  }, []);
};
