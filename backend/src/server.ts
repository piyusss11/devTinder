import express from "express";
import { connectDB } from "./config/database";
import User from "./models/User";

const app = express();

app.use(express.json());

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

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  const {
    firstName,
    userName,
    lastName,
    age,
    emailId,
    password,
    gender,
    photoUrl,
    about,
    skills,
  } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      userName,
      age,
      emailId,
      password,
      gender,
      photoUrl,
      about,
      skills,
    });
    await user.save();
    res.send("user created successfully");
  } catch (error) {
    res.status(400).send(`error creating the user",${error}`);
  }
});
app.get("/user", async (req, res) => {
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

app.patch("/user/:userId", async (req, res) => {
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
    if(data?.skills?.length > 10 ){
      throw new Error("Can have only 10 skills")
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
app.delete("/user", async (req, res) => {
  const id = req.body.id;
  try {
    const user = await User.findByIdAndDelete(id);
    res.send("user deleted successfully");
  } catch (error) {
    res.status(400).send(`error deleting the user",${error}`);
  }
});
app.get("/feed", async (req, res) => {
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
