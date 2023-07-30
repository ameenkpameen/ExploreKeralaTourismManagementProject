import React, { useState } from 'react'
import Modal from './Modal'
import {MdDangerous} from "react-icons/md"
import axios from 'axios'
import baseURL from '../../config'
import { useLocation, useNavigate } from 'react-router-dom'
import {TiTick} from "react-icons/ti"
import { superAdminEditCoupen } from '../../api/SuperadminAPI'

function EditCoupen() {
    const location = useLocation()
    const data = location.state;
    const navigate = useNavigate()
    const [type, setType] = useState(data.propertytype)
    const [expiry, setExpiry] = useState(data.expirydate)
    const [percentage, setPercentage] = useState(data.percentage)
    const [maxoffer, setMaxoffer] = useState(data.maxoffer)
    const [coupencode, setCoupencode] = useState(data.coupencode)
    const [formError, setFormError] = useState('')
    const [open, setOpen] = useState(false)
    const [successOpen, setSuccessOpen] = useState(false)
    const id = data._id

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

const submitHandler = async(e)=>{
    e.preventDefault()
    if(type && expiry && percentage && maxoffer && coupencode){
        if(maxoffer < 100){
            setFormError('Maximum offer is too short')
            setOpen(true)
        }else if(coupencode.length <8){
            setFormError('Minimum 8 characters are required in coupen code')
            setOpen(true)
        }else{
            const {data} = await superAdminEditCoupen(id,type,expiry,percentage,maxoffer,coupencode)
            if(data){
                setSuccessOpen(true)
            }
        }

    }else{
        setFormError('All fields are required')
        setOpen(true)
    }
}
  return (
    <> 
      <>
      <div className='flex justify-center'>
       <div className='container min-h-screen mt-32'>
      <div className='flex items-center justify-center lg:pt-20 md:pt-14 sm:pt-12 -mb-20'>
        <h1 className='text-blue-950 font-bold text-2xl relative items-center justify-center'>Add Coupens</h1>
    </div>
     <form action="" className='min-h-screen flex flex-row items-center justify-center -mt-40'>
        
        
        <div className='relative grid grid-cols-1 lg:grid-cols-3 lg:gap-4 justify-items-center  rounded-lg bg-gray-100 p-10'>
                <div className='w-38'>
                        <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Choose Property Type
                              </label>
                              <div className="flex flex-col items-start">
                                     <select
                                          type="text"
                                          value={type}
                                          name="destination"
                                          placeholder="Choose One"
                                          onChange={(e) => setType(e.target.value)}
                                          className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >       
                                               <option value="" className='text-gray-400'>Choose</option>
                                               <option value="Cab" className='text-gray-400'>Cabs</option>
                                               <option value="HomeStay" className='text-gray-400'>HomeStays</option>
                                               <option value="Hotel" className='text-gray-400'>Hotels</option>
                                                
                                      </select>
                              </div>
                          </div>

                          <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Expiry Date
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="date"
                                      name="fromdate"
                                      value={expiry}
                                      min={getCurrentDate()}
                                      onChange={(e) => setExpiry(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white  border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                </div>
                <div className='w-38'>
                        <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Percentage
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="todate"
                                      value={percentage}
                                      onChange={(e) => setPercentage(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white  border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Maximum Offer
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="todate"
                                      value={maxoffer}
                                      onChange={(e) => setMaxoffer(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white  border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                </div>
                <div className='w-38'>
                           <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Coupen Code
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="text"
                                      name="numberofpeople"
                                      value={coupencode}
                                      onChange={(e) => setCoupencode(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white  border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          {/* <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Your price limit
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="pricelimit"
                                    //   onChange={(e) => setPriceLimit(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div> */}
                </div>
                <div onClick={submitHandler} className="absolute cursor-pointer bottom-0 left-1/2 transform -translate-x-1/2 mb-[-25px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 border-2 px-20 py-2 rounded-full">
                   <button className="btn text-white">Add</button>
                </div>
        </div>
     </form>
     </div>
     </div>
     </>
        <Modal open={open} onClose={()=>setOpen(false)}>
            <div className='text-center'>

               <MdDangerous size={56} className='mx-auto text-red-600'></MdDangerous>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-thin text-gray-800 '>{formError}</h3>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setOpen(false)} className="btn bg-red-500 text-white font-thin shadow-lg hover:bg-red-600 p-1 w-full">Ok</button>                   
                </div>
            </div>
        </Modal>

        <Modal open={successOpen} onClose={()=>setSuccessOpen(false)}>
            <div className='text-center'>

               <TiTick size={56} className='mx-auto text-green-600'></TiTick>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-thin text-gray-800 '>Coupen Edited Successfully</h3>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>{setSuccessOpen(false);navigate('/superadmin/listcoupens')}} className="btn bg-red-500 text-white font-thin shadow-lg hover:bg-red-600 p-1 w-full">Ok</button>                   
                </div>
            </div>
        </Modal>
        
   </>
  )
}

export default EditCoupen
