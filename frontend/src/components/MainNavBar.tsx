import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import logo from "../assets/logo.png";
import { Local_Url } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";
import { useToast } from "@/hooks/use-toast";

const MainNavBar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const userImage = user.photoUrl || "https://your-default-image-url.com";
  const dispatch = useDispatch();
  const {toast} = useToast()
  // console.log(document.cookie)
  const logout = async () => {
    try {
      await axios.post(`${Local_Url}/logout`, {}, { withCredentials: true });
      // console.log(response.headers.get("Set-Cookie"));
      toast({description: "Logout successful",})
      dispatch(removeUser());
    } catch (error) {
      toast({description: "Logout failed, Try again",})
      console.log(error);
    }
  };

  return (
    <nav className="relative bg-[#F58F7C]">
      <div className="container mx-auto flex justify-between items-center py-2 px-10">
        {/* Brand Logo or Home Link */}

        <Link to="/">
          <img className="w-10 " src={logo} alt="" />
        </Link>

        {/* Navigation Links and User Info */}
        <div className="flex items-center space-x-6">
          <Link to="/connections" className="text-white">
            Connections
          </Link>
          <span className="text-white hidden md:block">
            Welcome, <span className="text-[#2C2B30]">{user.firstName}</span>
          </span>

          {/* Profile Dropdown Menu */}
          <div className="relative">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="flex items-center space-x-2">
                  {/* Profile Dropdown Text and Down Arrow */}
                  <span className="text-white">Profile</span>
                  <ChevronDownIcon
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                  />
                </MenuButton>
              </div>

              <MenuItems className="absolute z-10 right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1">
                  {/* Dropdown Items */}
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile"
                        className={`${
                          active ? "bg-[#F58F7C] text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/profile/edit"
                        className={`${
                          active ? "bg-[#F58F7C] text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Edit Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`${
                          active ? "bg-[#F58F7C] text-white" : "text-gray-900"
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                      >
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </MenuItems>
            </Menu>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
            <img
              src={userImage}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavBar;
