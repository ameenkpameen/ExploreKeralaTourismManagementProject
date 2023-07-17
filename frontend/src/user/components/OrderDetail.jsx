import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import baseURL from '../../config'
import Modal from './Modal'
import {FcCancel} from "react-icons/fc"
import {TiTick} from "react-icons/ti"
import { useNavigate } from 'react-router-dom'

function OrderDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state
    const from = data.fromDate.slice(0,10)
    const to = data.toDate.slice(0,10)
    const orderedDate = data.createdAt.slice(0,10)
    const [error, setError] = useState('')
    const [orderCancelModalOpen, setOrderCancelModalOpen] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [listData, setListdata] = useState('')

    const submitCancel = async()=>{
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so we add 1
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        const date1 = new Date(from);
        const date2 = new Date(formattedDate);
        const differenceInMilliseconds = date1 - date2;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        const isMoreThanThreeDaysBefore = differenceInDays > 3;
        if(! isMoreThanThreeDaysBefore){
           setError('Now..You cannot cancel this order');
           setOrderCancelModalOpen(false)
        }else{
          console.log(listData);
           const id = data._id 
           const resultData = await axios.post(`${baseURL}/cancelorder/${id}/${listData.type}`)
           if(resultData){
              setOrderCancelModalOpen(false)
              setConfirmModalOpen(true)
              setUpdated(!updated)
              console.log(resultData);
           }
        }
    }

    useEffect(()=>{
          const id = data._id
          const getOrderData = async()=>{
            const {data} = await axios.get(`${baseURL}/getorderdetails/${id}`)
            if(data){
              setListdata(data.Orderdata)
            }
          }
          getOrderData()
    },[updated])

  return (
    <div>
      <div className='text-center max-w-4xl mt-10 mb-6 rounded-lg'>
             <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                   <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">{listData.type} Summary</h3>
                   <img className='max-w-sm' src={listData.property && listData.property.images && listData.property.images[0].url} alt="" />
                   <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                     <h1 className='text-green-400 font-thin'>Property Summery</h1>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Property Name</p>
                       <p class="text-base ml-10 dark:text-gray-300 leading-4 text-gray-600">{listData.propertyname}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Property Destination</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{listData.destination}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Property Charge</p>
                       {listData.property && listData.property.netprice ?
                           <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{listData.property.netprice}</p> :
                           <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{listData.property && listData.property.minCharge && listData.property.minCharge}</p>
                       }
                     </div>
                     {listData.type === 'Cab' && 
                        <div class="flex justify-between items-center w-full">
                           <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">ExtraFair (After 150 kms)</p>
                           <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{listData.property && listData.property.extraFair && listData.property.extraFair}</p>
                        </div>
                        
                     }
                     {listData.type === 'Cab' && 
                        <div class="flex justify-between items-center w-full border-gray-200 border-b pb-4">
                           <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Register Number</p>
                           <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{listData.property && listData.property.registerNumber && listData.property.registerNumber}</p>
                        </div>
                     }
                     {listData.type === 'Hotel' && 
                        <div class="flex justify-between items-center w-full border-gray-200 border-b pb-4">
                           <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Property Type</p>
                           <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{listData.property && listData.property.type && listData.property.type}</p>
                        </div>
                     }
                     {listData.type === 'HomeStay' && 
                        <div class="flex justify-between items-center w-full border-gray-200 border-b pb-4">
                           <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Property Type</p>
                           <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{listData.property && listData.property.type && listData.property.type}</p>
                        </div>
                     }
                     <h1 className='text-green-400 font-thin'>Order Summery</h1>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Ordered On</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{orderedDate}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">No.of Days</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{listData.numberofdays}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">From</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{from}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">To</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{to}</p>
                     </div>
                     <div class="flex justify-between items-center w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Amount Paid </p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{listData.amountpaid}(50%)</p>
                     </div>
                     <div class="flex justify-between items-center w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Discount </p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{listData.discount}</p>
                     </div>
                     <div class="flex justify-between items-center w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800 font-thin">Amount to be Paid </p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{listData.amounttobepaid}</p>
                     </div>
                     
                   </div>
                   {listData.status === 'confirmed' &&
                         <>
                        <p className='text-xs text-white font-thin'>You can cancel this property only before 3 days of delivery</p>
                      <button className='w-full bg-white font-medium text-base p-2 rounded-md  text-red-600 hover:bg-red-600 hover:text-white' onClick={()=>setOrderCancelModalOpen(true)}>Cancel Order</button>
                      </> }
                       {listData.status === 'cancelled' &&
                           <button className='w-full bg-red-600 text-base p-2 rounded-md  text-white font-thin'>Order Cancelled</button>
                       }
                       {listData.status === 'delivered' &&
                           <button className='w-full bg-green-600 text-base p-2 rounded-md  text-white font-thin'>Order Delivered</button>
                       }
                   
                   {/* <div class="flex justify-between items-center w-full">
                     <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Balance</p>
                     <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">000</p>
                   </div> */}
                   {error &&
                       <p className='text-xs text-red-500 font-thin'>{error}</p> 
                  }
                 </div>
           </div>
           <Modal open={orderCancelModalOpen} onClose={()=>setOrderCancelModalOpen(false)}>
              <div className='text-center w-56'>

                <FcCancel size={40} className='mx-auto text-red-600'></FcCancel>
                <div className='mx-auto my-4 w-48'>
                      <h3 className='text-lg font-black text-gray-800 '>Confirm Cancel</h3>
                      <p className='text-sm text-gray-500'>Are you sure to cancel this order?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setOrderCancelModalOpen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 text-sm p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={submitCancel} className="btn bg-red-500 hover:bg-red-600 text-white text-sm p-2 rounded-lg w-full">Yes,Cancel it</button>
                </div>
              </div>
        </Modal>

        <Modal open={confirmModalOpen} onClose={()=>setConfirmModalOpen(false)}>
              <div className='text-center w-56'>

                <TiTick size={40} className='mx-auto text-green-600'></TiTick>
                <div className='mx-auto my-4 w-48'>
                      <h3 className='text-lg font-black text-gray-800 '>Cancellation Success.</h3>
                      <p className='text-sm text-gray-500'>Your paid amount added to your wallet</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setConfirmModalOpen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 text-sm p-2 rounded-lg w-full">Ok</button>
                    <button onClick={()=>navigate('/mywallet')}  className="btn bg-red-500 hover:bg-red-600 text-white text-sm p-2 rounded-lg w-full">Go Wallet</button>
                </div>
              </div>
        </Modal>
    </div>
  )
}

export default OrderDetail
