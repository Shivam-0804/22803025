const express=require('express');
const {register,login}= require("../controllers/authController");

const UserRoute=express();

UserRoute.post("/register",register);
UserRoute.post("/login",login);

module.exports=UserRoute;