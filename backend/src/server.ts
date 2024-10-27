import express from "express";
import { connectDB } from "./config/database";
import cookieParser from "cookie-parser";
import profileRouter from "./routes/profile";
import authRouter from "./routes/auth";
import requestRouter from "./routes/request";
import userRouter from "./routes/user";
import cors from "cors";
import dbUpdateRouter from "./routes/updateDb";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//routes
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", dbUpdateRouter);

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
