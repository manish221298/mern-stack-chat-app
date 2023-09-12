const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const routes = require("./config/routes");

dotenv.config();
connectDB();

const Port = process.env.PORT;
app.use(cors());
app.use(express.json());
app.use("/", routes);

app.get("/", (req, res) => {
  res.send("api working fine and port running on 4001");
});

app.listen(Port, console.log("Server started on port ", Port));
