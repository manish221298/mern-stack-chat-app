const express = require("express");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const Port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("api working fine and port running on 4001");
});

app.listen(Port, console.log("Server started on port ", Port));
