import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./utils/appStore";
import { Local_Url } from "./utils/constants";
import { useEffect } from "react";
import { addUser } from "./utils/userSlice";
import { Toaster } from "./components/ui/toaster";
import Body from "./pages/Body";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Feed from "./pages/Feed";
import EditProfile from "./pages/EditProfile";
import MainLayout from "./components/Layout/MainLayout";
import PublicLayout from "./components/Layout/PublicLayout";
import axios from "axios";
import Profile from "./pages/Profile";
import TogglePage from "./pages/TogglePage";

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  console.log(!(document.cookie))
  const isUserPresent = user._id.length > 0 || document.cookie.includes("token");


  const fetchUser = async () => {
    if (user._id.length > 1) return;
    try {
      const response = await axios.get(`${Local_Url}/profile/view`, {
        withCredentials: true,
      });
     
      console.log("user",response.data)
      
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
  }, [user]);
  
  // console.log(isUserPresent);

  return (
    <BrowserRouter basename="/">
<Toaster/>
      <Routes>
        {/* Authenticated routes */}
        {isUserPresent ? (
          <Route path="/" element={<MainLayout /> }>
            <Route index element={<Feed />} />
            <Route path="profile" element={<Profile />} />
            <Route path="profile/edit" element={<EditProfile />} />
            <Route path="connections" element={<TogglePage />} />
            <Route path={"login"} element={<Navigate to="/" replace />} />
            <Route path={"signup"} element={<Navigate to="/" replace />} />
          </Route>
        ) : (
          // Public routes
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Body />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
          </Route>
        )}

        {/* Fallback route */}
        {!isUserPresent && (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </BrowserRouter>


  );
}

export default App;
