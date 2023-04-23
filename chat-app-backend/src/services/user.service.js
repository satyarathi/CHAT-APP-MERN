import User from '../models/user.model';
const bcrypt = require('bcrypt');
import jwt from 'jsonwebtoken';

//get all users
export const getAllUsers = async (req) => {
 
  const keyword = req.query.search
    ? {
        $or: [
          { fullname: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
    console.log(keyword);
    console.log(req.query);
  const data = await User.find(keyword).find({_id: {$ne: req.body.userId}})
  return data;
};
 
///Register new user
export const userRegister = async (body) => {
  const existingUser = await User.findOne({email : body.email});
  if(!existingUser)
  {
    const salt = await bcrypt.genSalt(10);
    body.password = await bcrypt.hash(body.password,salt);
    const data = await User.create(body);
    return data;
  }
  else{
    throw new Error('User Already Exist..');
  }
  
};

//Login User
export const userLogin = async (body) =>{
  try{
    const userData = await User.findOne({email: body.email});

    if(!userData){
      throw new Error("Invalid Email");
    }

    const validPassword = await bcrypt.compare(body.password, userData.password);

    if(!validPassword){
      throw new Error("Invalid Password");
    }

    let token = jwt.sign({ id : userData._id,},process.env.JWT_SECRET_KEY)
    return token;
  }
  catch(error){
    throw new Error(error);
  }
}