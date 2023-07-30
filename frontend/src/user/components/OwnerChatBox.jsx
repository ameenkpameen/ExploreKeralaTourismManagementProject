import React, { useEffect, useRef, useState } from 'react'
import { addMessage, getMessages, getUserData, uploadCloudinary } from '../../api/OwnerAPI'
import {format} from "timeago.js"
import InputEmoji from 'react-input-emoji'
import {IoSendSharp} from 'react-icons/io5'
import { HiLink } from 'react-icons/hi'
import { BsSendFill } from "react-icons/bs"

function OwnerChatBox({chat, currentUser, setSendMessage, recieveMessage}) {
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [newImage, setNewImage] = useState('')
    const [imageUploading, setImageUploading]= useState(false)
    const [showModal, setShowModal] = useState(false);
    const scroll = useRef()

    useEffect(()=>{
        if(recieveMessage !== null && recieveMessage.chatId === chat._id){
          setMessages([...messages, recieveMessage])
        }
    },[recieveMessage])

    useEffect(()=>{
        const userId = chat?.members?.find((id)=> id !== currentUser)
        const getUsersData = async()=>{
            try {
                const {data} = await getUserData(userId)
                if(data){
                    setUserData(data.userData)
                }
            } catch (error) {
                console.log(error);
            }
          }
          if(chat!== null){
            getUsersData()
          }

    },[chat,currentUser])

    useEffect(()=>{
        const fetchMessages = async()=>{
          try {
             const {data} = await getMessages(chat._id)
             if(data){
              setMessages(data.messageData)
             }
          } catch (error) {
            console.log(error);
          }
        }
        if(chat !== null) fetchMessages()
    },[messages,chat])

    const handleChange = (newMessage)=>{
      setNewMessage(newMessage)
    }

    const handleSend = async(e)=>{
      e.preventDefault()
      const message ={
        senderId:currentUser,
        text:newMessage,
        chatId:chat._id
      }

      try {
        const {data} = await addMessage(message)
        if(data){
          setMessages([...messages, data.result])
          setNewMessage('')
        }
      } catch (error) {
        console.log(error);
      }

      const receiverId = chat?.members?.find((id)=> id !== currentUser)
      setSendMessage({...message, receiverId})
    }

  //   useEffect(()=>{
  //     scroll.current?.scrollIntoView({behaviour: "smooth"})
  // },[messages]).
  

  const handleImageChange = async(e)=>{
    const file = e.target.files[0]
    if(file){
      setNewImage(file)
      setShowModal(true)
    }
  }

  const handleCloseModal = () => {
    setNewImage(''); 
    setShowModal(false); 
  };

  const handleImageSubmit = async(e)=>{
    e.preventDefault();
    setImageUploading(true)
    const formData = new FormData();
    formData.append("file", newImage);
    formData.append("upload_preset", "exploreKerala");
    const response = await uploadCloudinary(formData)
            const responseData = response.data;
            if(responseData){
                    const message = {
                      senderId:currentUser,
                      text: responseData.url,
                      chatId:chat._id,
                      type: "image"
                    }
            
                    try {
                      console.log("here");
                      const {data} = await addMessage(message)
                      if(data){
                        setImageUploading(false)
                        setShowModal(false)
                        setMessages([...messages, data.result])
                        setNewMessage('')
                      }
                    } catch (error) {
                      console.log(error);
                  }
              }

}

useEffect(() => {
  const handleOutsideClick = (event) => {
    console.log(event.target.className);
    if (event.target.className !== 'modal') {
      handleCloseModal();
    }
  };

  if (showModal) {
    document.addEventListener('click', handleOutsideClick);
  }

  return () => {
    document.removeEventListener('click', handleOutsideClick);
  };
}, [showModal]);


  return (
    <div>
      <div className="ChatBox-container">
        {chat? (
          <div className="chat-header">
          <div className="follower">
            <div className='flex flex-row bg-blue-950 p-2 rounded-md'>
                    <img className='followerImage rounded-full' src= "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" alt="" style={{width: '50px', height: '50px'}} />
                <div className="name ml-3 mt-0 flex flex-col" style={{fontSize: '1.0rem'}}>
                    <span className='font-bold text-white my-auto'>{userData?.firstname} {userData?.lastname}</span>
                </div>
            </div>
            <hr className='mx-auto' style={{width: '85%', border:'0.1px solid #ececec'}}/>
          </div>
          <div className="chat-body min-h-fit">
                  {messages.map((message,index)=>(
                    <>
                          {message.type === 'image' &&
                            <div key={index} ref={scroll} className={message.senderId === currentUser? "message own" : "message"}>
                              <img src={message.text} className='w-80 h-full' alt="sendimage" />
                              <span>{format(message.createdAt)}</span>
                            </div>
                          }
                          {message.type === 'text' &&
                            <div key={index} ref={scroll} className={message.senderId === currentUser? "message own" : "message"}>
                              <span>{message.text}</span>
                              <span>{format(message.createdAt)}</span>
                            </div> 
                          }
                    </>
                  ))}
          </div>
          <div className="chat-sender w-full">
          <div>
              <label className='p-3' htmlFor="imageInput">
                  < HiLink color='blue' size={20}/>
                  <input
                    type="file"
                    id="imageInput"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                  />
                </label>
                {showModal && newImage && (
                  <div className="modal bg-blue-950 mb-48 rounded-md">
                    <div className="modal-content p-2 w-80 h-full">
                      {!imageUploading ?
                        <img className='modal' src={URL.createObjectURL(newImage)} alt="Selected" /> :
                        <div className='flex flex-row justify-center mx-auto py-52' role="status">
                            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                            </svg>
                            <span class="sr-only">Loading...</span>
                        </div>
                      }
                      <div className='modal mt-2 flex flex-row justify-end'>
                        <button className='modal px-2 py-2 rounded-sm text-end bg-blue-500' onClick={handleImageSubmit}><BsSendFill className='modal' size={25} color='white' /></button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
            <InputEmoji 
               value= {newMessage}
               onChange={handleChange}
            />
            <div className="send-button button mt-2"onClick={handleSend}>
              {newMessage !== '' &&
                <IoSendSharp className='' color='blue' size={24} />
              }
            </div>
          </div>
        </div>
        ) : (
          <span className='chatbox-empty-message'>
            Tap on a chat to start conversation...
          </span>
        )}
         
      </div>
    </div>
  )
}

export default OwnerChatBox
