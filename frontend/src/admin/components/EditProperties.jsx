import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {IoMdCloseCircle} from "react-icons/io"
import { Link, useParams } from 'react-router-dom'
import {AiTwotoneDelete} from 'react-icons/ai'
import OwnerModal from './OwnerModal'
import {GiConfirmed} from "react-icons/gi"
import {BsFillCheckCircleFill} from 'react-icons/bs'
import SuccessModal from './SuccessModal';
import { deleteCabImage, deleteHomestayImage, deleteHotelImage, getCabDetails, getHomeStayDetails, getHotelDetails, ownerEditCab, ownerEditHomestay, ownerEditHotel, ownerGetDestinations, uploadCloudinary } from '../../api/OwnerAPI';
import OwnerTokenExpire from './OwnerTokenExpire';

function EditProperties({open,data, onClose}) {
    const navigate = useNavigate();

    const [cabData, setCabData] = useState('')
    const [homestayData, setHomestayData] = useState('')
    const [hotelData, setHotelData] = useState('')
    const [destinations, setDestinations] = useState([])
    const [public_id, setPublic_id] = useState('')
    const [prop_id,setProp_id] = useState('')
    const [type,setTye] = useState('')
    const [imageUpdate, setImageUpdate] = useState(false)
    const [imageError, setImageError] = useState('')
    const [uploading, setUploading] = useState(false)
    const [uploaded, setUploaded] = useState(false)
    const [image, setImage] = useState('')
    const [errorCatch, setErrorCatch] = useState('')

    const [errImage,setErrImage] = useState('')

    const {id} = useParams();
    const {name} = useParams();

    
    const [modalOpen, setModalOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)


  useEffect(()=>{ 
    async function fetchData(){
        try {
            if(name === 'Cabs'){
              const {data} = await getCabDetails(id)
              if(data){
               setCabData(data.cabsdata[0])
              }
            }else if(name === 'HomeStays'){
              const {data} = await getHomeStayDetails(id)
              if(data){
               setHomestayData(data.homestaydata[0])
              }
            }else{
              const {data} = await getHotelDetails(id)
              if(data){
               setHotelData(data.hoteldata[0])
              }
            }
        } catch (error) {
            if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('ownerInfo')
                setErrorCatch(error.response.data.message)
            }else{
                console.log(error);
            }
        }
            
    }
    fetchData()
  },[id,name,imageUpdate])

  

  const handleCabChange = (e)=>{
     const { name, value } = e.target;
     setCabData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  }

  const handleHomestayChange = (e)=>{
    const { name, value } = e.target;
    setHomestayData((prevState) => ({
       ...prevState,
       [name]: value,
     }));
 }

 const handleHotelChange = (e)=>{
    const { name, value } = e.target;
    setHotelData((prevState) => ({
       ...prevState,
       [name]: value,
     }));
 }

 const handledeleteImage = async(e)=>{
    e.preventDefault();
    const pub_id = public_id
    const property_id = prop_id
    try {
        if(type === "Cab"){
            var data = await deleteCabImage(pub_id,property_id)
        }else if(type === 'HomeStay'){
              data = await deleteHomestayImage(pub_id,property_id)
        }else{
              data = await deleteHotelImage(pub_id,property_id)
        }

        if(data.data.success){
            setModalOpen(false)
            setImageUpdate(!imageUpdate)
        }
        
        console.log(data.data.success);
      } catch (error) {
            if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('ownerInfo')
                setErrorCatch(error.response.data.message)
            }else{
                console.log(error);
            }
      }
 }


 const submitImage = (async(e)=>{
    e.preventDefault()
    console.log(image);
    const uploadImage = async (image) => {
       
      if(image === ''){
          setErrImage('Minimum One Document Required')
      }else{
        setUploading(true)
        try {
            const formData = new FormData()
            formData.append("file", image);
            formData.append("upload_preset", "exploreKerala");
        
            const response = await uploadCloudinary(formData)
            const responseData = response.data;
            console.log(responseData.url);
            console.log(responseData.public_id);
            const imageData = {
                url: responseData.url,
                public_id: responseData.public_id
            }
            console.log(imageData);
            if(imageData && name === "Cabs"){
                cabData.images.push(imageData)
                console.log(cabData);
            }else if(imageData && name === "HomeStays"){
                homestayData.images.push(imageData)
            }else{
                hotelData.images.push(imageData)
            }
            
            setUploading(false)
            setUploaded(true)
            setErrImage('')

            // return setNewDocument({documentData})

        } catch (error) {
            console.error("Image upload failed:", error);
            if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('ownerInfo')
                setErrorCatch(error.response.data.message)
                }else{
                    console.log(error);
                }
        }
      }
    };
    const imgData = await uploadImage(image)
})

