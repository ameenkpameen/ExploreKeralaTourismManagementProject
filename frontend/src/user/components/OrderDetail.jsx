import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Modal from './Modal'
import {FcCancel} from "react-icons/fc"
import {TiTick} from "react-icons/ti"
import { useNavigate } from 'react-router-dom'
import {  cancelOrderData, checkCoupen, getAvailableCoupens, getOrderDetails, getProfileData, walletOrderChange } from '../../api/UserAPI';
import {AiOutlineCopy} from 'react-icons/ai'
import StripeContainer from './StripeContainer'
import TokenExpireModal from './TokenExpireModal'
import { useSelector } from 'react-redux'

function OrderDetail() {
    const navigate = useNavigate()
    const location = useLocation()
    const Orderdata = location.state
    const from = Orderdata.fromDate.slice(0,10)
    const to = Orderdata.toDate.slice(0,10)
    const orderedDate = Orderdata.createdAt.slice(0,10)
    const [error, setError] = useState('')
    const [orderCancelModalOpen, setOrderCancelModalOpen] = useState(false)
    const [confirmModalOpen, setConfirmModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [listData, setListdata] = useState('')
    const [coupenData, setCoupenData] = useState([])
    const [copyModalOpen, setCopyModalOpen] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState('')
    const [coupenCode, setCoupenCode] = useState('')
    const [coupenError, setCoupenError] = useState('')
    const [coupenModalOpen, setCoupenModalOpen] = useState(false)
    const [discount, setDiscount] = useState(0)
    const [coupenShow, setCoupenShow] = useState(false)
    const [userData, setUserData] = useState('')
    const [coupenNew, setCoupenNew] = useState('')
    const [stripeOpen, setStripeOpen] = useState(false)
    const [paymentSuccessOpen, setPaymentSuccessOpen] = useState(false)
    const [errorCatch, setErrorCatch]= useState('')

    const userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin
    

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
           const id = Orderdata._id
           try {
             const resultData = cancelOrderData(id,listData.type)
             if(resultData){
                setUpdated(!updated)
                setOrderCancelModalOpen(false)
                setConfirmModalOpen(true)
                console.log(resultData);
             }
           } catch (error) {
              if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('userInfo')
                setErrorCatch(error.response.data.message)
              }
           }
        }
    }

    const copyToClipboard = (text) => {
      const textField = document.createElement('textarea');
      textField.innerText = text;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand('copy');
      textField.remove();
    
      setCopyModalOpen(true)
    };
    useEffect(()=>{
      async function getUserInfo(){
        try {
          const costomerId = userInfo._id
          const data = await getProfileData(costomerId)
          if(data){
              setUserData(data.data.user)
          }
        } catch (error) {
          if(error?.response?.data?.message === 'jwt expired'){
            localStorage.removeItem('userInfo')
            setErrorCatch(error.response.data.message)
          }
        }
      }
      getUserInfo()
    },[])

    useEffect(()=>{
          const id = Orderdata._id
          const costomerId = Orderdata.costomer
          const getOrderData = async()=>{
            try {
              const {data} = await getOrderDetails(id)
              if(data){
                setListdata(data.Orderdata)
              }
            } catch (error) {
              if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('userInfo')
                setErrorCatch(error.response.data.message)
              }
            }
          }
          getOrderData()
          
          async function getCoupens(){
            try {
              const {data} = await getAvailableCoupens(Orderdata.type)
              if(data){
                  setCoupenData(data.data)
                  if(data.data.length >0){
                    setCoupenShow(true)
                  }
              }
            } catch (error) {
              if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('userInfo')
                setErrorCatch(error.response.data.message)
             }
            }
          }
          getCoupens()
          
    },[updated])

    

    const handleCheckoutChange = (e)=>{
          const { name, value } = e.target;
          setPaymentMethod(value)
          
       }

       const handlePayment = async()=>{
          if(paymentMethod === ''){
            setError('Please select a payment method')
          }else if(paymentMethod === 'wallet'){
            console.log(userData.wallet);
            const amountPayable = (Orderdata.amounttobepaid)/2
            if(userData.wallet < amountPayable){
                      setError('')
                      setError('You wallet have no applicable amount')
              }else{
                  try {
                    const {data} = await walletOrderChange(Orderdata.costomer, Orderdata._id, amountPayable ,discount,Orderdata.type,Orderdata.fromDate,Orderdata.toDate,Orderdata.property,coupenNew )
                    if(data){
                      if(data.success){
                          setUpdated(!updated)
                      }
                    }
                  } catch (error) {
                    if(error?.response?.data?.message === 'jwt expired'){
                      localStorage.removeItem('userInfo')
                      setErrorCatch(error.response.data.message)
                    }
                  }
              }
          }else if(paymentMethod === 'stripe'){
              setStripeOpen(true)
          }
       }

       const handleSubmitCoupen = async()=>{
              const costomer = Orderdata.costomer
              const price = (listData.amounttobepaid+listData.amountpaid)
              try {
                const saveCoupen = await checkCoupen(coupenCode,costomer,price)
                if(saveCoupen){
                  console.log(saveCoupen);
                }
                if(saveCoupen.data.success) {
                    setDiscount(saveCoupen.data.discount)
                    setCoupenNew(coupenCode)
                    setCoupenShow(false)
                }else if(saveCoupen.data.costomer){
                    setCoupenError("You already used this coupon...!!!")
                    setCoupenModalOpen(true)
                }else{
                  setCoupenError("You enteres invalid coupon code...!!!")
                  setCoupenModalOpen(true)
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
      <div className='container min-h-screen mt-20'>
       <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-20'>
             <div class="sm:w-3/4 md:w-96 mx-auto bg-gray-700 rounded-2xl px-8 py-6 shadow-lg">
                   <h3 class="text-xl dark:text-white font-semibold leading-5 text-gray-800 text-center mb-3">{listData.type} Summary</h3>
                   <img className='w-full' src={listData.property && listData.property.images && listData.property.images[0].url} alt="" />
                   <div class="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                     <h1 className='text-green-400 font-thin mt-3'>Property Summery</h1>
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
                     {listData.status === 'approved' &&
                     <>
                        <div className='bg-white rounded-md'>
                              {coupenData && coupenData.map((element,i)=>(
                                                <div key={i} className="relative text-white">
                                                    <div className='w-full bg-white rounded-md text-center p-2'>
                                                        <div className=''>
                                                          <p className='text-center text-gray-950 text-sm'>Congrats...You have Coupens...</p>
                                                        </div>

                                                        <div >
                                                          <p className='text-center text-gray-950 text-sm'>Coupen Code:</p>
                                                        </div>
                                                        <div className='pb-2 flex text-center ml-10'>
                                                            <p className='text-center text-gray-950 text-sm'>
                                                                <span className='text-red-600'>{element.coupencode}</span>
                                                            </p>
                                                            <div className='ml-2'>
                                                                <AiOutlineCopy onClick={()=>copyToClipboard(element.coupencode)} color='blue' size={20} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        ))}
                        </div>
                        <div className="w-full mt-5 ml-1">
                                <label htmlFor="paymentMethod" className="text-lg text-blue-100">Payment Method <span className='text-xs text-red-500 font-normal'>(plase select a payment Method)</span></label>
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
                                        <span className="ml-2 text-base text-white">Wallet</span>
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
                                        <span className="ml-2 text-base text-white">Stripe</span>
                                    </label>
                                </div>
                                {/* {methodError &&
                                  <p className="mt-3 text-sm font-semibold text-red-500">{methodError}</p>
                                }
                                {walletError &&
                                   <p className="mt-3 text-sm font-semibold text-red-500">{walletError}</p>
                                } */}
                            </div>
                            {coupenShow &&
                              <form action="">
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
                              </form>
                            }
                        </>
                     }
                     
                   </div>
                      {listData.status === 'confirmed' &&
                         <>
                          <p className='text-xs text-white font-thin my-3'>You can cancel this property only before 3 days of delivery</p>
                          <button className='w-full bg-white font-medium text-base p-2 rounded-md  text-red-600 hover:bg-red-600 hover:text-white' onClick={()=>setOrderCancelModalOpen(true)}>Cancel Order</button>
                        </> }
                       {listData.status === 'cancelled' &&
                           <button className='w-full bg-red-600 text-base p-2 rounded-md  text-white font-thin'>Order Cancelled</button>
                       }
                       {listData.status === 'delivered' &&
                           <button className='w-full bg-green-600 text-base p-2 rounded-md  text-white font-thin'>Order Delivered</button>
                       }
                       {listData.status === 'approved' &&
                           <button className='w-full mt-2 bg-red-600 text-base p-2 rounded-md  text-white font-thin' onClick={handlePayment}>Make Payment</button>
                       }
                   
                   {/* <div class="flex justify-between items-center w-full">
                     <p class="text-base dark:text-white font-semibold leading-4 text-gray-800">Balance</p>
                     <p class="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">000</p>
                   </div> */}
                   {error &&
                       <p className='text-base text-center pt-2 text-red-400 font-thin'>{error}</p> 
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

        <Modal open={stripeOpen} onClose={()=>setStripeOpen(false)}>
              <div className='text-center w-96'>

                
                <div className='mx-auto my-4'>
                      <StripeContainer updated={()=>(setUpdated(!updated))} discount={discount} coupenCode={coupenNew} successModal={()=>setPaymentSuccessOpen(true)} onClose={()=>setStripeOpen(false)}/>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setStripeOpen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 text-sm p-2 rounded-lg w-full">Cancel</button>
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

        <Modal open={paymentSuccessOpen} onClose={()=>setPaymentSuccessOpen(false)}>
              <div className='text-center w-56'>

                <TiTick size={40} className='mx-auto text-blue-600'></TiTick>
                <div className='mx-auto my-4 w-48'>
                      <p className='text-sm text-gray-500'>Congrats...</p>
                      <p className='text-sm text-gray-500'>Payment Successfull</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setPaymentSuccessOpen(false)} className="btn bg-red-600 text-white shadow-lg hover:bg-red-700 text-sm p-2 rounded-lg w-full">Ok</button>
                </div>
              </div>
        </Modal>

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
    </div>
    </div>
    {errorCatch !== '' &&
        <TokenExpireModal message={errorCatch} />
    }
    </div>
  )
}

export default OrderDetail
