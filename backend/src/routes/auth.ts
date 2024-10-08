import express from "express";
import { validateSignUpData } from "../utils/validation";
import User from "../models/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

const authRouter = express.Router();
authRouter.post("/signup", async (req: Request, res: Response) => {
  // console.log(req.body);

  try {
    validateSignUpData(req);
    const { firstName, userName, lastName, emailId, password, photoUrl } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      userName,
      emailId,
      password: hashedPassword,
      photoUrl,
    });
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send(`error creating the user",${error}`);
  }
});
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      // creating a cookie with jwt
      const token = user.getJWT();
      // sending token in cookie
      res.cookie("token", token);
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send(`error loggining the user, ${error}`);
  }
});

authRouter.post("/logout", (req: Request, res: Response) => {
  res.clearCookie("token"); // redirect to login or register page
  res.send("user logged out successfully");
})

export default authRouter;
