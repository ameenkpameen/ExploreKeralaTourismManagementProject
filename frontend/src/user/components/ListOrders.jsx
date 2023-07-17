import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Modal from './Modal'

import axios from 'axios';
import baseURL from '../../config';
import { useNavigate } from 'react-router-dom'



function ListOrders() {
    const navigate = useNavigate()
    const [orderData, setOrderData] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [modalData, setModalData] = useState('')

    const userLogin = useSelector((state)=> state.userLogin)
    const {loading,error,userInfo} = userLogin
     

    if(localStorage.userInfo !== undefined){
        var user = JSON.parse(localStorage.userInfo);
      }
    
    const id = userInfo._id
    // console.log(id);

    useEffect(()=>{
        const getData = async()=>{
                const data = await axios.get(`${baseURL}/getorders/${id}`)
                if(data){
                    console.log(data);
                    setOrderData(data.data.data)
                }
        }
        getData()
    },[])

    // console.log(orderData);

  
  return (
    <div>
       <div class="bg-white p-8 rounded-md w-full">
	 <div class=" flex items-center justify-between pb-6">
		<div>
			<h2 class="text-gray-600 font-semibold">Your Orders</h2>
			<span class="text-xs">All Order items</span>
		</div>
		<div class="flex items-center justify-between">
			{/* <div class="flex bg-gray-50 items-center p-2 rounded-md">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
					fill="currentColor">
					<path fill-rule="evenodd"
						d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
						clip-rule="evenodd" />
				</svg>
				<input class="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
            </div> */}
				
			</div>
		</div>
		<div>
			<div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
        {orderData.length <1 &&
            <h1 className='text-center text-lg text-red-600'>No Orders Yet....!!!</h1>
        }
         
					<table class="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Property Name
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Destination
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Property Type
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									No.Of Days
								</th>
                                <th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Payment Type
								</th>
                                <th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Status
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Control
								</th>
							</tr>
						</thead>
						<tbody>
                            {orderData && orderData.length>0 && orderData.map((element,i)=>(
                               <tr>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {element.propertyname}
                                                    </p>
                                                </div>
                                            </div>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{element.destination}</p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.type}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.numberofdays}
                                        </p>
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {element.paymentmethod === 'stripe' ?
                                            <p class="text-red-600 whitespace-no-wrap">
                                            {element.paymentmethod}
                                            </p> :
                                            <p class="text-green-700 whitespace-no-wrap">
                                            {element.paymentmethod}
                                            </p>
                                        }
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        {element.status === 'confirmed' ?
                                        <p class="text-green-700 whitespace-no-wrap">
                                         {element.status}
                                        </p> :
                                        <p class="text-red-600 whitespace-no-wrap">
                                           {element.status}
                                         </p>
                                        }
                                    </td>
                                    <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <button onClick={()=>{navigate('/orderdetails',{state: element})}} class="relative inline-flex items-center justify-center p-0.5 mb-2 h-9 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                            <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                                Details
                                            </span>
                                        </button>
                                    </td>
                                </tr> 
                            ))}
							
							
						</tbody>
					</table>
                
					
				</div>
			</div>
		</div>
	 </div>
        
    </div>
  )
}

export default ListOrders
