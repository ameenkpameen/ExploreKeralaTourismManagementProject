import React, { useState } from 'react'
import Modal from './Modal'
import {MdDangerous} from "react-icons/md"
import axios from 'axios'
import baseURL from '../../config'
import { TiTick } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

function AddCoupen() {
  const navigate = useNavigate()
  const [type, setType] = useState('')
  const [expiry, setExpiry] = useState('')
  const [percentage, setPercentage] = useState('')
  const [maxoffer, setMaxoffer] = useState('')
  const [coupencode, setCoupencode] = useState('')
  const [formError, setFormError] = useState('')
  const [open, setOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)

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
            const {data} = await axios.post(`${baseURL}/superadmin/addcoupen`,{
                type,
                expiry,
                percentage,maxoffer,coupencode
            })
            if(data){
                if(!data.success){
                    setFormError(`Coupen "${coupencode}" Already Registered`)
                    setOpen(true)
                }else{
                    setSuccessOpen(true)
                }
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
      <div className='flex items-center justify-center lg:pt-20 md:pt-14 sm:pt-12 -mb-20'>
        <h1 className='text-white text-2xl relative items-center justify-center'>Add Coupens</h1>
    </div>
     <form action="" className='min-h-screen flex flex-row items-center justify-center -mt-28'>
        
        
        <div className='relative grid grid-cols-1 lg:grid-cols-3 lg:gap-4 justify-items-center  rounded-lg bg-gray-100 p-10'>
                <div className='w-38'>
                        <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Choose Destination
                              </label>
                              <div className="flex flex-col items-start">
                                     <select
                                          type="text"
                                        //   value={firstname}
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
                     <h3 className='text-lg font-thin text-gray-800 '>Coupen Added Successfully</h3>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>{setSuccessOpen(false);navigate('/superadmin/listcoupens')}} className="btn bg-red-500 text-white font-thin shadow-lg hover:bg-red-600 p-1 w-full">Ok</button>                   
                </div>
            </div>
        </Modal>
        
   </>
  )
}

export default AddCoupen
