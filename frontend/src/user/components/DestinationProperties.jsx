import React, { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { MdBookmarkBorder } from 'react-icons/md'
import {BiChat} from "react-icons/bi"
import Modal from './Modal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TokenExpireModal from './TokenExpireModal';
import { createChatWithOwner, getDestinationNames, getFilterData } from '../../api/UserAPI';


function DestinationProperties() {
    const navigate = useNavigate()
    const [checkoutProp,setCheckoutProp] = useState('')
    const [checkoutCostomer,setCheckoutCostomer] = useState('')
    const [checkoutConditions,setCheckoutConditions] = useState('')
    const [formError, setFormError] = useState('')
    const [orderModalOpen, setOrdermodalOpen] = useState(false)
    const [chatModalOpen, setChatmodalOpen] = useState(false)
    const [messageList, setMessageList] = useState([]);
    const [type, setType] = useState('')
    const [errorCatch, setErrorCatch]= useState('')
    const location = useLocation()
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const data = location.state

    

    const userLogin = useSelector((state)=> state.userLogin)
    const {loading,error,userInfo} = userLogin
    
    const id = userInfo._id

    const handleFormChange = (e)=>{
        const { name, value } = e.target;
        setCheckoutConditions((prevState) => ({
           ...prevState,
           [name]: value,
         }));
     }


     const handleChat = async(propertyholder) => {
         if(id && propertyholder){
            const senderId = id
            const receiverId = propertyholder
            const {data} = await createChatWithOwner(senderId, receiverId)
            if(data){
                if(data.exists){
                    const chatIds = data.result
                    navigate(`/chatpage`, { state: chatIds })
                }
            }
         }
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
                        try {
                            const { data } = await getFilterData(checkoutProp.destination,checkoutConditions.fromDate,checkoutConditions.toDate,checkoutConditions.type,checkoutConditions.numberOfPeople,checkoutProp.minCharge) 
                                if(data.data[0] !== undefined){
                                    navigate('/checkout', { state: {checkoutCostomer,checkoutProp,checkoutConditions} });
                                }else{
                                    setFormError("Property is booked on these dates...pls try again")
                                }
                        } catch (error) {
                            if(error?.response?.data?.message === 'jwt expired'){
                                localStorage.removeItem('userInfo')
                                setErrorCatch(error.response.data.message)
                              }
                        }
                    }
                }else{
                    if(checkoutConditions.numberOfPeople > checkoutProp.capacity){
                        setFormError('Capacity of People exeeded...!')
                    }else if(daysDifference <1){
                        setFormError('At least One day is required')
                    }else{
                        try {
                            const { data } = await getFilterData(checkoutProp.destination,checkoutConditions.fromDate,checkoutConditions.toDate,checkoutConditions.type,checkoutConditions.numberOfPeople,checkoutProp.netprice)
                                if(data.data[0] !== undefined){
                                    navigate('/checkout', { state: {checkoutCostomer,checkoutProp,checkoutConditions} });
                                }else{
                                    setFormError("Property is booked on these dates...pls try again")
                                }
                        } catch (error) {
                            if(error?.response?.data?.message === 'jwt expired'){
                                localStorage.removeItem('userInfo')
                                setErrorCatch(error.response.data.message)
                              }
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

    

    

    

    
  return (
    <div>
      <div className='flex justify-center'>
      <div className='container lg:px-40 min-h-screen mx-auto items-center mt-32'>
        {data.map((element)=>(
            
            
      <div className='rounded-lg mb-5 sm:my-7 justify-center mx-auto bg-blue-950 bg-opacity-90 max-w-4xl'>
        {/* {console.log(element)} */}
        <div className="md:flex items-start justify-center rounded-md bg-gray-300 py-10 2xl:px-2 md:px-4 px-2">
            <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <img className="w-full" alt="img of a girl posing" src={element.images[0] && element?.images[0].url} />
                <img className="mt-6 w-full" alt="img of a girl posing" src={element.images[1] && element?.images[1].url} />
            
            </div>
            <div className="md:hidden">
                <img className="w-full" alt="img of a girl posing" src={element.images[0] && element?.images[0].url} />
                <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                    <img alt="img-tag-one" className="md:w-48 md:h-48 h-full w-1/2" src={element.images[1] && element?.images[1].url} />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 h-full w-1/2" src={element.images[2] && element?.images[2].url} />
                </div>
            </div>
            <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
                <div className="border-b-2 border-gray-400 pb-6">
                    {element?.registerNumber &&
                        <p className="text-sm leading-none text-gray-600">We will assure your safe Journey</p>
                    }
                    {element?.numberOfRooms &&
                        <p className="text-sm leading-none text-gray-600">We will assure you a good Night</p>
                    }
                    {!element?.numberOfRooms && !element?.registerNumber &&
                        <p className="text-sm leading-none text-gray-600">We will assure you a good House</p>
                    }
                    <h1
                        className="
							lg:text-2xl
							text-xl
							font-bold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
                    >
                            {(element?.brandname || element?.modelname) ? `${element?.brandname},${element?.modelname}` : element?.propertyname}
                    </h1>
                </div>
                {/* <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">Colours</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600">Smoke Blue with red accents</p>
                        <div
                            className="
								w-6
								h-6
								bg-gradient-to-b
								from-gray-900
								to-indigo-500
								ml-3
								mr-4
								cursor-pointer
							"
                        ></div>
                        <svg className="cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L1 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div> */}
                {/* <div className="py-4 border-b border-gray-200 flex items-center justify-between">
                    <p className="text-base leading-4 text-gray-800">Size</p>
                    <div className="flex items-center justify-center">
                        <p className="text-sm leading-none text-gray-600 mr-3">38.2</p>
                        <svg className="cursor-pointer" width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L5 5L1 9" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div> */}
                {/* <button
                    className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
                >
                    <svg className="mr-3" width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.02301 7.18999C7.48929 6.72386 7.80685 6.12992 7.93555 5.48329C8.06425 4.83666 7.9983 4.16638 7.74604 3.55724C7.49377 2.94809 7.06653 2.42744 6.51835 2.06112C5.97016 1.6948 5.32566 1.49928 4.66634 1.49928C4.00703 1.49928 3.36252 1.6948 2.81434 2.06112C2.26615 2.42744 1.83891 2.94809 1.58665 3.55724C1.33439 4.16638 1.26843 4.83666 1.39713 5.48329C1.52583 6.12992 1.8434 6.72386 2.30968 7.18999L4.66634 9.54749L7.02301 7.18999Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M4.66699 4.83333V4.84166" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M13.69 13.8567C14.1563 13.3905 14.4738 12.7966 14.6025 12.15C14.7312 11.5033 14.6653 10.8331 14.413 10.2239C14.1608 9.61476 13.7335 9.09411 13.1853 8.72779C12.6372 8.36148 11.9926 8.16595 11.3333 8.16595C10.674 8.16595 10.0295 8.36148 9.48133 8.72779C8.93314 9.09411 8.5059 9.61476 8.25364 10.2239C8.00138 10.8331 7.93543 11.5033 8.06412 12.15C8.19282 12.7966 8.51039 13.3905 8.97667 13.8567L11.3333 16.2142L13.69 13.8567Z" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11.333 11.5V11.5083" stroke="white" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Check availability in store
                </button> */}
                <div>
                    <div className="flex flex-row justify-between align-baseline">
                        <p className="text-base leading-4 mt-7 text-gray-600">Destination: </p>
                        <p className="text-base leading-4 mt-7 text-gray-600 "><span className='text-black font-semibold'>{element?.destination},{element?.district}</span></p>
                    </div>
                    
                    <>
                            {element?.fuelType ? 
                                <div className="flex flex-row justify-between align-baseline">
                                    <p className="text-base leading-4 mt-4 text-gray-600">Fuel Type: </p>
                                    <p className="text-base leading-4 mt-4 text-gray-600 "><span className='text-black font-semibold'>{element.fuelType}</span></p>
                                </div>  :
                                    <div className="address-bar flex flex-row justify-between align-baseline overflow-scroll">
                                        <p className="text-base leading-4 mt-4 text-gray-600">Address: </p>
                                        <p className="text-base leading-4 mt-4 text-gray-600 "><span className='text-black font-semibold'>{element.address}</span></p>
                                    </div>
                                
                            }
                    </>  
                    
                    <p className="text-base leading-4 mt-4 text-gray-600">{element?.extraFair ? (
                                            <div className='flex flex-row justify-between align-baseline'>
                                              <span>Extra Fair (After 150 kms):</span>
                                              <span className='text-black font-semibold'>₹{element.extraFair}</span>
                                            </div>
                                        ) : (
                                            <>
                                            {element?.description && (
                                                <>
                                                <div>
                                                    <div className="border-t border-b py-2 mb-2 border-gray-500">
                                                        <div onClick={() => setShow(!show)} className="flex justify-between items-center cursor-pointer">
                                                            <p className="text-base leading-4 text-gray-800">Extra Features</p>
                                                            <button
                                                                className="
                                                                    cursor-pointer
                                                                    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                                                                    rounded
                                                                "
                                                                aria-label="show or hide"
                                                            >
                                                                <svg className={"transform " + (show ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                        <div className={"pt-0 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show ? "block" : "hidden")} id="sect">
                                                            <span className='text-red-600'>{element.description}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                
                                                </>
                                            )}
                                            </>
                                        )}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">{element?.registerNumber ? (
                                            <div className='flex flex-row justify-between align-baseline'>
                                              <span>Register Number:</span>  
                                              <span className='text-black font-semibold'>{element.registerNumber}</span>
                                            </div>
                                        ) : (
                                            <div className='flex flex-row justify-between align-baseline'>
                                              <span>Base Price:</span> 
                                              <span className='text-black'>₹{element.baseprice}</span>
                                            </div>
                                        )}</p>
                    <p className="text-base leading-4 mt-4 text-gray-600">{element?.seatingCapacity ? (
                                        <div className='flex flex-row justify-between align-baseline'>
                                              <span>Seating Capacity:</span>
                                              <span className='text-black font-semibold'>{element.seatingCapacity}</span>
                                        </div>
                                    ) : (
                                        <div className='flex flex-row justify-between align-baseline'>
                                             <span>Net Price:</span>
                                             <span className='text-black'>₹{element.netprice}</span>
                                        </div>
                                    )}</p>
                    {element?.minCharge && (
                        <div className='flex flex-row justify-between align-baseline mt-4'>
                            <span>Min.Charge:</span>
                            <p className=" text-gray-600"> <span className='text-black'>{element.minCharge}</span></p>

                        </div>               
                    )}
                        </div>
                
                {/* <div>
                    <div className="border-b py-4 border-gray-200">
                        <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Contact us</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
                            If you have any questions on how to return your item to us, contact us.
                        </div>
                    </div>
                </div> */}
                <div className="w-full flex flex-row gap-2 relative bottom-0">
                    <button
                        onClick={()=>{setOrdermodalOpen(true);handleType(element)}}
                        className="
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950
                            text-base flex items-center justify-center
                            leading-none text-white bg-blue-950 w-full py-4 my-2 hover:bg-blue-800
                        "
                    >
                        <MdBookmarkBorder size={20} />
                        Order
                    </button>
                    <button
                        onClick={()=>handleChat(element.propertyholder)}
                        className="
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
                            text-base flex items-center justify-center
                            leading-none text-white bg-gray-600 w-full py-4 my-2 hover:bg-gray-700 hover:text-white
                        "
                    >
                        <BiChat size={20} />
                        Chat with Owner
                    </button>
                </div>
                
            </div>
        </div>
            
             
           

        
          
        </div>
        
        
        ))}
    </div>
    </div>
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
    {errorCatch !== '' &&
        <TokenExpireModal message={errorCatch} />
    }
    </div>
  )
}

export default DestinationProperties
