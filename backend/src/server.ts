import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/admin", (req, res, next) => {
  console.log("checking for admin");
  const token = "12345";
  const isAdmin = token === "12345";
  if (!isAdmin) {
    res.status(403).send("forbidden");
  } else {
    next();
  }
});

app.get("/admin/alldata", (req, res) => {
  res.send("all data");
});

app.get("/admin/deletedata", (req, res) => {
  res.send("deleted data");
});
app.all("/user/:userId/:name", (req, res) => {
  const id = req.params.userId;
  const name = req.params.name;
  res.send({
    userName: "Piyuss",
    id: id,
    name: name,
    age: 23,
  });
});

app.post("/user", (req, res) => {
  res.send("data stored in db");
});
const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
