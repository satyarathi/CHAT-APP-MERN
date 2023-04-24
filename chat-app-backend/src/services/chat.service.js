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
  var results = await Chat.find({users: { $eq: req.body.user}})
  .populate("users", "-password")
  .populate("groupAdmin", "-password")
  .populate("latestMessage")
  .sort({ updatedAt: -1})
 
 console.log("resullllllllt",results)
 return results;
}

//@description     Create 
//@route           Post /api/chat/group
//@access          Protected
export const createGroupChat = async(req) =>{
  
  if(!req.body.users || !req.body.name){
    throw new error("Fill all the deitails")
  }

  var users = JSON.parse(req.body.users);

  if(users.length < 2){
    throw new Error("More than 2 users are required")
  }

  users.push(req.body.user);
  console.log("users:",users, "admin:",req.body.user);

  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.body.user
    });

    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  return fullGroupChat;
  } catch (error) {
    throw new Error
  }
}

// @desc    Rename Group
// @route   PUT /api/chat/rename
// @access  Protected
export const renameGroupChat = async (req) => {
  const { chatId, chatName } = req.body;

  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updatedChat) {
    throw new Error("Chat Not Found");
  } else {
   return updatedChat;
  }
};


// @desc    Add user to Group / Leave
// @route   PUT /api/chat/groupadd
// @access  Protected
export const addToGroup = async (req) => {
  
  const { chatId, userId } = req.body;
  
  var data = Chat.findById(chatId, (err, chat) => {
    
    if (chat.users.includes(userId)) {
    console.log(`User with id ${userId} is already in chat with id ${chatId}`);
    return;
  }


else{
  // check if the requester is admin 

  const addedToGroup = Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addedToGroup) {
    throw new Error("Chat Not Found");
  } else {
   return addedToGroup;
  }
}
})
return data
}



// @desc    Remove user from Group
// @route   PUT /api/chat/groupremove
// @access  Protected
export const removeFromGroup = async (req) => {
  
  const { chatId, userId } = req.body;

  // check if the requester is admin

  const removed =  Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removed) {
    throw new Error("Chat Not Found");
  } else {
    return removed;
  }
}