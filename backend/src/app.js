const express = require("express");
const path = require("path");
const cors = require("cors");
const router = require("./router");

const app = express();
app.use(
  "/public",
  express.static(path.join(__dirname, "../../", "frontend/public"))
);
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  const filePath = path.join(__dirname, "../../", "frontend/index.html");
  return res.sendFile(filePath);
});

app.use(router);

module.exports = app;
