import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BgImg from "../components/BgImg";
import { useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { RootState } from "../utils/appStore";
import { useSelector } from "react-redux";
import axios from "axios";
// import { addUser } from "../utils/userSlice";
import { Local_Url } from "../utils/constants";
const Body: React.FC = () => {
  const location = useLocation();
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  // console.log(document.cookie)
 

  return (
    <>
      <Navbar />
      <BgImg />
    </>
  );
};

export default Body;
