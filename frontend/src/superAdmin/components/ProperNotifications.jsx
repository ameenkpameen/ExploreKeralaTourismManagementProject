import React, { useEffect, useState } from 'react'

import {BiDetail} from "react-icons/bi"
import {BsTrashFill} from "react-icons/bs"
import {GiConfirmed} from "react-icons/gi"
import Modal from './Modal'
import axios from 'axios'
import baseURL from '../../config'


function ProperNotifications() {

   const [details,setDetails] = useState(false)
   const [owner,setOwner] = useState(false)
   const [document,setDocument] = useState(false)
   const [open, setOpen] = useState(false)
   const [approved, setApproved] = useState(false)
   const [openSuccess, setOpenSuccess] = useState(false)
   const [modalData, setModalData] = useState('')
   const [propData, setPropData] = useState({
    cabsData:[],
    homestayData:[],
    hotelData:[]
   })


   useEffect(()=>{
    async function getNotifications(){
        const {data} = await axios.get(`${baseURL}/superadmin/getpropertiesnotifications`)
        if(data){
            setPropData({ ...data, cabsData: data.cabsData });
            setPropData({ ...data, homestayData: data.homestayData });
            setPropData({ ...data, hotelData: data.hotelData });
        }
    }
    getNotifications()
},[approved])
   

   

   const handleListSubmit = (async(e)=>{
       e.preventDefault();
       console.log(modalData);
       setOpen(false)
       const id = modalData._id
       const {data} = await axios.post(`${baseURL}/superadmin/listitem/${id}`)
            if(data){
                console.log("edited");
                setOpenSuccess(true)
            }
       
   })

   
   

   
 

  return (
    <>
       
        <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-3 justify-items-center mt-5 mb-5 rounded-sm'>
        {
            
         propData.cabsData?.map((menu, index)=>(
          <div className='my-10 bg-white bg-opacity-70 text-white rounded-sm p-2'>
            <div className='rounded overflow-hidden shadow-lg max-w-sm'>
                <img className='w-full h-60 p-5' src={menu?.images[0].url} alt="property Image" />
                <div className='px-6 py-4'>
                    <div className='flex items-center justify-between mb-2'>
                       <div className='font-bold text-2xl text-black'>
                       {(menu?.brandname || menu?.modelname) ? `${menu?.brandname},${menu?.modelname}` : menu?.propertyname}
                       </div>
                       <div onClick={()=>{setDetails(!details)}} className='font-bold text-2xl text-red-800 place-items-end rounded-lg p-2 hover:text-blue-700 hover:cursor-pointer hover:bg-gray-300'>
                            <div className="mx-auto">
                                <BiDetail size={20} className="mx-auto" />
                            </div>
                            <div className='font-extralight text-sm font-semibold'>
                                show all details
                            </div>
                       </div>
                    </div>
                    <div className='font-semibold text-black text-sm text-xl mb-2'>
                    {menu?.destination},{menu?.district}
                    </div>
                    <div className='font-normal text-xl mb-2'>
                    {menu?.fuelType ? (
                                <div className='text-gray-600'>
                                Fuel Type: <span className='text-black font-semibold'>{menu.fuelType}</span>
                                </div>
                            ) : (
                                <div className='text-gray-600'>
                                Address: <span className='text-black text-sm'>{menu.address}</span>
                                </div>
                            )}
                    </div>
                    
                    {details && (
                        <div>
                            <div className="font-normal text-xl mb-2">
                            {menu?.extraFair ? (
                                    <div className='text-gray-600'>
                                    Extra Fair (After 150 kms):{' '}
                                    <span className='text-black font-semibold'>{menu.extraFair}</span>
                                    </div>
                                ) : (
                                    <>
                                    {menu?.description && (
                                        <div className='text-gray-600'>
                                        Extra Features:{' '}
                                        {menu.description.split(',').map((item, index) => (
                                            <span key={index} className='text-lg text-black'>{item.trim()}</span>
                                        ))}
                                        </div>
                                    )}
                                    </>
                                )}
                            </div>
                            <div className="font-normal text-xl mb-2">
                               {menu?.registerNumber ? (
                                    <div className='text-gray-600'>
                                    Register Number: <span className='text-red-600 font-semibold'>{menu.registerNumber}</span>
                                    </div>
                                ) : (
                                    <div className='text-gray-600'>
                                    Base Price: <span className='text-red-600'>₹{menu.baseprice}</span>
                                    </div>
                                )}
                            </div>
                            <div className="font-normal text-xl mb-2">
                            {menu?.seatingCapacity ? (
                                <div className='text-gray-600'>
                                Seating Capacity: <span className='text-red-600 font-semibold'>{menu.seatingCapacity}</span>
                                </div>
                            ) : (
                                <div className='text-gray-600'>
                                Net Price: <span className='text-red-600'>₹{menu.netprice}</span>
                                </div>
                            )}
                            </div>
                            <div className="font-normal text-xl mb-2">
                            {menu?.numberOfRooms ? (
                                <div className='text-gray-600'>
                                Number Of Rooms: <span className='text-red-600 font-semibold'>{menu.numberOfRooms}</span>
                                </div>
                            ) :<></>
                            }
                            </div>
                            <div className="font-normal text-gray-600 text-xl mb-2">
                            Uploaded On:{' '}
                            <span className="text-black font-semibold">{menu?.createdAt.slice(0, 10)}</span>
                            </div>
                            <div onClick={()=>{setOwner(!owner)}} className="font-normal text-sm text-blue-500 underline text-center text-xl mb-2 hover:cursor-pointer">
                                 See Owner details{' '}
                            </div>
                            <div onClick={()=>{setDocument(!document)}} className="font-normal text-sm text-blue-500 underline text-center text-xl mb-2 hover:cursor-pointer">
                                 See Document{' '}
                            </div>
                        </div>
                        )}

                        {owner && (
                            <div>
                                <div className="font-normal text-xl mb-2 text-gray-600">
                                Owner Name:{' '}
                                <span className="text-red-600 font-semibold">{menu?.propertyholder.firstname} {menu?.propertyholder.lastname}</span>
                                </div>

                                <div className="font-normal text-xl mb-2 text-gray-600">
                                PhoneNumber:{' '}
                                <span className="text-red-600 font-semibold">{menu?.propertyholder.phonenumber}</span>
                                </div>
                                
                            </div>
                            )}

                        {document && (
                            <img className='w-full h-60 p-5' src={menu?.document.url} alt="Document image" />
                        )}


                    <p className='text-sm text-gray-700 font-light'>
                        The Property holder asking you to access to show his property to the users... 
                    </p>
                    <div className='grid grid-flow-col gap-5 pb-2 px-6 mt-5'>
                        <button onClick={()=>{setOpen(true);setModalData(menu)}} className="   py-2 text-sm tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Approve
                        </button>
                    </div>
                </div>
            </div>
        </div>

      ))   
      }

{
            
            propData.homestayData?.map((menu, index)=>(
             <div className='my-10 bg-white bg-opacity-70 text-white rounded-sm p-2'>
               <div className='rounded overflow-hidden shadow-lg max-w-sm'>
                   <img className='w-full h-60 p-5' src={menu?.images[0].url} alt="property Image" />
                   <div className='px-6 py-4'>
                       <div className='flex items-center justify-between mb-2'>
                          <div className='font-bold text-2xl text-black'>
                          {(menu?.brandname || menu?.modelname) ? `${menu?.brandname},${menu?.modelname}` : menu?.propertyname}
                          </div>
                          <div onClick={()=>{setDetails(!details)}} className='font-bold text-2xl text-red-800 place-items-end rounded-lg p-2 hover:text-blue-700 hover:cursor-pointer hover:bg-gray-300'>
                               <div className="mx-auto">
                                   <BiDetail size={20} className="mx-auto" />
                               </div>
                               <div className='font-extralight text-sm font-semibold'>
                                   show all details
                               </div>
                          </div>
                       </div>
                       <div className='font-semibold text-black text-sm text-xl mb-2'>
                       {menu?.destination},{menu?.district}
                       </div>
                       <div className='font-normal text-xl mb-2'>
                       {menu?.fuelType ? (
                                   <div className='text-gray-600'>
                                   Fuel Type: <span className='text-black font-semibold'>{menu.fuelType}</span>
                                   </div>
                               ) : (
                                   <div className='text-gray-600'>
                                   Address: <span className='text-black text-sm'>{menu.address}</span>
                                   </div>
                               )}
                       </div>
                       
                       {details && (
                           <div>
                               <div className="font-normal text-xl mb-2">
                               {menu?.extraFair ? (
                                       <div className='text-gray-600'>
                                       Extra Fair (After 150 kms):{' '}
                                       <span className='text-black font-semibold'>{menu.extraFair}</span>
                                       </div>
                                   ) : (
                                       <>
                                       {menu?.description && (
                                           <div className='text-gray-600'>
                                           Extra Features:{' '}
                                           {menu.description.split(',').map((item, index) => (
                                               <span key={index} className='text-lg text-black'>{item.trim()}</span>
                                           ))}
                                           </div>
                                       )}
                                       </>
                                   )}
                               </div>
                               <div className="font-normal text-xl mb-2">
                                  {menu?.registerNumber ? (
                                       <div className='text-gray-600'>
                                       Register Number: <span className='text-red-600 font-semibold'>{menu.registerNumber}</span>
                                       </div>
                                   ) : (
                                       <div className='text-gray-600'>
                                       Base Price: <span className='text-red-600'>₹{menu.baseprice}</span>
                                       </div>
                                   )}
                               </div>
                               <div className="font-normal text-xl mb-2">
                               {menu?.seatingCapacity ? (
                                   <div className='text-gray-600'>
                                   Seating Capacity: <span className='text-red-600 font-semibold'>{menu.seatingCapacity}</span>
                                   </div>
                               ) : (
                                   <div className='text-gray-600'>
                                   Net Price: <span className='text-red-600'>₹{menu.netprice}</span>
                                   </div>
                               )}
                               </div>
                               <div className="font-normal text-xl mb-2">
                               {menu?.numberOfRooms ? (
                                   <div className='text-gray-600'>
                                   Number Of Rooms: <span className='text-red-600 font-semibold'>{menu.numberOfRooms}</span>
                                   </div>
                               ) :<></>
                               }
                               </div>
                               <div className="font-normal text-gray-600 text-xl mb-2">
                               Uploaded On:{' '}
                               <span className="text-black font-semibold">{menu?.createdAt.slice(0, 10)}</span>
                               </div>
                               <div onClick={()=>{setOwner(!owner)}} className="font-normal text-sm text-blue-500 underline text-center text-xl mb-2 hover:cursor-pointer">
                                    See Owner details{' '}
                               </div>
                               <div onClick={()=>{setDocument(!document)}} className="font-normal text-sm text-blue-500 underline text-center text-xl mb-2 hover:cursor-pointer">
                                    See Document{' '}
                               </div>
                           </div>
                           )}
   
                           {owner && (
                               <div>
                                   <div className="font-normal text-xl mb-2 text-gray-600">
                                   Owner Name:{' '}
                                   <span className="text-red-600 font-semibold">{menu?.propertyholder.firstname} {menu?.propertyholder.lastname}</span>
                                   </div>
   
                                   <div className="font-normal text-xl mb-2 text-gray-600">
                                   PhoneNumber:{' '}
                                   <span className="text-red-600 font-semibold">{menu?.propertyholder.phonenumber}</span>
                                   </div>
                                   
                               </div>
                               )}
   
                           {document && (
                               <img className='w-full h-60 p-5' src={menu?.document.url} alt="Document image" />
                           )}
   
   
                       <p className='text-sm text-gray-700 font-light'>
                           The Property holder asking you to access to show his property to the users... 
                       </p>
                       <div className='grid grid-flow-col gap-5 pb-2 px-6 mt-5'>
                           <button onClick={()=>{setOpen(true);setModalData(menu)}} className="   py-2 text-sm tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                   Approve
                           </button>
                       </div>
                   </div>
               </div>
           </div>
   
         ))   
         }

         {
            propData.hotelData?.map((menu, index)=>(
             <div className='my-10 bg-white bg-opacity-70 text-white rounded-sm p-2'>
               <div className='rounded overflow-hidden shadow-lg max-w-sm'>
                   <img className='w-full h-60 p-5' src={menu?.images[0].url} alt="property" />
                   <div className='px-6 py-4'>
                       <div className='flex items-center justify-between mb-2'>
                          <div className='font-bold text-2xl text-black'>
                          {(menu?.brandname || menu?.modelname) ? `${menu?.brandname},${menu?.modelname}` : menu?.propertyname}
                          </div>
                          <div onClick={()=>{setDetails(!details)}} className='font-bold text-2xl text-red-800 place-items-end rounded-lg p-2 hover:text-blue-700 hover:cursor-pointer hover:bg-gray-300'>
                               <div className="mx-auto">
                                   <BiDetail size={20} className="mx-auto" />
                               </div>
                               <div className='font-extralight text-sm font-semibold'>
                                   show all details
                               </div>
                          </div>
                       </div>
                       <div className='font-semibold text-black text-sm text-xl mb-2'>
                       {menu?.destination},{menu?.district}
                       </div>
                       <div className='font-normal text-xl mb-2'>
                       {menu?.fuelType ? (
                                   <div className='text-gray-600'>
                                   Fuel Type: <span className='text-black font-semibold'>{menu.fuelType}</span>
                                   </div>
                               ) : (
                                   <div className='text-gray-600'>
                                   Address: <span className='text-black text-sm'>{menu.address}</span>
                                   </div>
                               )}
                       </div>
                       
                       {details && (
                           <div>
                               <div className="font-normal text-xl mb-2">
                               {menu?.extraFair ? (
                                       <div className='text-gray-600'>
                                       Extra Fair (After 150 kms):{' '}
                                       <span className='text-black font-semibold'>{menu.extraFair}</span>
                                       </div>
                                   ) : (
                                       <>
                                       {menu?.description && (
                                           <div className='text-gray-600'>
                                           Extra Features:{' '}
                                           {menu.description.split(',').map((item, index) => (
                                               <span key={index} className='text-lg text-black'>{item.trim()}</span>
                                           ))}
                                           </div>
                                       )}
                                       </>
                                   )}
                               </div>
                               <div className="font-normal text-xl mb-2">
                                  {menu?.registerNumber ? (
                                       <div className='text-gray-600'>
                                       Register Number: <span className='text-red-600 font-semibold'>{menu.registerNumber}</span>
                                       </div>
                                   ) : (
                                       <div className='text-gray-600'>
                                       Base Price: <span className='text-red-600'>₹{menu.baseprice}</span>
                                       </div>
                                   )}
                               </div>
                               <div className="font-normal text-xl mb-2">
                               {menu?.seatingCapacity ? (
                                   <div className='text-gray-600'>
                                   Seating Capacity: <span className='text-red-600 font-semibold'>{menu.seatingCapacity}</span>
                                   </div>
                               ) : (
                                   <div className='text-gray-600'>
                                   Net Price: <span className='text-red-600'>₹{menu.netprice}</span>
                                   </div>
                               )}
                               </div>
                               <div className="font-normal text-xl mb-2">
                               {menu?.numberOfRooms ? (
                                   <div className='text-gray-600'>
                                   Number Of Rooms: <span className='text-red-600 font-semibold'>{menu.numberOfRooms}</span>
                                   </div>
                               ) :<></>
                               }
                               </div>
                               <div className="font-normal text-gray-600 text-xl mb-2">
                               Uploaded On:{' '}
                               <span className="text-black font-semibold">{menu?.createdAt.slice(0, 10)}</span>
                               </div>
                               <div onClick={()=>{setOwner(!owner)}} className="font-normal text-sm text-blue-500 underline text-center text-xl mb-2 hover:cursor-pointer">
                                    See Owner details{' '}
                               </div>
                               <div onClick={()=>{setDocument(!document)}} className="font-normal text-sm text-blue-500 underline text-center text-xl mb-2 hover:cursor-pointer">
                                    See Document{' '}
                               </div>
                           </div>
                           )}
   
                           {owner && (
                               <div>
                                   <div className="font-normal text-xl mb-2 text-gray-600">
                                   Owner Name:{' '}
                                   <span className="text-red-600 font-semibold">{menu?.propertyholder.firstname} {menu?.propertyholder.lastname}</span>
                                   </div>
   
                                   <div className="font-normal text-xl mb-2 text-gray-600">
                                   PhoneNumber:{' '}
                                   <span className="text-red-600 font-semibold">{menu?.propertyholder.phonenumber}</span>
                                   </div>
                                   
                               </div>
                               )}
   
                           {document && (
                               <img className='w-full h-60 p-5' src={menu?.document.url} alt="Document image" />
                           )}
   
   
                       <p className='text-sm text-gray-700 font-light'>
                           The Property holder asking you to access to show his property to the users... 
                       </p>
                       <div className='grid grid-flow-col gap-5 pb-2 px-6 mt-5'>
                           <button onClick={()=>{setOpen(true);setModalData(menu)}} className="   py-2 text-sm tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                   Approve
                           </button>
                       </div>
                   </div>
               </div>
           </div>
         ))   
         }


        </div>
        <Modal open={open} onClose={()=>setOpen(false)}>
            <div className='text-center w-56'>

               <GiConfirmed size={56} className='mx-auto text-green-600'></GiConfirmed>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-gray-800 '>Confirm Approve</h3>
                     <p className='text-sm text-gray-500'>Are you sure to list this item?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setOpen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleListSubmit} className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full">Approve</button>
                </div>
            </div>
        </Modal>

        <Modal open={openSuccess} onClose={()=>setOpenSuccess(false)}>
            <div className='text-center w-56'>

               <GiConfirmed size={56} className='mx-auto text-green-600'></GiConfirmed>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-green-800 '>Successfull</h3>
                     <p className='text-sm text-gray-500'>You successfully approved a property</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>{setOpenSuccess(false);setApproved(!approved)}} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Ok</button>
                </div>
            </div>
        </Modal>
      
    </>
  )
}

export default ProperNotifications
