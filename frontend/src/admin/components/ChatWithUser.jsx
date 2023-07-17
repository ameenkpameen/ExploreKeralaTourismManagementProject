import React, { useEffect, useMemo, useState } from 'react'
import io from 'socket.io-client'
import baseURL from '../../config';
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect(baseURL)

function ChatWithUser() {

    const [chatRoom, setChatRoom] = useState('')
    const [chatUserName, setChatUserName] = useState('')
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([]);


    if(localStorage.ownerInfo !== undefined){
        var owner = JSON.parse(localStorage.ownerInfo);
      }

    const id = owner._id



    const joinRoom = (e)=>{
        if(chatRoom !== "" && chatUserName !== ""){
            socket.emit("join_room", chatRoom)

            
        }
    }

    const sendMessage = async(e)=>{
        if(currentMessage !== ""){
            const messageData = {
                room:chatRoom,
                author:chatUserName,
                message: currentMessage,
                time: new Date(Date.now()).getHours()+':'+new Date(Date.now()).getMinutes()
            }

            await socket.emit("send_message",messageData)
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    useMemo(()=>{
        socket.on("receive_message", (data)=>{
            setMessageList((list) => [...list, data]);
        })
    },[socket])


    useEffect(()=>{
       if(owner){
          setChatRoom(id)
          setChatUserName(owner.firstname+' '+owner.lastname)
          if(chatRoom !== "" && chatUserName !== ""){
            joinRoom()
          }
       }
    },[owner])


    

    // useEffect(()=>{
    //     async function getAdminInfo(){
    //         const {data} = await axios.get(`${baseURL}/owner/getprofile/${id}`)
    //         if(data){
    //             setprofileData(data.owner)
    //         }
    //     }
    //     getAdminInfo() 
    // },[edit])

    // console.log(profileData);



  return (
    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-20'>
          <div className="chat-window">
                <div className="chat-header">
                    <p>Live Chat</p>
                </div>
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                    {messageList.map((messageContent) => {
                        return (
                        <div
                            className="message"
                            id={chatUserName === messageContent.author ? "you" : "other"}
                        >
                            <div>
                            <div className="message-content">
                                <p className='text-sm p-3 font-medium'>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p id="time">{messageContent.time}</p>
                                <p id="author">{messageContent.author}</p>
                            </div>
                            </div>
                        </div>
                        );
                    })}
                    </ScrollToBottom>
                </div>
                <div className="chat-footer">
                    
                        
                            <input
                            type="text"
                            value={currentMessage}
                            placeholder="Hey..."
                            onKeyUp={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault(); // Prevent form submission
                                  sendMessage();
                                }
                              }}
                            onChange={(e) => {
                                e.preventDefault()
                                setCurrentMessage(e.target.value);
                            }}
                            
                            />

                            <button onClick={sendMessage}>&#9658;</button>
                    
                </div>
                </div>
          {/* <div className='text-center max-w-4xl'>
              <form onSubmit={joinRoom} className="w-full max-w-sm mx-auto text-white bg-white p-5 rounded-lg shadow-xl drop-shadow-2xl" encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="destination">Write Message</label>
                        <input onChange={(e)=>setCurrentMessage(e.target.value)} className="w-full px-3 py-2 border text-black text-base border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="text"id="name" name="fromDate" placeholder="" />
                    </div>
                    
                        <button 
                        className="w-full bg-black text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                        type="submit">Send</button>
                    
                </form>
            </div> */}
    </div>
  )
}

export default ChatWithUser
