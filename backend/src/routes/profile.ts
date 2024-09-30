import express, { Request,Response } from "express";
import { userAuth } from "../middlewares/auth";

const profileRouter = express.Router();

profileRouter.get("/profile", userAuth, async (req: Request, res: Response) => {
    // console.log(req.cookies)
    try {
      const { user } = req;
      res.send(user);
      // res.send("sending cookies");
    } catch (error) {
      res.status(400).send(`error getting the user",${error}`);
    }
  });
export default profileRouter