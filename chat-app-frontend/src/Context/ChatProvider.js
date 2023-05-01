import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ChatContext = createContext();

const ChatProvider = ({ children }) => {
//   const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
//   const [chats, setChats] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("token"));
    setUser(userInfo);

    console.log("userInfo--->",userInfo);
    if (!userInfo) navigate("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [

  ]);

  return (
    <ChatContext.Provider
      value={{
        // selectedChat,
        // setSelectedChat,
        user,
        setUser,
        // chats,
        // setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  // jhdbejdjdjejdejediejede
  return useContext(ChatContext);
};

export default ChatProvider;