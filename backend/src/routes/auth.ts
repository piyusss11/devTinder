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
    const {
      firstName,
      userName,
      lastName,
      emailId,
      password,
      photoUrl,
      age,

      gender,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      userName,
      emailId,
      password: hashedPassword,
      photoUrl,
      age,
    
      gender,
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
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        // secure: process.env.NODE_ENV === "production", // Ensure only on HTTPS
        sameSite: "none", // Allow cross-site requests
        maxAge: 24 * 60 * 60 * 1000, // 1 day expiration
        path: "/",
      });
      const cookies = res.get("Set-Cookie");
      console.log("Response Cookies:", cookies);

      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send(`error loggining the user, ${error}`);
  }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
  // res.cookie("token","",{
  //   httpOnly:true,
  //   sameSite:"none",
  //   secure:false,
  //   path:"/",
  //   expires:new Date(0)
  // })
  res.clearCookie("token", {
    path: "/",
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
  const cookies = res.get("Set-Cookie"); // Get the "Set-Cookie" headers
  console.log("Response Cookies:", cookies);

  // redirect to login or register page
  res.send("user logged out successfully");
});

export default authRouter;
