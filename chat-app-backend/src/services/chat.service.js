import User from '../models/user.model';
const bcrypt = require('bcrypt');
import Chat from "../models/chat.model";

//@description     Create or fetch One to One Chat
//@route           POST /api/chat/
//@access          Protected

export const accessChat = async (req, res) => {
    const userId = req.body.userId;
    console.log("sender ", req.body.user," receiver", req.body.userId)
  
    if (!userId) {
      throw new Error("UserId param not sent with request");   
    }
  
    var isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.body.user } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "fullname pic email",
    });
  
    if (isChat.length > 0) {
      return (isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.body.user, userId],
      };
  
      try {
        const createdChat = await Chat.create(chatData);
        const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        return FullChat;
       
      } catch (error) {
        throw new Error(error.message);
      }
    }
  };

//@description     fetch  Chat
//@route           Get /api/chat/
//@access          Protected
export const fetchChat = async(req, res) => {
  console.log("game",req.body.user);
  var data = Chat.find({users: { $eq: req.body.user}})
  .populate("users", "-password")
  .populate("groupAdmin", "-password")
  .populate("latestMessage")
  .sort({ updatedAt: -1})
  .then(async(results) =>{
    results = await User.populate(results,{
      path: "latestMessage.sender",
      select: "fullname pic email"
    });
    console.log("results", results);
    return results;
  })
  return data
}