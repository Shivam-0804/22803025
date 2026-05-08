const express = require("express");
const { Log } = require("../logging_middleware/logger");
const connectDb = require("./config/db");
const cors = require("cors");

const userRoute= require("./routes/userRoute");
const notRoute=require("./routes/notificationRoute");
const logRoute=require("./routes/logRoute");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = process.env.TOKEN;

app.use("/auth",userRoute);
app.use("/notification", notRoute);
app.use("/log",logRoute);

connectDb();
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server started... ");
});
