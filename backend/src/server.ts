import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/user/:userId/:name", (req, res) => {
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
