import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserChats } from '../../api/UserAPI';
import Conversation from './Conversation';
import ChatBox from './ChatBox';
import {io} from "socket.io-client"
import socketInstance from '../../Socket';
import { useLocation } from 'react-router-dom';
import TokenExpireModal from './TokenExpireModal';

function ChatComponent() {

    

    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [recieveMessage, setRecieveMessage] = useState(null)
    const [errorCatch, setErrorCatch]= useState('')
    const socket  = useRef()

    const location = useLocation();
    const chatIds = location.state ? location.state : null;
    


    

    const userLogin = useSelector((state)=> state.userLogin)
    const {loading,error,userInfo} = userLogin
    
    const id = userInfo._id

    useEffect(()=>{
        if(sendMessage !== null){
            socket.current.emit('send-message', sendMessage)
        }

    },[sendMessage])

    
    useEffect(()=>{
        socket.current = socketInstance
        socket.current.emit('add-new-user',id)
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    },[id])
    

    useEffect(()=>{
            socket.current.on('receive-message', (data)=>{
                setRecieveMessage(data)
            })
            if(chatIds){
                setCurrentChat(chatIds)
            }
    },[])



    useEffect(()=>{
       const getChats = async()=>{
           try {
                const {data} = await getUserChats(id)
                if(data){
                    setChats(data.chat)
                }
           } catch (error) {
              if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('userInfo')
                setErrorCatch(error.response.data.message)
              }
           }
       }
       getChats()
    },[userInfo])

    const checkOnlineStatus = (chat)=>{
        const chatMember = chat.members.find((member)=> member !== id)
        const online = onlineUsers.find((user)=>user.userId === chatMember)
        return online ? true : false
    }

  return (
    <div className='Chat mt-20'>
         <div className="Left-side-chat">
            <div className="Chat-container">
                <h2 className='text-lg font-medium text-gray-50'>
                    Chats
                </h2>
                <div className="Chat-list">
                    {chats.map((chat,index)=>(
                        <div key={index} onClick={()=>setCurrentChat(chat)}>
                                <Conversation data={chat} currentUserId={id} online={checkOnlineStatus(chat)}/>
                        </div>
                    ))}
                </div>
            </div>
         </div>
         <div className="Right-side-chat">
            <div className='bg-blue-950' style={{width:'20rem', alignSelf: 'flex-end'}}>
                 
            </div>
                <ChatBox chat={currentChat} currentUser={id} setSendMessage={setSendMessage} recieveMessage={recieveMessage}/>
         </div>
         {errorCatch !== '' &&
            <TokenExpireModal message={errorCatch} />
        }
    </div>
  )
}

export default ChatComponent
