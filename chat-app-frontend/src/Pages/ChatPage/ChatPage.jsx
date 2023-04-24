import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import { fetchChats } from '../../Services/chatService'
import Header from '../../Components/Header/Header';
import Chatbox from '../../Components/Chatbox/Chatbox';
import MyChat from '../../Components/MyChats/MyChat';

function ChatPage() {

    useEffect(() =>{
        fetchChats();
    }, [])

  return (
    <div style={{width: "100%"}}>
        <Header />
        <Box display={'flex'} justifyContent={'space-between'}>
        <MyChat />
        <Chatbox />
        </Box>
    </div>
  )
}

export default ChatPage