useEffect(() => {
    if (editModalOpen) {
      const timer = setTimeout(() => {
        setEditModalOpen(false);
        navigate(-1);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [editModalOpen]);



 const handleCabEdit = async(e)=>{
    e.preventDefault();
    try {
        if(cabData.images.length < 3){
            setImageError("Oops...Three Images required")
        }else{
            const {data} = await ownerEditCab(cabData)
            if(data){
                setEditModalOpen(true)
            }
        }
    } catch (error) {
        if(error?.response?.data?.message === 'jwt expired'){
            localStorage.removeItem('ownerInfo')
            setErrorCatch(error.response.data.message)
        }else{
            console.log(error);
        }
    }
 }

 const handleHomestayEdit = async(e)=>{
    e.preventDefault();
    try {
        if(homestayData.images.length < 3){
            setImageError("Oops...Three Images required")
        }else{
            const {data} = await ownerEditHomestay(homestayData)
            if(data){
                setEditModalOpen(true)
            }
        }
    } catch (error) {
        if(error?.response?.data?.message === 'jwt expired'){
            localStorage.removeItem('ownerInfo')
            setErrorCatch(error.response.data.message)
        }else{
            console.log(error);
        }
    }
 }

 const handleHotelEdit = async(e)=>{
    e.preventDefault();
    try {
        if(hotelData.images.length < 3){
            setImageError("Oops...Three Images required")
        }else{
            const {data} = await ownerEditHotel(hotelData)
            if(data){
                setEditModalOpen(true)
            }
        }
    } catch (error) {
        if(error?.response?.data?.message === 'jwt expired'){
            localStorage.removeItem('ownerInfo')
            setErrorCatch(error.response.data.message)
        }else{
            console.log(error);
        }
    }
    
 }


 useEffect(()=>{
    async function getDestinations(){
        try {
            const {data} = await ownerGetDestinations
            if(data){
                const destinationArray = []
                data.destinationdata.forEach((e)=>{
                    destinationArray.push(e.destination)
                })
                setDestinations(destinationArray)
            }
        } catch (error) {
            if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('ownerInfo')
                setErrorCatch(error.response.data.message)
            }else{
                console.log(error);
            }
        }
    }
    getDestinations()
},[])

  

  

//   console.log(cabData);


  return (
    <>
      <div className='flex justify-center'>
     <div className='container min-h-screen mt-32'>
       <div className={`mt-10 mb-10 flex justify-center items-center transition-colors -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-3`}>
           { name === "Cabs" && 
            <section class="sm:w-3/4 md:w-96 mx-auto bg-[#20354b] text-center text-red-500 rounded-2xl px-8 py-6 shadow-lg"> 
                      <div className='flex justify-end'>
                            {/* {console.log(data)} */}
                            
                              {cabData.images && cabData.images.length === 3 && <IoMdCloseCircle size={32} color="red" onClick={()=>{navigate(-1)}}/>}
                                    
                      </div>
                      <h1 className='-mt-9'>Edit Properties</h1>

                     {/* {error && <OwnerError message={error}>{error}</OwnerError>}
                     {loading && <OwnerLoading />}          */}
                      
                      <form className="mt-6" >
                            <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >
                                    Register Number
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="registerNumber"
                                        value={cabData.registerNumber}
                                        onChange={handleCabChange}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    /> 
                                </div>
                            </div>

                            <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >   
                                    Brand Name
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="brandname"
                                        value={cabData.brandname}
                                        onChange={handleCabChange}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>


                          <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >   
                                Model Name
                                </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="text"
                                      name="modelname"
                                      value={cabData.modelname}
                                      onChange={handleCabChange}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                          
                          <div className='flex flex-wrap justify-between mt-4'>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-1">
                                  <label
                                      htmlFor="destination"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Destination
                                  </label>
                                  <div className="flex flex-col items-start">
                                      <select
                                          type="text"
                                          value={cabData.destination}
                                          name="destination"
                                          placeholder={cabData.destination}
                                          onChange={handleCabChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >
                                                {destinations.map((element) => (
                                                    <option key={element} value={element}>
                                                        {element}
                                                    </option>
                                                ))}
                                      </select>
                                  </div>
                              </div>

                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label
                                      htmlFor="district"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      District
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text"
                                          name="district"
                                          value={cabData.district}
                                          onChange={handleCabChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                          </div>
                          
                          
                          
                          <div className='flex flex-wrap justify-between mt-4'>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-1">
                                  <label
                                      htmlFor="type"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Seating Capacity
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="number"
                                          value={cabData.seatingCapacity}
                                          name="seatingCapacity"
                                          onChange={handleCabChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label
                                      htmlFor="capacity"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Fuel Type
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text"
                                          name="fuelType"
                                          value={cabData.fuelType}
                                          onChange={handleCabChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                          </div>

                          <div className="mt-4">
                              <label
                                  htmlFor="property_name"
                                  className="block text-sm font-medium text-gray-50 undefined text-center"
                              >
                                  Minimum Charge
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="minCharge"
                                      value={cabData.minCharge}
                                      onChange={handleCabChange}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className="mt-4">
                              <label
                                  htmlFor="property_name"
                                  className="block text-sm font-medium text-gray-50 undefined text-center"
                              >
                                  Extra Fair (After 150 kms)
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="extraFair"
                                      value={cabData.extraFair}
                                      onChange={handleCabChange}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className='grid grid-cols-3 mt-4 space-x-1'>
                            {cabData && cabData.images && cabData.images.map((element, index) => (
                                <form action="">
                                    <div className='flex flex-col bg-slate-100 rounded-lg justify-center text-center items-center p-2' key={index}>
                                       <img className='h-16' src={element.url} alt='' />
                                            <span onClick={()=>{setModalOpen(true);setPublic_id(element.public_id);setProp_id(cabData._id);setTye('Cab')}} className='flex justify-center space-x-0 mt-2 bg-white'>
                                                <AiTwotoneDelete size={20} />
                                                <span className='text-red-600 text-xs mt-1'>Delete</span>
                                            </span>
                                    </div>
                                </form>
                            ))}
                            </div>
                            {cabData && cabData.images && cabData.images.length<3 &&
                              <form action="" className='mt-4 bg-white p-3 rounded-lg'>
                                <label htmlFor="image" className='text-sm'>Add Image</label>
                                
                                <input 
                                   type="file" 
                                   className='bg-gray-800 w-full'
                                   onChange={(e)=>setImage(e.target.files[0])}
                                   />
                                {!uploaded || cabData.images.length<3 ?
                                  <button onClick={submitImage} className='w-full bg-gray-800 text-white text-sm p-2 my-2'>
                                     {!uploading ?
                                       <span>Upload</span> :
                                       <div role="status">
                                            <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>
                                    }
                                  </button>
                                  :
                                  <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                <BsFillCheckCircleFill className='mx-auto' color='white' size={30}/>
                                  </div>
                                }
                              </form>
                            }
                            
                          {imageError && 
                            <div className='mt-3'>
                                <span className='text-red-600 mt-5'>{imageError}</span>
                            </div>
                          }


                          
          
                          <div className="flex items-center mt-4">
                             {cabData.images && cabData.images.length === 3 &&
                              <button onClick={handleCabEdit}  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                  Edit
                              </button>
                             }
                            
                          </div>
                      </form>
            </section>
            }

            { name === "HomeStays" && 
              <section class="sm:w-3/4 md:w-96 mx-auto bg-[#20354b] text-center text-red-500 rounded-2xl px-8 py-6 shadow-lg"> 
                      <div className='flex justify-end'>
                            {/* {console.log(data)} */}
                            <Link id="dropdownHoverButton" to={"/owner/myproperties"}  data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-emerald-400  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-end " type="button" >
                            { <IoMdCloseCircle size={32} color="red"/>}
                            </Link>         
                      </div>
                      <h1 className='-mt-9'>Edit Properties</h1>

                     {/* {error && <OwnerError message={error}>{error}</OwnerError>}
                     {loading && <OwnerLoading />}          */}
                      <form className="mt-6" >
                            <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >
                                    Property Name
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="propertyname"
                                        value={homestayData.propertyname}
                                        onChange={handleHomestayChange}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    /> 
                                </div>
                            </div>

                            <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >   
                                    Destination
                                </label>
                                <div className="flex flex-col items-start">
                                      <select
                                          type="text"
                                          value={homestayData.destination}
                                          name="destination"
                                          placeholder={homestayData.destination}
                                          onChange={handleHomestayChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >
                                    
                                                {destinations.map((element) => (
                                                    <option key={element} value={element}>
                                                        {element}
                                                    </option>
                                                ))}
                                      </select>
                                  </div>
                            </div>


                          <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >   
                                Address
                                </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="text"
                                      name="address"
                                      value={homestayData.address}
                                      onChange={handleHomestayChange}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                          
                          <div className='flex flex-wrap justify-between mt-4'>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-1">
                                  <label
                                      htmlFor="destination"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      District
                                  </label>
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text"
                                          value={homestayData.district}
                                          name="district"
                                          placeholder={homestayData.district}
                                          onChange={handleHomestayChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >
                                      </input>
                                  </div>
                              </div>

                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label
                                      htmlFor="district"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Descriptions
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text"
                                          name="description"
                                          value={homestayData.description}
                                          onChange={handleHomestayChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                          </div>
                          
                          
                          
                          <div className='flex flex-wrap justify-between mt-4'>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-1">
                                  <label
                                      htmlFor="type"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Type
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <select
                                          type="text"
                                          value={homestayData.type}
                                          name="type"
                                          onChange={handleHomestayChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      >
                                        <option value="" className='text-gray-400'>Choose</option>
                                                    <option value="villa">
                                                        Villa
                                                    </option>
                                                    <option value="Suit">
                                                        Suit
                                                    </option>
                                                    <option value="Executive Suit">
                                                        Executive Suit
                                                    </option>
                                                    <option value="Apartment">
                                                        Apartment
                                                    </option>

                                      </select>
                                  </div>
                              </div>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label
                                      htmlFor="capacity"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                     Capacity(perperson)
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="number"
                                          name="capacity"
                                          value={homestayData.capacity}
                                          onChange={handleHomestayChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                          </div>

                          <div className="mt-4">
                              <label
                                  htmlFor="property_name"
                                  className="block text-sm font-medium text-gray-50 undefined text-center"
                              >
                                  Base Price
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="baseprice"
                                      value={homestayData.baseprice}
                                      onChange={handleHomestayChange}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className="mt-4">
                              <label
                                  htmlFor="property_name"
                                  className="block text-sm font-medium text-gray-50 undefined text-center"
                              >
                                  Net Price
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="netprice"
                                      value={homestayData.netprice}
                                      onChange={handleHomestayChange}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className='grid grid-cols-3 mt-4 space-x-1'>
                            {homestayData && homestayData.images && homestayData.images.map((element, index) => (
                                    <form action="">
                                        <div className='flex flex-col bg-slate-100 rounded-lg justify-center text-center items-center p-2' key={index}>
                                        <img className='h-16' src={element.url} alt='' />
                                                <span onClick={()=>{setModalOpen(true);setPublic_id(element.public_id);setProp_id(homestayData._id);setTye('HomeStay')}} className='flex justify-center space-x-0 mt-2 bg-white'>
                                                    <AiTwotoneDelete size={20} />
                                                    <span className='text-red-600 text-xs mt-1'>Delete</span>
                                                </span>
                                        </div>
                                    </form>
                                ))}
                                </div>
                                {homestayData && homestayData.images && homestayData.images.length<3 &&
                                <form action="" className='mt-4 bg-white p-3 rounded-lg'>
                                    <label htmlFor="image" className='text-sm'>Add Image</label>
                                    
                                    <input 
                                    type="file" 
                                    className='bg-gray-800 w-full'
                                    onChange={(e)=>setImage(e.target.files[0])}
                                    />
                                    {!uploaded || homestayData.images.length<3 ?
                                       <button onClick={submitImage} className='w-full bg-gray-800 text-white text-sm p-2 my-2'>
                                        {!uploading ?
                                        <span>Upload</span> :
                                        <div role="status">
                                                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </button>
                                    :
                                    <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                    <BsFillCheckCircleFill className='mx-auto' color='white' size={30}/>
                                    </div>
                                    }
                                </form>
                                }
                            
                          {imageError && 
                            <div className='mt-3'>
                                <span className='text-red-600 mt-5'>{imageError}</span>
                            </div>
                          }



          
                          <div className="flex items-center mt-4">
                            
                             {homestayData.images && homestayData.images.length === 3 &&
                              <button onClick={handleHomestayEdit}  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                  Edit
                              </button>
                             }
                            
                          </div>
                      </form>
               </section>
             }

             { name === "Hotels" && 
                <section class="sm:w-3/4 md:w-96 mx-auto bg-[#20354b] text-center text-red-500 rounded-2xl px-8 py-6 shadow-lg"> 
                      <div className='flex justify-end'>
                            {/* {console.log(data)} */}
                            <Link id="dropdownHoverButton" to={"/owner/myproperties"} data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-emerald-400  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-end " type="button" >
                            { <IoMdCloseCircle size={32} color="red"/>}
                            </Link>         
                      </div>
                      <h1 className='-mt-9'>Edit Properties</h1>

                     {/* {error && <OwnerError message={error}>{error}</OwnerError>}
                     {loading && <OwnerLoading />}          */}
                      <form className="mt-6" >
                            <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >
                                    Property Name
                                </label>
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="propertyname"
                                        value={hotelData.propertyname}
                                        onChange={handleHotelChange}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    /> 
                                </div>
                            </div>

                            <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >   
                                    Destination
                                </label>
                                <div className="flex flex-col items-start">
                                        <select
                                          type="text"
                                          value={hotelData.destination}
                                          name="destination"
                                          placeholder={hotelData.destination}
                                          onChange={handleHotelChange}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >
                                            
                                                    {destinations.map((element) => (
                                                        <option key={element} value={element}>
                                                            {element}
                                                        </option>
                                                    ))}
                                      </select>
                                </div>
                            </div>


                          <div className="mt-4">
                                <label
                                    htmlFor="property_name"
                                    className="block text-sm font-medium text-gray-50 undefined text-center"
                                >   
                                  Address
                                </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="text"
                                      name="address"
                                      value={hotelData.address}
                                      onChange={handleHotelChange}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                          
                          <div className='flex flex-wrap justify-between mt-4'>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-1">
                                  <label
                                      htmlFor="destination"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      District
                                  </label>
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text" value={hotelData.district} name="district" placeholder={hotelData.district} onChange={handleHotelChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >
                                      </input>
                                  </div>
                              </div>

                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label
                                      htmlFor="district" className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Descriptions
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text" name="description" value={hotelData.description} onChange={handleHotelChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                          </div>
                          
                          
                          
                          <div className='flex flex-wrap justify-between mt-4'>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0 pr-1">
                                  <label
                                      htmlFor="type"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Type
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <select
                                          type="text" value={hotelData.type} name="type" onChange={handleHotelChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      >
                                        <option value="" className='text-gray-400'>Choose</option>
                                                    <option value="villa">
                                                        Villa
                                                    </option>
                                                    <option value="Suit">
                                                        Suit
                                                    </option>
                                                    <option value="Executive Suit">
                                                        Executive Suit
                                                    </option>
                                                    <option value="Apartment">
                                                        Apartment
                                                    </option>
                                        </select>
                                  </div>
                              </div>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label
                                      htmlFor="capacity" className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Capacity(perperson)
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="number" name="capacity" value={hotelData.capacity} onChange={handleHotelChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                          </div>

                          <div className="mt-4">
                              <label
                                  htmlFor="baseprice"
                                  className="block text-sm font-medium text-gray-50 undefined text-center"
                              >
                                  Base Price
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number" name="baseprice" value={hotelData.baseprice} onChange={handleHotelChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className="mt-4">
                              <label
                                  htmlFor="netprice" className="block text-sm font-medium text-gray-50 undefined text-center"
                              >
                                  Net Price
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number" name="netprice" value={hotelData.netprice} onChange={handleHotelChange} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>

                          <div className='grid grid-cols-3 mt-4 space-x-1'>
                            {hotelData && hotelData.images && hotelData.images.map((element, index) => (
                                    <form action="">
                                        <div className='flex flex-col bg-slate-100 rounded-lg justify-center text-center items-center p-2' key={index}>
                                        <img className='h-16' src={element.url} alt='' />
                                                <span onClick={()=>{setModalOpen(true);setPublic_id(element.public_id);setProp_id(hotelData._id);setTye('Hotel')}} className='flex justify-center space-x-0 mt-2 bg-white'>
                                                    <AiTwotoneDelete size={20} />
                                                    <span className='text-red-600 text-xs mt-1'>Delete</span>
                                                </span>
                                        </div>
                                    </form>
                                ))}
                                </div>
                                {hotelData && hotelData.images && hotelData.images.length<3 &&
                                <form action="" className='mt-4 bg-white p-3 rounded-lg'>
                                    <label htmlFor="image" className='text-sm'>Add Image</label>
                                    
                                    <input 
                                    type="file" className='bg-gray-800 w-full' onChange={(e)=>setImage(e.target.files[0])}
                                    />
                                    {!uploaded || hotelData.images.length<3 ?
                                    <button onClick={submitImage} className='w-full bg-gray-800 text-white text-sm p-2 my-2'>
                                        {!uploading ?
                                        <span>Upload</span> :
                                        <div role="status">
                                                <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>
                                        }
                                    </button>
                                    :
                                    <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                    <BsFillCheckCircleFill className='mx-auto' color='white' size={30}/>
                                    </div>
                                    }
                                </form>
                                }
                            
                            {imageError && 
                              <div className='mt-3'>
                                <span className='text-red-600 mt-5'>{imageError}</span>
                             </div>
                            }



                          
          
                          <div className="flex items-center mt-4">
                            
                            {hotelData.images && hotelData.images.length === 3 &&
                              <button onClick={handleHotelEdit}  className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                  Edit
                              </button>
                             }
                            
                          </div>
                      </form>
                 </section>
                }
                   
          </div>
          <OwnerModal open={modalOpen} onClose={()=>setModalOpen(false)}>
            <div className='text-center w-56'>

               
               <AiTwotoneDelete size={56} className='mx-auto text-red-600'></AiTwotoneDelete>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-gray-800 '>Confirm Delete</h3>
                     <p className='text-sm text-gray-500'>Are you sure to Delete this item?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setModalOpen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handledeleteImage}  className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full">Delete</button>
                </div>
            </div>
         </OwnerModal>

         <SuccessModal open={editModalOpen} onClose={()=>setEditModalOpen(false)}>
            <div className='text-center w-56'>

               
               <GiConfirmed size={56} className='mx-auto text-green-600'></GiConfirmed>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-gray-800 '>Your Property Edited</h3>
                </div>
                
            </div>
         </SuccessModal>
      

         </div>
         </div>
         {errorCatch !== '' &&
            <OwnerTokenExpire message={errorCatch}/>
            }
        </>
  )
}

export default EditProperties
