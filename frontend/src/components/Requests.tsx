import axios from "axios";
import { Local_Url } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../utils/appStore";
import { addRequests } from "../utils/requestSlice";

import RequestCards from "./RequestCards";
import { useToast } from "@/hooks/use-toast";

const Requests = () => {
  const requests = useSelector((store: RootState) => store.requests);
  const dispatch = useDispatch();
  const { toast } = useToast();

  const reviewRequest = async (status: string, id: string) => {
    try {
      await axios.post(
        `${Local_Url}/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      if (status === "accepted") {
        toast({ description: "Request accepted successfully" });
      }
      if (status === "rejected") {
        toast({ description: "Request rejected successfully" });
      }
    } catch (error) {
      toast({ description: "Cant review request" });
      console.log(error);
    }
  };
  const getRequests = async () => {
    try {
      const response = await axios.get(`${Local_Url}/user/request/interested`, {
        withCredentials: true,
      });
      dispatch(addRequests(response.data.data));
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getRequests();
  }, []);
  return (
    <div className="p-6 bg-[#3A3A3F] rounded-lg justify-center flex gap-4 flex-wrap">
      {requests.length > 0 ? (
        requests.map((request) => (
          <RequestCards
            key={request._id}
            _id={request._id}
            profile={request.fromUserId}
            handleReq={reviewRequest}
          />
        ))
      ) : (
        <p>No requests available</p>
      )}
    </div>
  );
};

export default Requests;
