import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/hey", (req, res) => {
  res.send("Hello from!");
});
const port = 3000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
