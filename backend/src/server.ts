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
