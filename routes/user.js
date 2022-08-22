const express=require("express");
const router=express.Router();
const {Getuser, CreateUser}=require("../controller/user");

router.get("/create", Getuser);
router.post("/create", CreateUser);

module.exports=router;