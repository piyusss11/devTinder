import express, { Request, Response } from "express";
import User from "../models/User";
const dbUpdateRouter = express.Router();

dbUpdateRouter.patch("/updateDb", async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      $or: [
        {
          age: { $exists: false },
        },
        {
          gender: "",
        },
        {
          about: "",
        },
      ],
    });
    const updateUserPromises = users.map(async (user) => {
      const updatedUser = user.toObject();
      if (updatedUser.age === undefined) {
        updatedUser.age = 0;
      }

      updatedUser.gender = "M";

      if (updatedUser.about === "") {
        updatedUser.about = `Hi guys I'm ${updatedUser.firstName} nice to meet you.`;
      }
      await User.updateOne({ _id: user._id }, updatedUser);
    });
    const updatedUser = await Promise.all(updateUserPromises);
    res.status(200).send({
      message: "All users have been updated with default values.",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).send(`error updating the database,${error}`);
  }
});
export default dbUpdateRouter;
