import express, { Request, Response } from "express";
import { connectDB } from "./config/database";
import User from "./models/User";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profile";
import authRouter from "./routes/auth";
import requestRouter from "./routes/request";
import userRouter from "./routes/user";
const app = express();

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter)

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
  
