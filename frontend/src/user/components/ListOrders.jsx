import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { getOrdersData } from '../../api/UserAPI';
import { FcViewDetails } from 'react-icons/fc'
import Modal from './Modal';
import TokenExpireModal from './TokenExpireModal';



function ListOrders() {
    const navigate = useNavigate()
    const [orderData, setOrderData] = useState([])
    const [paymentModalOpen, setPaymentModalOpen] = useState(false)
    const [modalData, setModalData] = useState('')
    const [errorCatch, setErrorCatch]= useState('')

    const userLogin = useSelector((state)=> state.userLogin)
    const {loading,error,userInfo} = userLogin
     

    if(localStorage.userInfo !== undefined){
        var user = JSON.parse(localStorage.userInfo);
      }
    
    const id = userInfo ? userInfo._id : navigate('/')

    useEffect(()=>{
        const getData = async()=>{
            try {
                const data = await getOrdersData(id)
                if(data){
                    setOrderData(data.data.data)
                }
            } catch (error) {
                if(error.response.data.message === 'jwt expired'){
                    localStorage.removeItem('userInfo')
                    setErrorCatch(error.response.data.message)
                }
            }
        }
        getData()
    },[])

    // console.log(orderData);

  
  return (
    <div>
     <div className='flex justify-center'>
     <div className='container  lg:px-40 min-h-screen mt-32'>
       <div class="bg-transparent p-8 rounded-md w-full">
	   <div class=" flex items-center justify-between pb-6">
		<div>
			<h2 class="text-gray-50 text-xl font-semibold">Your Orders</h2>
			<span class="text-xs text-white">All Order items</span>
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
						<thead className=''>
							<tr>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Property Name
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Destination
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Property Type
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									No.Of Days
								</th>
                                <th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Payment Type
								</th>
                                <th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Status
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Control
								</th>
							</tr>
						</thead>
						<tbody>
                            {orderData && orderData.length>0 && orderData.map((element,i)=>(
                               <tr>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {element.propertyname}
                                                    </p>
                                                </div>
                                            </div>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{element.destination}</p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.type}
                                        </p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.numberofdays}
                                        </p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {element.paymentmethod === 'stripe' ?
                                            <p class="text-red-600 whitespace-no-wrap">
                                            {element.paymentmethod}
                                            </p> :
                                            <p class="text-green-700 whitespace-no-wrap">
                                            {element.paymentmethod}
                                            </p>
                                        }
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {element.status === 'confirmed' &&
                                        <p class="text-gray-900 font-semibold whitespace-no-wrap">
                                         {element.status}
                                        </p> 
                                        }
                                        {element.status === 'delivered' &&
                                        <p class="text-green-600 font-semibold whitespace-no-wrap">
                                         {element.status}
                                        </p> 
                                        }
                                        {element.status === 'cancelled' &&
                                        <p class="text-red-600 font-semibold whitespace-no-wrap">
                                         {element.status}
                                        </p> 
                                        }
                                        {element.status === 'Pending' &&
                                        <p class="text-blue-700 font-semibold whitespace-no-wrap">
                                         {element.status}
                                        </p> 
                                        }
                                        {element.status === 'approved' &&
                                        <>
                                            <p class="text-green-700 font-semibold whitespace-no-wrap">
                                            {element.status}
                                            </p> 
                                            
                                        </> 
                                        }
                                        
                                        {/* <p class="text-red-600 whitespace-no-wrap">
                                           {element.status}
                                         </p>
                                        } */}
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <div className='flex flex-row gap-0 cursor-pointer' onClick={()=>{navigate('/orderdetails',{state: element})}}>
                                            <div>
                                               < FcViewDetails size={25} />
                                            </div>
                                            <div>
                                                <p className=' mt-1 text-xs text-red-500'>Details</p>
                                            </div>
                                        </div>
                                        {element.status === 'approved' &&
                                            <p onClick={()=>{navigate('/orderdetails',{state: element})}} class=" mt-2 bg-red-600 rounded-sm w-fit text-gray-50 text-center text-xs p-1 whitespace-no-wrap">
                                               Make Payment
                                            </p>
                                        }
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
    </div>
        <Modal open={paymentModalOpen} onClose={()=>setPaymentModalOpen(false)}>
              <div className='text-center w-80'>

              <form action="" className="mt-10 flex flex-col space-y-4">
                         <h1 className='text-lg text-blue-600'>Order Details</h1>
                        <div className='flex flex-row'>
                            
                                <div className='w-1/2 mr-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Property Name</label>
                                    <input readOnly type="text" id="email" name="propertyname" value={modalData.propertyname} placeholder="Property Name" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> 
                            <div className='w-1/2 ml-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">Property Type</label>
                                <input readOnly type="text" id="email" name="propertytype" value={modalData.type} placeholder="Property Type" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='w-1/2 mr-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">Destination</label>
                                <input readOnly type="text" id="email" name="destination" value={modalData.destination} placeholder="Destination" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                            <div className='w-1/2 ml-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">Current Status</label>
                                <input readOnly type="number" id="email" name="noofpeople" value={modalData.status} placeholder="No.of People" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='w-1/2 mr-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">From Date</label>
                                <input readOnly type="date" id="email" name="fromdate" value={modalData.fromDate} placeholder="From Date" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                            <div className='w-1/2 ml-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">To Date</label>
                                <input readOnly type="date" id="email" name="todate"  value={modalData.toDate} placeholder="From Date" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>
                        
                        <h1 className='text-lg text-blue-600'>Price Details</h1>
                        <div className='flex flex-row'>
                            
                                <div className='w-1/2 mr-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Price</label>
                                    <input readOnly type="number" id="email" name="propertyprice" value={modalData.amounttobepaid} placeholder="Base Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> 
                            
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Amount Paid</label>
                                    <input readOnly type="number" id="email" name="lastprice" value={modalData.amountpaid} placeholder="Net Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div>
                        </div>

                        <div className='flex flex-row'>
                            
                                <div className='w-1/2 mr-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Discount</label>
                                    <input readOnly type="number" id="email" name="propertyprice" value={modalData.discount} placeholder="Base Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> 
                            
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Last Price</label>
                                    <input readOnly type="number" id="email" name="lastprice" value={(modalData.amounttobepaid)-modalData.discount} placeholder="Net Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> 
                        </div>

                        <div className='flex flex-row'>
                            <div className='w-1/2 mr-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">No.of Days</label>
                                <input readOnly type="number" id="email" name="numberofdays" value={modalData.numberofdays} placeholder="No.of Days" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                            
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Amount to be paid in advance(50%)</label>
                                    <input readOnly type="number" id="email" name="amountpayable" value={((modalData.amounttobepaid)/2)} placeholder="Amount to be paid" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> 
                            
                        </div>
                           {/* <div className="w-full mt-5 ml-1">
                                <label htmlFor="paymentMethod" className="text-lg text-blue-500">Payment Method <span className='text-xs text-gray-900 font-normal'>(plase select a payment Method)</span></label>
                                <div className="mt-1">
                                    <label className="inline-flex items-center mr-2">
                                        <input
                                            type="radio"
                                            id="paymentMethodWallet"
                                            name="paymentMethod"
                                            value="wallet"
                                            className="form-radio text-teal-500 h-4 w-4"
                                            onChange={handleCheckoutChange}
                                        />
                                        <span className="ml-2 text-base">Wallet</span>
                                    </label>
                                    <label className="inline-flex items-center ml-10">
                                        <input
                                            type="radio"
                                            id="paymentMethodStripe"
                                            name="paymentMethod"
                                            value="stripe"
                                            className="form-radio text-teal-500 h-4 w-4"
                                            onChange={handleCheckoutChange}
                                        />
                                        <span className="ml-2 text-base">Stripe</span>
                                    </label>
                                </div>
                                {methodError &&
                                  <p className="mt-3 text-sm font-semibold text-red-500">{methodError}</p>
                                }
                                {walletError &&
                                   <p className="mt-3 text-sm font-semibold text-red-500">{walletError}</p>
                                }
                            </div> */}
                            {/* <form action="">
                              <div className='flex flex-row'>
                                <div className="w-4/6">
                                        <label for="card-number" className="text-xs font-semibold text-gray-500">Coupen Code</label>
                                        <input  type="text" id="card-number" name="coupenCode" onChange={(e)=>setCoupenCode(e.target.value)} class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div>
                                <div className="w-1/6 ml-5 items-end text-right mt-9">
                                    <span onClick={handleSubmitCoupen} class="bg-blue-500 text-base font-thin hover:bg-blue-700 text-white py-2 px-4 border border-blue-700 rounded">
                                      Submit
                                    </span>
                                </div>
                              </div> 
                            </form> */}
                        <p className="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <span  class="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</span></p>
                        <span className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</span>
                    </form>
                <div className="flex gap-4">
                    <button onClick={()=>setPaymentModalOpen(false)} className="btn bg-red-600 text-white shadow-lg hover:bg-red-700 text-sm p-2 rounded-lg w-full">Ok</button>
                </div>
              </div>
        </Modal>
        {errorCatch !== '' &&
        <TokenExpireModal message={errorCatch} />
        }
    </div>
  )
}

export default ListOrders
