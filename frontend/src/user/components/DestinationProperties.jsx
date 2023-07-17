import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { MdBookmarkBorder } from 'react-icons/md'
import {BiChat} from "react-icons/bi"
import Modal from './Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import baseURL from '../../config';
import io from 'socket.io-client'
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect(baseURL, )

function DestinationProperties() {
    const navigate = useNavigate()
    const [checkoutProp,setCheckoutProp] = useState('')
    const [checkoutCostomer,setCheckoutCostomer] = useState('')
    const [checkoutConditions,setCheckoutConditions] = useState('')
    const [formError, setFormError] = useState('')
    const [orderModalOpen, setOrdermodalOpen] = useState(false)
    const [chatModalOpen, setChatmodalOpen] = useState(false)
    const [chatUserName, setChatUserName] = useState('')
    const [chatRoom, setChatRoom] = useState('')
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([]);
    const [type, setType] = useState('')
    const location = useLocation()

    const data = location.state

    const userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin

    const handleFormChange = (e)=>{
        const { name, value } = e.target;
        setCheckoutConditions((prevState) => ({
           ...prevState,
           [name]: value,
         }));
     }

     const handleFormSubmit = async(e)=>{
        e.preventDefault()
        setCheckoutConditions((prevState)=>({
            ...prevState,
            type: type
        }))
        if(checkoutConditions.fromDate && checkoutConditions.toDate && checkoutConditions.numberOfPeople){
            const startDate = new Date(checkoutConditions.fromDate);
            const endDate = new Date(checkoutConditions.toDate);
            const timeDifference = endDate.getTime() - startDate.getTime();
            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            if(checkoutConditions.type !== undefined){
                if(checkoutConditions.type === 'Cab'){
                    if(checkoutConditions.numberOfPeople > checkoutProp.seatingCapacity){
                         setFormError('Capacity of People exeeded...!')
                    }else if(daysDifference <1){
                        setFormError('At least One day is required')
                    }else{
                        const { data } = await axios.post(`${baseURL}/getfiltereddata`,{
                            destination:checkoutProp.destination,
                            fromDate:checkoutConditions.fromDate,
                            toDate:checkoutConditions.toDate,
                            type:checkoutConditions.type,
                            numberOfPeople:checkoutConditions.numberOfPeople,
                            priceLimit:checkoutProp.minCharge})
                            if(data.data[0] !== undefined){
                                navigate('/checkout', { state: {checkoutCostomer,checkoutProp,checkoutConditions} });
                            }else{
                                setFormError("Property is booked on these dates...pls try again")
                            }
                    }
                }else{
                    if(checkoutConditions.numberOfPeople > checkoutProp.capacity){
                        setFormError('Capacity of People exeeded...!')
                    }else if(daysDifference <1){
                        setFormError('At least One day is required')
                    }else{
                        const { data } = await axios.post(`${baseURL}/getfiltereddata`,{
                            destination:checkoutProp.destination,
                            fromDate:checkoutConditions.fromDate,
                            toDate:checkoutConditions.toDate,
                            type:checkoutConditions.type,
                            numberOfPeople:checkoutConditions.numberOfPeople,
                            priceLimit:checkoutProp.netprice})
                            if(data.data[0] !== undefined){
                                navigate('/checkout', { state: {checkoutCostomer,checkoutProp,checkoutConditions} });
                            }else{
                                setFormError("Property is booked on these dates...pls try again")
                            }
                    }
                }
            }
        }else{
            setFormError("All Fields are required")
        }
        
        
     }

     const handleType = (element)=>{
        setCheckoutProp(element)
        setCheckoutCostomer(userInfo)
        if(element.registerNumber){
           setType('Cab')
        }else if(element.numberOfRooms){
            setType('Hotel')
        }else{
            setType('HomeStay')
        }
     }

     function getCurrentDate() {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        if (month < 10) {
            month = '0' + month;
        }
    
        if (day < 10) {
            day = '0' + day;
        }
    
        return `${year}-${month}-${day}`;
    }

    function getToDate() {
        if(checkoutConditions.fromDate !== ''){

            const today = new Date(checkoutConditions.fromDate);
            var year = today.getFullYear();
            var month = today.getMonth() + 1;
            var day = today.getDate();
        
            if (month < 10) {
                month = '0' + month;
            }
        
            if (day < 10) {
                day = '0' + day;
            }
        }else{
            const today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
            day = today.getDate();
            if (month < 10) {
                month = '0' + month;
            }
            if (day < 10) {
                day = '0' + day;
            }
        }
        return `${year}-${month}-${day}`;
    }

    const joinRoom = (e)=>{
        if(chatRoom !== "" && chatUserName !== ""){
            socket.emit("join_room", chatRoom)
        }
    }

    const sendMessage = async()=>{
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

    
  return (
    <div>
        {data.map((element)=>(
      <div className='rounded-lg mb-5 sm:my-7 justify-center bg-gray-300 bg-opacity-75 max-w-4xl'>
            
            <>
              <div className="flex flex-row items-center 2xl:container 2xl:mx-auto lg:px-10 md:py-12 md:px-6 py-9 px-4">
                 
                <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
            
                    <div className="w-full lg:w-6/12">
                        <h2 className="w-full font-bold lg:text-2xl text-black text-3xl lg:leading-10 leading-9">{(element?.brandname || element?.modelname) ? `${element?.brandname},${element?.modelname}` : element?.propertyname}</h2>
                        <h2 className="w-full font-semibold  text-gray-500  lg:text-lg md:text-xl sm:text-lg lg:leading-10 leading-9">Destination: <span className='text-black font-semibold'>{element?.destination},{element?.district}</span></h2>
                        <h2 className="w-full font-semibold  text-gray-500  lg:text-lg md:text-xl lg:-mt-3 sm:text-lg lg:leading-10 leading-9">{element?.fuelType ? (
                                        <>
                                        Fuel Type: <span className='text-black font-semibold'>{element.fuelType}</span>
                                        </>
                                    ) : (
                                        <>
                                        Address: <span className='text-black text-sm'>{element.address}</span>
                                        </>
                                    )}</h2>
                        <h2 className="w-full font-semibold text-gray-500 lg:text-lg lg:-mt-3 md:text-xl sm:text-lg lg:leading-10 leading-9">{element?.extraFair ? (
                                            <>
                                            Extra Fair (After 150 kms):{' '}
                                            <span className='text-black font-semibold'>₹{element.extraFair}</span>
                                            </>
                                        ) : (
                                            <>
                                            {element?.description && (
                                                <>
                                                Extra Features:{' '}
                                                
                                                 <span className='text-blue-700'> View Features</span>
                                                
                                                </>
                                            )}
                                            </>
                                        )}</h2>
                        <h2 className="w-full font-semibold  lg:text-lg  lg:-mt-3 md:text-xl sm:text-lg text-gray-500 lg:leading-10 leading-9">{element?.registerNumber ? (
                                            <>
                                            Register Number: <span className='text-black font-semibold'>{element.registerNumber}</span>
                                            </>
                                        ) : (
                                            <>
                                            Base Price: <span className='text-black'>₹{element.baseprice}</span>
                                            </>
                                        )}</h2>
                        <h2 className="w-full font-semibold  lg:text-lg -mt-3 md:text-sm sm:text-lg text-gray-500 lg:leading-10 leading-9">{element?.seatingCapacity ? (
                                        <>
                                        Seating Capacity: <span className='text-black font-semibold'>{element.seatingCapacity}</span>
                                        </>
                                    ) : (
                                        <>
                                        Net Price: <span className='text-black'>₹{element.netprice}</span>
                                        </>
                                    )}</h2>
                        {element?.minCharge && (
                              <h2 className="w-full font-semibold text-gray-500 lg:text-lg lg:-mt-3 md:text-sm sm:text-lg lg:leading-10 leading-9">
                                Min.Charge: <span className='text-black'>{element.minCharge}</span>
                              </h2>
                          )}
                     {/* <p className="font-normal text-base leading-6 text-gray-600 mt-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p> */}
                           <div className='grid grid-flow-col gap-5 px-6 mt-3'>
                                <button onClick={()=>{setOrdermodalOpen(true);handleType(element)}} className="flex flex-row items-center text-center justify-center py-2  text-sm tracking-wide text-white transition-colors duration-200 transform bg-purple-800 rounded-md hover:bg-purple-700 focus:outline-none focus:bg-purple-600 focus:text-gray-50">
                                       <div>
                                           <MdBookmarkBorder size={20} />
                                        </div>
                                        <div className='ml-1'>
                                            Order 
                                        </div>
                                </button>
                                <button onClick={()=>{setChatRoom(element.propertyholder);setChatUserName(userInfo.firstname+' '+userInfo.lastname);setChatmodalOpen(true);joinRoom()}} className="flex flex-row items-center text-center justify-center py-2  text-sm tracking-wide text-white transition-colors duration-200 transform bg-green-800 rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-600 focus:text-gray-50">
                                       <div>
                                           <BiChat size={20} />
                                        </div>
                                        <div className='ml-1'>
                                            Chat With Owner
                                        </div>
                                </button>

                                

                            </div>
                   </div>
                  <div className="w-full lg:w-5/12">
                      <img className="sm:block w-full h-40 p-2" src={element.images[0] && element?.images[0].url} alt="property" />
                    <div className='flex'>

                      <div className='w-full lg:w-6/12 p-2'>
                        <img className=" sm:block w-full h-full" src={element.images[1] && element?.images[1].url} alt="property" />
                      </div>
                      <div className='w-full lg:w-6/12 p-2'>
                        <img  className=" block w-full h-full" src={element.images[2] && element?.images[2].url} alt="property" />
                      </div>
                    </div>
                  </div>
                  
             </div>

           </div>

            
           </> 
           <Modal open={orderModalOpen} onClose={()=>setOrdermodalOpen(false)}>
            <div className='text-center max-w-4xl'>
              <form onSubmit={handleFormSubmit} className="w-full max-w-sm mx-auto text-white bg-white p-5 rounded-lg shadow-xl drop-shadow-2xl" encType="multipart/form-data">
                   {
                        formError &&
                        <h1 className='text-red-600 text-base text-center'>{formError}</h1>
                   }
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="destination">From</label>
                        <input className="w-full px-3 py-2 border text-black text-base border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="date" min={getCurrentDate()} id="name" name="fromDate" placeholder="" onChange={handleFormChange}/>
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="district">To</label>
                        <input className="w-full px-3 py-2 border text-black text-base border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="date" min={getToDate()} id="email" name="toDate" onChange={handleFormChange} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-black text-sm font-bold mb-2" htmlFor="district">Number of People</label>
                        <input className="w-full px-3 py-2 border text-black text-base border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                        type="number" id="email" name="numberOfPeople" onChange={handleFormChange} />
                    </div>

                    
                        <button 
                        className="w-full bg-black text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                        type="submit">Save</button>
                    
                </form>
            </div>
        </Modal>

        <Modal open={chatModalOpen} onClose={()=>setChatmodalOpen(false)}>
            <div className='text-center max-w-4xl'>
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
            </div>
        </Modal>
          
        </div>
        
        
        ))}
    </div>

  )
}

export default DestinationProperties
