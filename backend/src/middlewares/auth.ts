import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import mongoose from "mongoose";
declare global {
  namespace Express {
    interface Request {
      user: IUser
    }
  }
}
export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //reading token
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).send("Token invalid, Please Login");
    }
    // verfying token
    const decoded = jwt.verify(token, "Piyush@123") as jwt.JwtPayload;
    const { _id } = decoded;
    // finding user
    const user = await User.findById(_id);
    if (!user) {
      return res.status(401).send("Invalid User. Please Login again");
    }
    // onto next function
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(`error getting the user",${error}`);
  }
};
