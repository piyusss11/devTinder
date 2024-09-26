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
  console.log(req.body);

  const { firstName, lastName, age, emailId, password, gender } = req.body;
  try {
    const user = await User.create({
      firstName,
      lastName,
      age,
      emailId,
      password,
      gender,
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
    const users = await User.find({ emailId:emailId });
    if (users.length === 0) {
      res.status(400).send("no user found");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(400).send(`error finding the users",${error}`);
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

