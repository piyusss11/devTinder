import express, { Request, Response } from "express";
import ConnectionRequest from "../models/ConnectionRequest";
import { userAuth } from "../middlewares/auth";
import { IUser } from "../models/User";
const userRouter = express.Router();

const safeDataToPass =
  "firstName lastName userName photoUrl age gender about skills";

userRouter.get(
  "/user/request/interested",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const loggedInUser = req.user;
      const userRequests = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", safeDataToPass);
      if (!userRequests) {
        throw new Error("No requests found");
      }
      res.json({
        message: "Requests fetched successfully",
        data: userRequests,
      });
    } catch (error) {
      res.status(400).send(`error getting the userRequests",${error}`);
    }
  }
);

userRouter.get(
  "/user/matches",
  userAuth,
  async (req: Request, res: Response) => {
    try {
    
      const loggedInUser = req.user;

      // Fetch the user matches where the logged-in user is either the sender or the recipient of an accepted connection request
      const userMatches = await ConnectionRequest.find({
        $or: [
          { fromUserId: loggedInUser._id, status: "accepted" },
          { toUserId: loggedInUser._id, status: "accepted" },
        ],
      })
        .populate("fromUserId", safeDataToPass)
        .populate("toUserId", safeDataToPass);

      // Handle case where no matches are found
      if (!userMatches || userMatches.length === 0) {
        return res.status(404).json({ message: "No matches found" });
      }

      // Mapping through the matches and identifying the matched user
      const newUserMatchesData = userMatches.map((dataOf) => {
        const fromUser = dataOf.fromUserId as IUser;
        const toUser = dataOf.toUserId as IUser;
        if (fromUser._id.toString() === loggedInUser._id.toString()) {
          return toUser; // If logged-in user is the sender, return the recipient
        }
        return fromUser;
      });

      // Send the response with the matched users
      res.json({
        message: "Matches fetched successfully",
        data: newUserMatchesData,
      });
    } catch (error) {
      // Catch all other errors and return a 400 status code
      res.status(400).send(`Error fetching user matches: ${error}`);
    }
  }
);

export default userRouter;
