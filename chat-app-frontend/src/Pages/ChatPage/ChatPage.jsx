import React, { useContext, useEffect } from 'react'
import { Box } from '@mui/material'
import { fetchChats } from '../../Services/chatService'
import Header from '../../Components/Header/Header';
import Chatbox from '../../Components/Chatbox/Chatbox';
import MyChat from '../../Components/MyChats/MyChat';
import { ChatContext } from '../../Context/ChatProvider';

function ChatPage() {
  
  const user = useContext(ChatContext);
  console.log("userinfo:",user);

    // useEffect(() =>{
    //     fetchChats();
    // }, [])

  return (
    <div style={{width: "100%"}}>
       {user &&  <Header />}
        <Box display={'flex'} justifyContent={'space-between'}>
        <MyChat />
        <Chatbox />
        </Box>
    </div>
  )
}

export default ChatPage