import User from '../models/user.model';
const bcrypt = require('bcrypt');
import Message from "../models/message.model";
import Chat from "../models/chat.model";

//@description     Create New Message
//@route           POST /api/Message/
//@access          Protected
export const sendMessage = async (req, res) => {
    const { content, chatId } = req.body;
  
    if (!content || !chatId) {
      console.log("Invalid data passed into request");
     
    }
  
    var newMessage = {
      sender: req.body.user,
      content: content,
      chat: chatId,
    };
  
    try {
      var message = await Message.create(newMessage);
  
      message = await message.populate("sender", "name pic").execPopulate();
      message = await message.populate("chat").execPopulate();
      message = await User.populate(message, {
        path: "chat.users",
        select: "fullname pic email",
      });
  
       await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    return message
    } catch (error) {
      throw new Error(error.message);
    }
  };
