import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import ImageModal from './ImageModal';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ListFilteredData() {

  const navigate = useNavigate()
  const location = useLocation();
  const { filterData,crieterias } = location.state;

    const [open, setOpen] = useState(false)
    const [imageOpen, setImageOpen] = useState(false)
    const [modalData, setModalData] = useState('')
    const [modalImage,setModalImage] = useState('')

    const [checkoutProp,setCheckoutProp] = useState('')
    const [checkoutCostomer,setCheckoutCostomer] = useState('')
    const [checkoutConditions,setCheckoutConditions] = useState('')

    const userLogin = useSelector((state)=> state.userLogin)
    const {loading,error,userInfo} = userLogin

    if(localStorage.userInfo !== undefined){
        var user = JSON.parse(localStorage.userInfo);
      }

    useEffect(()=>{
        setCheckoutCostomer(userInfo)
        setCheckoutConditions(crieterias)
    },[])
    
    const id = userInfo._id

    const handleImageModal =(url)=>{
        setModalImage(url)
        setImageOpen(true)
        console.log(modalImage);
    }

    const handleButtonClick = (element)=>{
         setCheckoutProp(element)
        if(checkoutProp !== ''){
            checkoutHandler()
        }
    }

    const checkoutHandler = async()=>{
        navigate('/checkout', { state: {checkoutCostomer,checkoutProp,checkoutConditions} });
    }

    // useEffect(()=>{
    //    checkoutHandler();
    // },[checkoutProp])


  return (
    <div>
        <div className='flex items-center justify-center lg:pt-20 md:pt-14 sm:pt-12'>
            <h1 className='text-blue-800 text-2xl relative items-center justify-center'>Our Packages</h1>
            

        </div>
        <div className='flex items-center justify-center lg:pt-6 md:pt-14 sm:pt-12'>
        <h1 className="text-white lg:text-6xl sm:text-4xl relative items-center justify-center">
            <span className="bg-gradient-to-r from-blue-700 via-pink-600 to-red-700 text-transparent bg-clip-text">
                Search Your Holiday
            </span>
        </h1>
        </div>
        <div className='flex items-center justify-center lg:pt-6 md:pt-14 sm:pt-12'>
        <h1 className="text-white lg:text-6xl sm:text-4xl relative items-center justify-center">
            <span className="bg-gradient-to-r from-blue-700 via-pink-600 to-red-700 text-transparent bg-clip-text">
                With Us...
            </span>
        </h1>

        </div>


    
    <div className="flex justify-center  bg-gray-50 bg-transparent">
     {filterData && filterData.map((element,i)=>(
     
       <div className='flex flex-row mb-5 lg:w-8/12 md:w-9/12 sm:w-9/12 lg:my-10 sm:my-7 relative items-center  rounded-md justify-center bg-gray-50 bg-opacity-80 '>
        
          <div className="2xl:container 2xl:mx-auto lg:px-16 md:py-12 md:px-6 py-9 px-4">
            <p className="font-normal text-lg leading-3 text-indigo-700 hover:text-indigo-800 cursor-pointer pb-2">About</p>
            <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
                <div className="w-full lg:w-6/12">
                    <h2 className="w-full font-bold lg:text-4xl text-black text-3xl lg:leading-10 leading-9">{(element?.brandname || element?.modelname) ? `${element?.brandname},${element?.modelname}` : element?.propertyname}</h2>
                    <h2 className="w-full font-semibold  text-gray-500  lg:text-lg lg:-mt-3 md:text-xl sm:text-lg lg:leading-10 leading-9 pt-4">Destination: <span className='text-black font-semibold'>{element?.destination},{element?.district}</span></h2>
                    <h2 className="w-full font-semibold  text-gray-500  lg:text-lg lg:-mt-3 md:text-xl sm:text-lg lg:leading-10 leading-9">{element?.fuelType ? (
                                            <>
                                            Fuel Type: <span className='text-black font-semibold'>{element.fuelType}</span>
                                            </>
                                        ) : (
                                            <>
                                            Address: <span className='text-black text-sm'>{element.address}</span>
                                            </>
                                        )}</h2>
                    <h2 className="w-full font-semibold text-gray-500 lg:-mt-3 lg:text-lg md:text-xl sm:text-lg lg:leading-10 leading-9">{element?.extraFair ? (
                                                <>
                                                Extra Fair (After 150 kms):{' '}
                                                <span className='text-black font-semibold'>₹{element.extraFair}</span>
                                                </>
                                            ) : (
                                                <>
                                                {element?.description && (
                                                    <>
                                                    Extra Features:{' '}
                                                    {element.description.split(',').map((item, index) => (
                                                        <span key={index} className='text-lg text-black'>{item.trim()}</span>
                                                    ))}
                                                    </>
                                                )}
                                                </>
                                            )}</h2>
                    <h2 className="w-full font-semibold  lg:text-xl lg:-mt-3 md:text-lg sm:text-lg text-gray-500 lg:leading-10 leading-9">{element?.registerNumber ? (
                                                <>
                                                Register Number: <span className='text-black font-semibold'>{element.registerNumber}</span>
                                                </>
                                            ) : (
                                                <>
                                                Base Price: <span className='text-black'>₹{element.baseprice}</span>
                                                </>
                                            )}</h2>
                    <h2 className="w-full font-semibold lg:-mt-3 lg:text-lg md:text-sm sm:text-lg text-gray-500 lg:leading-10 leading-9">{element?.seatingCapacity ? (
                                            <>
                                            Seating Capacity: <span className='text-black font-semibold'>{element.seatingCapacity}</span>
                                            </>
                                        ) : (
                                            <>
                                            Net Price: <span className='text-black'>₹{element.netprice}</span>
                                            </>
                                        )}</h2>
                    {element?.minCharge && (
                                <h2 className="w-full font-semibold text-gray-500 lg:text-lg lg:-mt-3 md:text-sm sm:text-lg lg:leading-10 leading-9">
                                  Min.Charge: <span className='text-black'>{element.minCharge}</span>
                                </h2>
                    )}
                    
                </div>
                    <div className="w-full lg:w-5/12">
                       <img onClick={()=>handleImageModal(element?.images[0].url)} className="sm:block w-full h-40 p-2" src={element?.images[0].url} alt="people discussing on board" />
                    <div className='flex'>

                        <div className='w-full lg:w-6/12 p-2'>
                           <img className=" sm:block w-full h-full" onClick={()=>handleImageModal(element?.images[1].url)} src={element?.images[1].url} alt="people discussing on board" />
                        </div>
                        <div className='w-full lg:w-6/12 p-2'>
                           <img className=" sm:block w-full h-full" onClick={()=>handleImageModal(element?.images[2].url)} src={element?.images[2].url} alt="people discussing on board" />
                        </div>
                    </div>
                </div>
            </div>

            <div className='grid grid-flow-col gap-5 px-6 mt-3'>
                                    
                                    <button onClick={()=>{handleButtonClick(element)}} className="   py-2 text-sm tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-500 focus:outline-none ">
                                            Order It
                                    </button>
                                </div>

        <ImageModal open={imageOpen} onClose={()=>setImageOpen(false)}>
            <div className='text-center max-w-4xl'>
                <div className='mx-auto w-6/12'>
                     <img className='w-fit' src={modalImage} alt="" />
                </div>
            </div>
        </ImageModal>
   
        </div>
        
       
      </div>
        
      ))}
      
      
     </div>
    </div>
  )
}

export default ListFilteredData
