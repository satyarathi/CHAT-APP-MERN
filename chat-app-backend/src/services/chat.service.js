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