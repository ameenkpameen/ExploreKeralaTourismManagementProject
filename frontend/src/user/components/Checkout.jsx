import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import OrderConfirmation from './OrderConfirmation';
import { useSelector } from 'react-redux';
import {AiOutlineCopy} from 'react-icons/ai'
import Modal from './Modal';
import { FcCancel } from 'react-icons/fc'
import { getCoupensForUsers, getProfileData, savingOrder } from '../../api/UserAPI'
import TokenExpireModal from './TokenExpireModal';


function Checkout() {
    const location = useLocation();
    const {checkoutCostomer,checkoutProp,checkoutConditions } = location.state;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = checkoutProp.images;
    const timeInterval = 2000;
    const [checkoutData, setCheckoutData] = useState('')
    const [walletConfirm, setWalletConfirm] = useState(false)
    const [userData, setUserData] = useState('')
    const [coupenData, setCoupenData] = useState([])
    const [coupenError, setCoupenError] = useState('')
    const [coupenModalOpen, setCoupenModalOpen] = useState(false)
    const [copyModalOpen, setCopyModalOpen] = useState(false)
    const [errorCatch, setErrorCatch]= useState('')

    useEffect(() => {
        const updateImageIndex = () => {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        };
        const interval = setInterval(updateImageIndex, timeInterval);
        return () => {
          clearInterval(interval);
        };
      }, [images.length, timeInterval]);

    const startDate = new Date(checkoutConditions.fromDate);
    const endDate = new Date(checkoutConditions.toDate);
    const timeDifference = endDate.getTime() - startDate.getTime();
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const payAmount = (daysDifference*checkoutProp.netprice)/2
    const cabPayAmount = (daysDifference*checkoutProp.minCharge)/2
    
    const userLogin = useSelector((state)=> state.userLogin)
    const {loading,error,userInfo} = userLogin
    const [discount, setDiscount] = useState(0)
    const [discountChange, setDiscountChange] = useState(false)
     
    const id = userInfo._id

   useEffect(()=>{
        async function getUserInfo(){
            try {
                const {data} = getProfileData(id)
                if(data){
                    setUserData(data.user)
                }
            } catch (error) {
                if(error.response.data.message === 'jwt expired'){
                    localStorage.removeItem('userInfo')
                    setErrorCatch(error.response.data.message)
                }
            }
        }
        getUserInfo()
        
      if(checkoutConditions.type === 'Cab'){
         var data = {
            propertyId:checkoutProp._id,
            costomerId:checkoutCostomer._id,
            propertyholder:checkoutProp.propertyholder,
            propertyname:checkoutProp.brandname+','+checkoutProp.modelname,
            propertytype:checkoutConditions.type,
            destination:checkoutProp.destination,
            images:checkoutProp.images,
            noofpeople:checkoutConditions.numberOfPeople,
            fromdate:checkoutConditions.fromDate,
            todate:checkoutConditions.toDate,
            costomername:checkoutCostomer.firstname+' '+checkoutCostomer.lastname,
            costomerphone:checkoutCostomer.phonenumber,
            costomeremail:checkoutCostomer.email,
            costomerWallet:checkoutCostomer.wallet,
            propertyprice:checkoutProp.minCharge,
            discount:discount,
            lastprice:checkoutProp.minCharge-discount,
            numberofdays:daysDifference,
            amountpayable:cabPayAmount,
            amountBalance:cabPayAmount-discount
        }
      }else{

             data = {
                propertyId:checkoutProp._id,
                costomerId:checkoutCostomer._id,
                propertyholder:checkoutProp.propertyholder,
                propertyname:checkoutProp.propertyname,
                propertytype:checkoutConditions.type,
                destination:checkoutProp.destination,
                images:checkoutProp.images,
                noofpeople:checkoutConditions.numberOfPeople,
                fromdate:checkoutConditions.fromDate,
                todate:checkoutConditions.toDate,
                costomername:checkoutCostomer.firstname+' '+checkoutCostomer.lastname,
                costomerphone:checkoutCostomer.phonenumber,
                costomeremail:checkoutCostomer.email,
                costomerwallet:checkoutCostomer.wallet,
                propertyprice:checkoutProp.baseprice,
                discount:discount,
                lastprice:checkoutProp.netprice-discount,
                numberofdays:daysDifference,
                amountpayable:payAmount,
                amountBalance:payAmount-discount
            }
      }
      setCheckoutData(data);
   },[discountChange])

     const handleCheckoutSubmit = async(e)=>{
        e.preventDefault();
        console.log(checkoutData);
        try {
            const saveOrder = await savingOrder(checkoutData)
            if(saveOrder){
                setWalletConfirm(true)
            }
        } catch (error) {
            if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('userInfo')
                setErrorCatch(error.response.data.message)
            }
        }
     }

    
  return (

    <div>
      <div className='flex justify-center'>
        <div className='container mx-40 min-h-screen items-center mt-32'>
        {!walletConfirm ?
      <div className="relative mx-auto w-full bg-white ">
        <div className="grid min-h-screen grid-cols-10 p-10">
            <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
                <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Secure Checkout<span class="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span></h1>
                    <form action="" className="mt-10 flex flex-col space-y-4">
                         <h1 className='text-lg text-blue-600'>Order Details</h1>
                        <div className='flex flex-row'>
                            {checkoutProp.propertyname ?
                                <div className='w-1/2 mr-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Property Name</label>
                                    <input readOnly type="text" id="email" name="propertyname" value={checkoutProp.propertyname} placeholder="Property Name" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> :
                                <div className='w-1/2 mr-1'>
                                  <label for="email" className="text-xs font-semibold text-gray-500">Property Brand and model</label>
                                  <input readOnly type="text" id="email" name="propertyname" value={checkoutProp.brandname+','+checkoutProp.modelname} placeholder="Property Name" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div>
                            }
                            <div className='w-1/2 ml-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">Property Type</label>
                                <input readOnly type="text" id="email" name="propertytype" value={checkoutConditions.type} placeholder="Property Type" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='w-1/2 mr-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">Destination</label>
                                <input readOnly type="text" id="email" name="destination" value={checkoutProp.destination} placeholder="Destination" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                            <div className='w-1/2 ml-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">No.of People</label>
                                <input readOnly type="number" id="email" name="noofpeople" value={checkoutConditions.numberOfPeople} placeholder="No.of People" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>
                        <div className='flex flex-row'>
                            <div className='w-1/2 mr-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">From Date</label>
                                <input readOnly type="date" id="email" name="fromdate" value={checkoutConditions.fromDate} placeholder="From Date" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                            <div className='w-1/2 ml-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">To Date</label>
                                <input readOnly type="date" id="email" name="todate"  value={checkoutConditions.toDate} placeholder="From Date" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>
                        <h1 className='text-lg text-blue-600'>Costomer Details</h1>
                        <div className='flex flex-row'>
                            <div className='w-1/2 mr-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">Name</label>
                                <input readOnly type="text" id="email" name="costomername" value={checkoutCostomer.firstname+' '+checkoutCostomer.lastname} placeholder="Name" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                            <div className='w-1/2 ml-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">Phone Number</label>
                                <input readOnly type="number" id="email" name="costomerphone" value={checkoutCostomer.phonenumber} placeholder="Phone Number" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                        </div>
                        <div className="relative">
                            <label for="card-number" className="text-xs font-semibold text-gray-500">Email Address</label>
                            <input readOnly type="email" id="card-number" name="costomeremail" value={checkoutCostomer.email} placeholder="john.capler@fang.com" class="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" class="absolute bottom-3 right-3 max-h-4" />
                        </div>
                        
                        <h1 className='text-lg text-blue-600'>Price Details</h1>
                        <div className='flex flex-row'>
                            {checkoutProp.netprice ?
                                <div className='w-1/2 mr-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Price</label>
                                    <input readOnly type="number" id="email" name="propertyprice" value={checkoutProp.netprice} placeholder="Base Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> :
                                <div className='w-1/2 mr-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Min Charge</label>
                                    <input readOnly type="number" id="email" name="propertyprice" value={checkoutProp.minCharge} placeholder="Base Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div>
                            }
                            {checkoutProp.netprice ?
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Total Price</label>
                                    <input readOnly type="number" id="email" name="lastprice" value={(checkoutProp.netprice)*daysDifference} placeholder="Net Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> :
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Total Price</label>
                                    <input readOnly type="number" id="email" name="lastprice" value={(checkoutProp.minCharge)*daysDifference} placeholder="Net Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div>
                            }
                        </div>

                        <div className='flex flex-row'>
                            {checkoutProp.netprice ?
                                <div className='w-1/2 mr-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Discount</label>
                                    <input readOnly type="number" id="email" name="propertyprice" value={discount} placeholder="Base Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> :
                                <div className='w-1/2 mr-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Discount</label>
                                    <input readOnly type="number" id="email" name="propertyprice" value={discount} placeholder="Base Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div>
                            }
                            {checkoutProp.netprice ?
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Last Price</label>
                                    <input readOnly type="number" id="email" name="lastprice" value={((checkoutProp.netprice)*daysDifference)-discount} placeholder="Net Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> :
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Last Price</label>
                                    <input readOnly type="number" id="email" name="lastprice" value={((checkoutProp.minCharge)*daysDifference)-discount} placeholder="Net Price" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div>
                            }
                        </div>

                        <div className='flex flex-row'>
                            <div className='w-1/2 mr-1'>
                                <label for="email" className="text-xs font-semibold text-gray-500">No.of Days</label>
                                <input readOnly type="number" id="email" name="numberofdays" value={daysDifference} placeholder="No.of Days" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                            </div>
                            {checkoutProp.netprice ?
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Amount to be paid in advance(50%)</label>
                                    <input readOnly type="number" id="email" name="amountpayable" value={payAmount} placeholder="Amount to be paid" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div> :
                                <div className='w-1/2 ml-1'>
                                    <label for="email" className="text-xs font-semibold text-gray-500">Amount to be paid in advance(50%)</label>
                                    <input readOnly type="number" id="email" name="amountpayable" value={cabPayAmount} placeholder="Amount to be paid" class="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500" />
                                </div>
                            }
                            
                        </div>
                        <p className="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <span  class="whitespace-nowrap text-teal-400 underline hover:text-teal-600">Terms and Conditions</span></p>
                        <span onClick={handleCheckoutSubmit} className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg">Place Order</span>
                    </form>
                    
                </div>
              </div>
            <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
                <h2 className="sr-only">Order summary</h2>
                <div>
                    <img src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" class="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-800 to-teal-400 opacity-95"></div>
                </div>
                <div className="relative">
                    <ul className="space-y-5">
                    <li className="flex justify-between">
                        <div className="inline-flex">
                          <img src={checkoutProp.images[currentImageIndex].url} alt="" class="max-h-16 w-24 h-20" />
                        <div className="ml-3">
                        {checkoutProp.propertyname ? 
                            <p className="text-base font-semibold text-white">{checkoutProp.propertyname}</p> :
                            <p className="text-base font-semibold text-white">{checkoutProp.brandname+','+checkoutProp.modelname}</p>
                        }
                            <p className="text-sm font-medium text-white text-opacity-80">{checkoutProp.destination+','+checkoutProp.district}</p>
                        </div>
                        </div>
                        {checkoutProp.netprice ?
                             <p className="text-sm font-semibold text-white ml-5">₹{checkoutProp.netprice}</p>:
                             <p className="text-sm font-semibold text-white ml-5">₹{checkoutProp.minCharge}</p>
                        }
                    </li>
                    
                    </ul>
                    <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                    <div className="space-y-2">
                        {checkoutProp.netprice ?
                             <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>₹{(checkoutProp.netprice)*daysDifference}</span></p>:
                             <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>₹{(checkoutProp.minCharge)*daysDifference}</span></p>
                        }
                        {checkoutProp.netprice ?
                            <p className="flex justify-between text-sm font-medium text-white"><span>Payable Price</span><span>₹{payAmount}</span></p> :
                            <p className="flex justify-between text-sm font-medium text-white"><span>Payable Price</span><span>₹{cabPayAmount}</span></p>
                        }
                        {checkoutProp.netprice ?
                            <p className="flex justify-between text-sm font-medium text-white"><span>Pay Later</span><span>₹{payAmount}</span></p> :
                            <p className="flex justify-between text-sm font-medium text-white"><span>Pay Later</span><span>₹{cabPayAmount}</span></p>
                        }
                    </div>
                </div>

                <div className="relative mt-10 text-white">
                    <h3 className="mb-5 text-lg font-bold">Support</h3>
                    <p className="text-sm font-semibold">+01 653 235 211 <span className="font-light">(International)</span></p>
                    <p className="mt-1 text-sm font-semibold">support@exploreKerala.com <span className="font-light">(Email)</span></p>
                    <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
                </div>
                 {/*   */}

                <div className="relative mt-10 flex">
                    <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span class="text-xs font-medium text-white">within 30 days of purchase</span></p>
                </div>
            </div>
          </div> 
        </div> :
        <div>
            <OrderConfirmation data={checkoutData} />
        </div>
     }
        <Modal open={coupenModalOpen} onClose={()=>setCoupenModalOpen(false)}>
              <div className='text-center w-56'>

                <FcCancel size={40} className='mx-auto text-red-600'></FcCancel>
                <div className='mx-auto my-4 w-48'>
                      
                      <p className='text-sm text-gray-500'>{coupenError}</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setCoupenModalOpen(false)} className="btn bg-red-600 text-white shadow-lg hover:bg-red-700 text-sm p-2 rounded-lg w-full">Ok</button>
                </div>
              </div>
        </Modal>

        <Modal open={copyModalOpen} onClose={()=>setCopyModalOpen(false)}>
              <div className='text-center w-56'>

                <AiOutlineCopy size={40} className='mx-auto text-blue-600'></AiOutlineCopy>
                <div className='mx-auto my-4 w-48'>
                      <p className='text-sm text-gray-500'>Congrats...</p>
                      <p className='text-sm text-gray-500'>Coupen Code copied to clipboard</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setCopyModalOpen(false)} className="btn bg-red-600 text-white shadow-lg hover:bg-red-700 text-sm p-2 rounded-lg w-full">Ok</button>
                </div>
              </div>
        </Modal>
    </div>
    </div>
    {errorCatch !== '' &&
        <TokenExpireModal message={errorCatch} />
    }
    </div>

  )
}

export default Checkout
