import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {MdDangerous} from "react-icons/md"
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux'
import { getBanners, getDestination, getFilterData } from '../../api/UserAPI';
import TokenExpireModal from './TokenExpireModal';


function PlanTrip() {
    

    const navigate = useNavigate();
    
    const [destination, setDestination] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState()
    const [type, setType] = useState('')
    const [numberOfPeople, setNumberOfPeople] = useState(0)
    const [priceLimit, setPriceLimit] = useState(0)
    const [filterData,setFilterData] = useState([])
    const [filterError, setFilterError] = useState('')
    const [formError, setFormError] = useState('')
    const [errorCatch, setErrorCatch]= useState('')

    const [open, setOpen] = useState(false)
    const [imageOpen, setImageOpen] = useState(false)
    // const [modalData, setModalData] = useState('')
    const [modalImage,setModalImage] = useState('')

    const dispatch = useDispatch()
    const [destinations, setDestinations] = useState([])
    const [bannerData, setBannerData] = useState([])

    

    const getData = useSelector(state => state.userGetFilteredData)
    const { filteredData } = getData
    
    const handleImageModal =(url)=>{
        setModalImage(url)
        setImageOpen(true)
        console.log(modalImage);
    }


    const submitHandler = async(e)=>{
        e.preventDefault();
      try {

          console.log(destination,fromDate,toDate,type,numberOfPeople,priceLimit);
          if(destination && fromDate && toDate && type && numberOfPeople && priceLimit){
                if(numberOfPeople <1){
                    setFormError('Minimum number of people is One')
                    setOpen(true)
                }else if(priceLimit <0){
                    setFormError('PriceLimit must be greater than One')
                    setOpen(true)
                }else if(fromDate>=toDate){
                    setFormError('ToDate must be greater than FromDate')
                    setOpen(true)
                }else{
                //   dispatch(getFilteredData(destination,fromDate,toDate,type,numberOfPeople,priceLimit))
                  console.log(type);
                  const { data } = await getFilterData(destination,fromDate,toDate,type,numberOfPeople,priceLimit) 
                  if(data){
                    setFilterData(data.data)
                    const crieterias = {
                        fromDate,
                        toDate,
                        type,
                        numberOfPeople
                    }
                    if(filterData[0] !== undefined){
                        navigate('/listfiltereddata', { state: {filterData,crieterias} });
                    }else{
                        // setFormError('No match for your conditions...please try agin')
                        // setOpen(true)
                        setFilterError("No match for your conditions...please try agin")
                    }
                  }
                }
            }else{
              setFormError('All Fields are required')
              setOpen(true)
           }
        
        } catch (error) {
            if(error.response.data.message === 'jwt expired'){
                localStorage.removeItem('userInfo')
                setErrorCatch(error.response.data.message)
            }
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
        if(fromDate !== ''){

            const today = new Date(fromDate);
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

    useEffect(()=>{
        async function getDestinations(){
            try {
                const {data} = await getDestination()
                if(data){
                    const destinationArray = []
                    data.destinationdata.forEach((e)=>{
                        destinationArray.push(e.destination)
                    })
                    setDestinations(destinationArray)
                }
                const banners = await getBanners
                if(banners){
                    setBannerData(banners.data.bannerdata)
                }
            } catch (error) {
                if(error?.response?.data?.message === 'jwt expired'){
                    localStorage.removeItem('userInfo')
                    setErrorCatch(error.response.data.message)
                }
            }
        }
        getDestinations()
    },[])
    const slides = [
        bannerData.map((element)=>(
            {url:element.image, heading:element.heading, description: element.description}
        ))
    ]
    const containerStyle = {
        width: '100%',
        height:'280px',
        margin: '0 auto'
    }

  return (
    <> 
    
       {/* <div style={{ ...containerStyle, marginTop: '40px' }}>
          <ImageSlider slides={slides[0]}/> 
       </div> */}
    <div className='flex justify-center'>
     <div className='container min-h-screen mt-32'>
       <div className='flex items-center justify-center lg:pt-20 md:pt-14 sm:pt-12'>
            <h1 className='text-white text-2xl font-bold relative items-center justify-center'>Our Packages</h1>
        </div>
        <div className='flex items-center justify-center lg:pt-6 md:pt-14 sm:pt-12'>
             <h1 className="text-white lg:text-6xl sm:text-4xl relative items-center justify-center">
                <span className="bg-gradient-to-r from-blue-300 via-pink-500 to-red-400 text-transparent bg-clip-text font-bold">
                  Search Your Holiday
                </span>
             </h1>
        </div>
        <div className='flex items-center justify-center lg:pt-6 md:pt-14 sm:pt-12'>
             <h1 className="text-white lg:text-6xl sm:text-4xl relative items-center justify-center">
              <span className="bg-gradient-to-r from-blue-500 via-pink-600 to-red-600 text-transparent bg-clip-text font-bold">
                  With Us...
              </span>
             </h1>

         </div>
      <>
      {filterError &&
         <h2 className='mt-10 rounded-md font-thin bg-red-600 p-3 text-center text-white'>{filterError}</h2>
      }
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
                                          onChange={(e) => setDestination(e.target.value)}
                                          className="block w-full px-4 py-2 mt-2 text-gray-700 text-base bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >       
                                               <option value="" className='text-gray-400'>Choose</option>
                                                {destinations.map((element) => (
                                                    <option key={element} value={element}>
                                                        {element}
                                                    </option>
                                                ))}
                                      </select>
                              </div>
                          </div>

                          <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Date From
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="date"
                                      name="fromdate"
                                      min={getCurrentDate()}
                                      onChange={(e) => setFromDate(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 text-base bg-white  border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                  Date To
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="date"
                                      name="todate"
                                      min={getToDate()}
                                      onChange={(e) => setToDate(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 text-base bg-white  border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  What you want
                              </label>
                              <div className="flex flex-col items-start">
                                     <select
                                          type="text"
                                        //   value={firstname}
                                          name="prototypetype"
                                          placeholder="Choose One"
                                          onChange={(e) => setType(e.target.value)}
                                          className="block w-full px-4 py-2 mt-2 text-gray-700 text-base bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >
                                            <option value="" className='text-gray-400'>Choose</option>
                                            <option value="Hotel" className='text-gray-400'>Hotel</option>
                                            <option value="HomeStay" className='text-gray-400'>Homestay</option>
                                            <option value="Cab" className='text-gray-400'>Cab</option>
                                                
                                      </select>
                              </div>
                          </div>

                </div>
                <div className='w-38'>
                           <div className="">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-900 undefined text-center"
                              >
                                  Number of people
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="numberofpeople"
                                      onChange={(e) => setNumberOfPeople(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 text-base bg-white  border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className="">
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
                                      onChange={(e) => setPriceLimit(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-gray-700 text-base bg-white border-2 border-gray-300 rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                </div>
                <div onClick={submitHandler} className="absolute cursor-pointer bottom-0 left-1/2 transform -translate-x-1/2 mb-[-25px] bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 border-2 px-20 py-2 rounded-full">
                   <button className="btn text-white">Submit</button>
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
        </div>
        </div>
        {errorCatch !== '' &&
            <TokenExpireModal message={errorCatch} />
        }
   </>
  )
}

export default PlanTrip
