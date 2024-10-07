import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../utils/appStore";

const Dashboard: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log(user)
  
  return <div>Dashboard</div>;
};

export default Dashboard;
