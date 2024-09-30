import express,{ Request, Response } from "express";
import { userAuth } from "../middlewares/auth";

const requestRouter = express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, (req: Request, res: Response) => {
    const { user } = req;
    console.log(user);
    res.send("connection request sent from" + user.firstName);
  });
export default requestRouter