import express, { Request, Response } from "express";
import { connectDB } from "./config/database";
import User from "./models/User";
import { validateSignUpData } from "./utils/validation";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import { userAuth } from "./middlewares/auth";
const app = express();

app.use(express.json());
app.use(cookieParser());

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

app.post("/signup", async (req:Request, res:Response) => {
  // console.log(req.body);

  try {
    validateSignUpData(req);
    const { firstName, userName, lastName, emailId, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName,
      lastName,
      userName,
      emailId,
      password: hashedPassword,
    });
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send(`error creating the user",${error}`);
  }
});

app.post("/login", async (req:Request, res:Response) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      // creating a cookie with jwt
      const token = jwt.sign({ _id: user._id }, "Piyush@123");
      // sending token in cookie
      res.cookie("token", token);
      res.send("user logged in successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.status(400).send(`error loggining the user",${error}`);
  }
});

app.get("/profile",userAuth, async (req:Request, res:Response) => {
  // console.log(req.cookies)
  try {
    res.send("/profile");
    // res.send("sending cookies");
  } catch (error) {
    res.status(400).send(`error getting the user",${error}`);
  }
});
app.get("/user", async (req:Request, res:Response) => {
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

app.patch("/user/:userId", async (req:Request, res:Response) => {
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
app.delete("/user", async (req:Request, res:Response) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send(`error deleting the user",${error}`);
  }
});
app.get("/feed", async (req:Request, res) => {
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
