import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { Local_Url } from "../utils/constants";
import axios from "axios";
import { useEffect } from "react";
import { setConnections } from "../utils/connectionsSlice";
import ConnectionCards from "./ConnectionCards";

const Connections = () => {
  const connections = useSelector((state: RootState) => state.connections);
  const dispatch = useDispatch();
  const getConnecttions = async () => {
    const response = await axios.get(`${Local_Url}/user/matches`, {
      withCredentials: true,
    });
    dispatch(setConnections(response.data.data));
    console.log(response.data.data);
  };
  useEffect(() => {
    getConnecttions();
  }, []);
  return (
    <div className="p-6 bg-[#3A3A3F] rounded-lg justify-center flex flex-wrap gap-4">
      {connections.length > 0 ? (
        connections.map((user) => <ConnectionCards key={user._id} {...user} />)
      ) : (
        <div>No connections found</div>
      )}
    </div>
  );
};

export default Connections;
