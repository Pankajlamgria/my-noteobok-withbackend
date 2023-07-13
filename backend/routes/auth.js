const express = require("express");
const usersdatabase = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser");
const router = express.Router();

// this is to create new user End point
const JWT_SECRET = "PANAKJ";
router.post("/createuser", async (req, res) => {
  let success=false;
  const data = req.body;
  if (data.name == "") {
    res.json({success, error: "Please Enter the valid name" });
  } else if (data.email == "") {
    res.json({success, error: "Please Enter the valid Email" });
  } else if (data.password.length <= 3) {
    res.json({success, error: "Please Enter the strong password" });
  } else {
    let newuser = await usersdatabase.findOne({ email: req.body.email });
    if (newuser) {
      return res.status(400).json({success, error: "this email already exist" });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const secpaswd = await bcrypt.hash(req.body.password, salt);
      console.log(secpaswd);
      // to create the schema data use await
      newuser = await usersdatabase.create({
        name: req.body.name,
        password: secpaswd,
        email: req.body.email,
      });
      // res.json(newuser);
      const tokendata = {
        user:{
          id: newuser.id}
      };
      const authtoken = jwt.sign(tokendata, JWT_SECRET);
      success=true;
      res.json({success, authtoken });
    } catch (error) {
      console.log(error);
      res.status(400).json({success, error: error.message });
    }
  }
});
// this is for login endpoint
router.post("/login", async (req, res) => {
  let success=false;
  const data = req.body;
  if (data.email == "") {
    return res.json({success, error: "Please Enter the valid Email" });
  } 
  else if (data.password.length <= 3) {
    res.json({success, error: "Please Enter the valid password" });
  }
  try {
    const { email, password } = req.body;
    // use await because findOne returns promise and it takes time to find the data
    let user = await usersdatabase.findOne({ email: email });
    if (!user) {
      res.json({success, error: "Please enter the correct credentials" });
    } else {
      // console.log(user);
      let check = await bcrypt.compare(password, user.password);
      if (!check) {
        // res.status(400).json({ error: "Please enter the correct credentials" });
        res.json({success, error: "Please enter the correct password" });
      }
      else{
        const tokendata = {
          user:{
          id: user.id,
          }
        };
        const authtoken = jwt.sign(tokendata, JWT_SECRET);
        success=true;
        res.json({success, authtoken });

      }

    }
  } catch (error) {
    res.status(400).json({success, error: error.message });
  }
});

// to get the logged in user details with end point of getuser
router.post("/getuser",fetchuser, async (req, res) => {
  let success=true;
  try{
    let userid=req.userdetail.id;
    let userdetails=await usersdatabase.findById(userid).select("-password");
    res.json({success, userdetails}); 
  }
  catch(err){
    console.log(err);
    return res.status(401).json({success,error:err})
  }

});



module.exports = router;
