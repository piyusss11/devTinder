import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BgImg from "../components/BgImg";
import { Outlet, useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { RootState } from "../utils/appStore";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
const Body: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);

  const fetchUser = async () => {
    if (userData._id.length > 1) return;
    try {
      const response = await axios.get("http://localhost:3000/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.status === 401) {
          // navigate("/login");
        }
        console.log(error.response);
      } else {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      {location.pathname === "/" ? (
        <>
          <Navbar />
          <BgImg />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Body;
