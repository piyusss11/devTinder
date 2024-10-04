import express, { Request, Response } from "express";
import ConnectionRequest from "../models/ConnectionRequest";
import { userAuth } from "../middlewares/auth";
import User, { IUser } from "../models/User";
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

userRouter.get("/user/feed", userAuth, async (req: Request, res: Response) => {
  try {
    // i want to see the user except
    // myself
    // people who have sent me a request or i have sent a request to them
    // my connections
    const loggedInUser = req.user;
    const page = parseInt(req.query.page as string) || 1;
    let limit = parseInt(req.query.limit as string) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    const requests = await ConnectionRequest.find({
      $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
    }).select("toUserId fromUserId");

    const hiddenUsers = new Set();
    requests.forEach((request) => {
      hiddenUsers.add(request.toUserId.toString());
      hiddenUsers.add(request.fromUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hiddenUsers) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(safeDataToPass)
      .skip(skip)
      .limit(limit);
    // console.log(skip,req.query.page)
    // console.log(limit,req.query.limit)
    
    res.json({ message: "user feed fetched successfully", data: users });
  } catch (error) {
    res.status(400).send(`error finding the users",${error}`);
  }
});

export default userRouter;
