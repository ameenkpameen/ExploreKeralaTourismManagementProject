import React from 'react'
import { useLocation } from 'react-router-dom'

function ViewOrderDetails() {
    const location = useLocation()
    const data = location.state
    const from = data.fromDate.slice(0,10)
    const to = data.toDate.slice(0,10)
    const orderedDate = data.createdAt.slice(0,10)
    // console.log(data);
  return (
    <div>
      <div className='text-center max-w-4xl mt-10 mb-6 rounded-lg'>
             <div class="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                   <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800">{data.type} Summary</h3>
                   
                   <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                     <h1 className='text-green-400'>Property Summery</h1>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Property Name</p>
                       <p class="text-base ml-10 dark:text-gray-300 leading-4 text-gray-600">{data.propertyname}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Destination</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{data.destination}</p>
                     </div>
                     
                     <h1 className='text-green-400'>Order Details</h1>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Ordered On</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{orderedDate}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">No.of Days</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{data.numberofdays}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">From</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{from}</p>
                     </div>
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">To</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{to}</p>
                     </div>
                     <div class="flex justify-between items-center w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Amount Paid </p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{data.amountpaid}(50%)</p>
                     </div>
                     <div class="flex justify-between items-center w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Discount</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{data.discount}</p>
                     </div>
                     <div class="flex justify-between items-center w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Amount to be Paid </p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">₹{data.amounttobepaid}</p>
                     </div>
                   </div>

                   <div class="flex justify-between items-center w-full">
                     <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Balance</p>
                     <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">000</p>
                   </div>

                   <h1 className='text-green-400'>Costomer Details</h1>
                   <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Costomer Name</p>
                       <p class="text-base ml-10 dark:text-gray-300 leading-4 text-gray-600">{data.costomer.firstname} {data.costomer.lastname}</p>
                     </div>

                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Email</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{data.costomer.email}</p>
                     </div>

                     <div class="flex justify-between w-full">
                       <p class="text-base dark:text-white leading-4 text-gray-800">Phone Number</p>
                       <p class="text-base dark:text-gray-300 leading-4 text-gray-600">{data.costomer.phonenumber}</p>
                     </div>
                   </div>
                 </div>
           </div>
    </div>
  )
}

export default ViewOrderDetails
