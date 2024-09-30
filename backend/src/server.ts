import express, { Request, Response } from "express";
import { connectDB } from "./config/database";
import User from "./models/User";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profile";
import authRouter from "./routes/auth";
import requestRouter from "./routes/request";
const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);

const port = 3000;
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
  
  // extra routes 
app.get("/user", async (req: Request, res: Response) => {
  const { emailId } = req.body;
  try {
    const users = await User.find({ emailId: emailId });
    if (users.length === 0) {
      res.status(400).send("no user found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send(`error finding the users",${error}`);
  }
});

app.patch("/user/:userId", async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params?.userId;
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "userName",
      "age",
      "password",
      "gender",
      "photoUrl",
      "about",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills?.length > 10) {
      throw new Error("Can have only 10 skills");
    }
    const user = await User.findByIdAndUpdate(id, data, {
      returnDocument: "before",
      runValidators: true,
    });
    res.send("user updated successfully");
    console.log(user);
  } catch (error) {
    res.status(400).send(`error updating the user",${error}`);
  }
});
app.delete("/user", async (req: Request, res: Response) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send(`error deleting the user",${error}`);
  }
});
app.get("/feed", async (req: Request, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(400).send("no user found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send(`error finding the users",${error}`);
  }
});
