import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserChats } from '../../api/UserAPI';
import {io} from "socket.io-client"
import socketInstance from '../../Socket';
import { getOwnerChats } from '../../api/OwnerAPI';
import OwnerChatBox from '../../user/components/OwnerChatBox';
import OwnerConversation from './OwnerConversation';
import OwnerTokenExpire from './OwnerTokenExpire';

function ChatWithUser() {

    const [chats, setChats] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [sendMessage, setSendMessage] = useState(null)
    const [recieveMessage, setRecieveMessage] = useState(null)
    const socket  = useRef()
    const [errorCatch, setErrorCatch] = useState('')


    if(localStorage.ownerInfo !== undefined){
        var owner = JSON.parse(localStorage.ownerInfo);
      }

    const id = owner?._id


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
    },[])



    useEffect(()=>{
       const getChats = async()=>{
           try {
                const {data} = await getOwnerChats(id)
                if(data){
                    setChats(data.chat)
                }
           } catch (error) {
                if(error?.response?.data?.message === 'jwt expired'){
                    localStorage.removeItem('ownerInfo')
                    setErrorCatch(error.response.data.message)
                }else{
                    console.log(error);
                }
           }
       }
       getChats()
    },[id])
    
    const checkOnlineStatus = (chat)=>{
        const chatMember = chat.members.find((member)=> member !== id)
        const online = onlineUsers.find((user)=>user.userId === chatMember)
        return online ? true : false
    }


  return (
    <div className='pt-20'>
    <div className='Chat'>
         <div className="Left-side-chat">
            <div className="Chat-container bg-white">
                <h2 className='text-lg font-medium text-gray-50'>
                    Chats
                </h2>
                <div className="Chat-list">
                    {chats.map((chat, index)=>(
                        <div key={index} onClick={()=>setCurrentChat(chat)}>
                            <OwnerConversation data={chat} currentUserId={id} online={checkOnlineStatus(chat)}/>
                        </div>
                    ))}
                </div>
            </div>
         </div>
         <div className="Right-side-chat">
            <div className='bg-blue-950' style={{width:'20rem', alignSelf: 'flex-end'}}>
                 
            </div>
             <OwnerChatBox chat={currentChat} currentUser={id} setSendMessage={setSendMessage} recieveMessage={recieveMessage}/>
         </div>
    </div>
        {errorCatch !== '' &&
             <OwnerTokenExpire message={errorCatch}/>
         }
    </div>
  )
}

export default ChatWithUser
