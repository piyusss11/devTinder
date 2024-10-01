import express, { Request, Response } from "express";
import { userAuth } from "../middlewares/auth";
import ConnectionRequest from "../models/ConnectionRequest";
import User from "../models/User";

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const { status, toUserId } = req.params;
      const fromUserId = req.user._id;
      const allowedStatus = ["interested", "uninterested"];

      // checking if status is valid
      if (!allowedStatus.includes(status)) {
        throw new Error(`${status} is an invalid status`);
      }

      // checking if toUser exist in our db
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        throw new Error("Request cant be sent to a non existing user");
      }
      // checking for existing request or if toUser has already sent to fromUser

      const inValidRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (inValidRequest) {
        throw new Error("Request already sent");
      }
      // creating a new request in our db
      const request = await ConnectionRequest.create({
        fromUserId,
        toUserId,
        status,
      });

      res.json({
        message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
        request,
      });
    } catch (error) {
      res.status(400).send(`error getting the user,${error}`);
    }
  }
);
export default requestRouter;
