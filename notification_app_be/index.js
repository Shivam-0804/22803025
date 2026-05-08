const express = require("express");
const { Log } = require("../logging_middleware/logger");
const cors=require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const TOKEN = process.env.TOKEN;

app.get("/log", async (req, res) => {
  await Log(
    "backend",
    "info",
    "route",
    "Home route accessed",
    TOKEN
  );

  res.send("Working");
});

const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log("Server started... ");
})
