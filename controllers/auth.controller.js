const User = require("../models/User"); //jbna schema
const bcrypt = require("bcrypt"); // jbna bcrypt bach nhachiw pass
const jwt = require("jsonwebtoken");

//--------------------register-------------------//
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;//bayant jaya mn postman
    // check if user exists
    const UserExit = await User.findOne({ email })
    if (UserExit){
      return res.status(400).json({message: "User already exists"});
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);//10 salt round
    // create user
    const user = await User.create({name,email,password: hashedPassword,})//khazno user f mongodb
    // response
    res.status(201).json({message: "User registred successfully", user,})
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
//--------------------login-------------------//
const login = async (req, res) =>{
  try {
    const {email, password} = req.body;
    //chek user 
    const user = await User.findOne({email});
    if (!user) {
      return res.status(400).json({message:"Invalid email"})
    }
    //check password
    const ismatch = await bcrypt.compare(password, user.password);
    if (ismatch) {
      return res.status(400).json({ message: "Invalid password"});
    }
    //cretae token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
    //response
    res.json({message: "Login successful", token, });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
module.exports = {register, login};