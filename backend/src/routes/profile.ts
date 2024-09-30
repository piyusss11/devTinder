import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userAuth } from "../middlewares/auth";
import validator from "validator";
import User from "../models/User";
import { validateEditProfileData } from "../utils/validation";

const profileRouter = express.Router();

profileRouter.get(
  "/profile/view",
  userAuth,
  async (req: Request, res: Response) => {
    // console.log(req.cookies)
    try {
      const { user } = req;
      res.send(user);
      // res.send("sending cookies");
    } catch (error) {
      res.status(400).send(`error getting the user",${error}`);
    }
  }
);

profileRouter.patch(
  "/profile/edit",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const data = req.body;
      const { _id } = req?.user;
      const isUpdateAllowed = validateEditProfileData(req); // validated the data which can be edited by the user

      if (!isUpdateAllowed) {
        throw new Error("update not allowed");
      }
      if (data?.skills?.length > 10) {
        throw new Error("Can have only 10 skills");
      }
      // updating the user info
      const user = await User.findByIdAndUpdate(_id, data, {
        runValidators: true,
      });
      res.json({ messgae: "user updated successfully", data: user });
    } catch (error) {
      res.status(400).send(`error updating the user",${error}`);
    }
  }
);

profileRouter.patch(
  "/profile/editPassword",
  userAuth,
  async (req: Request, res: Response) => {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;
      const { user } = req;
      const isOldTrue = await bcrypt.compare(oldPassword, user.password);

      if (!isOldTrue) {
        throw new Error("old password is not correct"); // check for old password
      }
      if (!validator.isStrongPassword(newPassword)) {
        throw new Error("new password is not strong enough"); // check to make sure new password is strong
      }
      if (newPassword !== confirmPassword) {
        throw new Error("new password and confirm password should be same"); // check if new password and confirm password are same
      }
      const hashedPassword = await bcrypt.hash(newPassword, 10); // hashing the new password

      const newUser = await User.findByIdAndUpdate(user._id, {
        password: hashedPassword, // storing the new password in db and updating the user
      })
      // i can logout the user and redirect to login to try new pass 
      res.send("password updated successfully");
    } catch (error) {
      res.status(400).send(`error updating the password",${error}`);
    }
  }
);
export default profileRouter;
