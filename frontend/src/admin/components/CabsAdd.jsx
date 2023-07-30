import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCabs } from '../../actions/adminActions';
import OwnerError from './OwnerError';
import OwnerLoading from './OwnerLoading';
import {IoMdCloseCircle} from "react-icons/io"
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {GiConfirmed} from "react-icons/gi"
import SuccessModal from './SuccessModal';
import { uploadCloudinary } from '../../api/OwnerAPI';
import OwnerTokenExpire from './OwnerTokenExpire';

function CabsAdd(props) {

    const  dispatch = useDispatch();

    const [registerNumber, setRegisterNumber] = useState('')
    const [brandname, setBrandname] = useState('')
    const [modelname, setModelname] = useState('')
    const [destination, setDestination] = useState('')
    const [district, setDistrict] = useState('')
    const [seatingCapacity, setSeatingCapacity] = useState('')
    const [fuelType, setFuelType] = useState('')
    const [minCharge, setMinCharge] = useState('')
    const [extraFair, setExtraFair] = useState('')
    const [document, setDocument] = useState('')
    const [images, setImages] = useState([])
    const [newImages, setNewImages] = useState([])
    const [newDocument, setNewDocument] = useState('')
    const [activesubmit, setActiveSubmit] = useState(false)
    const [docUploading, setDocUploading] = useState(false)
    const [uploadedDoc, setUplodedDoc] = useState(false)
    const [imgUploading, setImgUploading] = useState(false)
    const [uploadedImg, setUplodedImg] = useState(false)
    const [errorDoc, setErrorDoc] = useState('')
    const [errorImg, setErrorImg] = useState('')
    const [open, setOpen] = useState(true)
    const [errorCatch, setErrorCatch] = useState('')

    

    const addData = useSelector(state => state.adminAddCabs)
    
    const {loading,error,cabsAddInfo} = addData
    // console.log(cabsAddInfo);

    

    // const cabsData = useSelector(state => state.adminAddCabs)

    // const adminLogin = useSelector(state => state.adminLogin)
    
    const ownerInfo = JSON.parse(localStorage.ownerInfo);
    

  const handleImages = (e)=>{
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
  }

  const handleOk = (e)=>{
    props.setAdd(!props.add)
  }

    const submitDocument = (async(e)=>{
        e.preventDefault()
        console.log(document);
        const uploadDocument = async (document) => {
           
          if(document === ''){
              setErrorDoc('Minimum One Document Required')
          }else{
            setDocUploading(true)
            try {

                const formData = new FormData()
                formData.append("file", document);
                formData.append("upload_preset", "exploreKerala");
            
                const response = await uploadCloudinary(formData)
                const responseData = response.data;
                console.log(responseData.url);
                console.log(responseData.public_id);
                const documentData = {
                    url: responseData.url,
                    public_id: responseData.public_id
                }
                console.log(documentData);
                
                setDocUploading(false)
                setUplodedDoc(true)
                setErrorDoc('')
                return setNewDocument({documentData})

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
        const docData = await uploadDocument(document)
    })

    const submitImages = (async(e)=>{
        e.preventDefault()
        console.log(images);
          
        const uploadImages = async (images) => {
            if(images.length !== 3){
                setErrorImg("Minimum number of images is three")
            }else{
                     setImgUploading(true)
                    let imagesArray = images; // Declare as a regular variable instead of const
                
                    if (!Array.isArray(imagesArray)) {
                    imagesArray = [imagesArray]; // Convert single image to an array
                    }
                    
                    try {
                        const uploadPromises = imagesArray.map((image) => {
                                const formData = new FormData();
                                formData.append("file", image);
                                formData.append("upload_preset", "exploreKerala");
                            
                                return uploadCloudinary(formData)
                        });
                        const responses = await Promise.all(uploadPromises);
                        console.log("Images uploaded successfully:", responses);
                        const urlArray = []
                        responses.forEach((element)=>{
                            if (Object.prototype.hasOwnProperty.call(element.data, 'url') && Object.prototype.hasOwnProperty.call(element.data, 'public_id')) {
                                const url = element.data.url;
                                const public_id = element.data.public_id;
                                console.log(url);
                                console.log(public_id);
                                urlArray.push({
                                url: url,
                                public_id: public_id
                                });
                            }
                        })
                        console.log(urlArray);
                        setImgUploading(false)
                        setUplodedImg(true)
                        setErrorImg('')
                        return setNewImages({urlArray})
                    
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
        const imageData = await uploadImages(images);

    })

  const submiting = async (e)=>{
    e.preventDefault()

    if(registerNumber&&brandname&&modelname&&destination&&district&&seatingCapacity&&fuelType&&minCharge&&extraFair&&document &&images.length>=3){
        console.log(brandname,modelname,destination,district,seatingCapacity,fuelType,extraFair,document,images);
        const admin_id = ownerInfo._id

            dispatch(addCabs(admin_id,registerNumber,brandname,modelname,destination,district,seatingCapacity,fuelType,minCharge,extraFair,newDocument,newImages));
        
    }else{
        
    }


  }

  

  useEffect(()=>{
     if(newImages.length !==0 && newDocument !== ''){
        setActiveSubmit(true)
     }

  },[newDocument,newImages]);


    

  return (
    <>
    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
        {props.add &&
            <section class="sm:w-full md:w-96 mx-auto bg-[#20354b] text-center text-red-500 rounded-2xl px-8 py-6 shadow-lg"> 
                      <div className='flex justify-end'>

                            <span id="dropdownHoverButton" onClick={()=>props.setAdd(!props.add)}  data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-emerald-400  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-end " type="button" >
                            { <IoMdCloseCircle size={32} color="red"/>}
                            </span>         
                      </div>
                      <h1 className='-mt-9'>{props.Heading}</h1>

                     {error && <OwnerError message={error}>{error}</OwnerError>}
                     {loading && <OwnerLoading />}         
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
                                    //   value={phonenumber}
                                      onChange={(e) => setRegisterNumber(e.target.value)}
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
                                    //   value={phonenumber}
                                      onChange={(e) => setBrandname(e.target.value)}
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
                                    //   value={phonenumber}
                                      onChange={(e) => setModelname(e.target.value)}
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
                                        //   value={firstname}
                                          name="destination"
                                          placeholder="Choose One"
                                          onChange={(e) => setDestination(e.target.value)}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        >
                                            <option value="" className='text-gray-400'>Choose</option>
                                                {props.destinations.map((element) => (
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
                                        //   value={lastname}
                                        //   placeholder={props.profileData.lastname}
                                          onChange={(e) => setDistrict(e.target.value)}
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
                                        //   value={firstname}
                                          name="seatingcapacity"
                                          placeholder="Choose One"
                                          onChange={(e) => setSeatingCapacity(e.target.value)}
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
                                          name="fueltype"
                                        //   value={lastname}
                                        //   placeholder={props.profileData.lastname}
                                          onChange={(e) => setFuelType(e.target.value)}
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
                                    //   value={phonenumber}
                                      onChange={(e) => setMinCharge(e.target.value)}
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
                                      name="extrafair"
                                    //   value={phonenumber}
                                      onChange={(e) => setExtraFair(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                          
                          <form action="">
                                <div className="block text-sm font-medium text-gray-50 undefined text-left mt-4 outline-none outline-gray-800 p-3 rounded-md">
                                    
                                            <label className="block pb-2">
                                                
                                                Choose Atleast One document of Your Property  
                                            </label>
                                            <span className="sr-only"></span>
                                                <input type="file" name='image' className="block w-full text-sm text-gray-500
                                                        border-red-50
                                                        file:mr-4 file:py-2 file:px-4
                                                        file:rounded-md file:border-0
                                                        file:text-sm file:font-semibold
                                                        file:bg-purple-700 file:text-white
                                                        hover:file:bg-purple-950
                                                        "
                                                        onChange={(e)=>setDocument(e.target.files[0])}
                                                />

                                    
                                    <div className="w-full  mb-6 md:mb-0 pr-1 mt-2">
                                         {!uploadedDoc ?
                                            <button onClick={submitDocument} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                {!docUploading ?
                                                     <span>Submit Document</span>
                                                     :
                                                     <div role="status">
                                                        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                                }
                                            </button>:
                                             <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                <BsFillCheckCircleFill className='mx-auto' color='white' size={30}/>
                                             </div>
                                           }
                                           {errorDoc !== '' &&
                                              <span className='text-red-600'>{errorDoc}</span>
                                           }
                                    </div>
                                </div>
                        </form>
                        
                        <form action="">
                          <div className="block text-sm font-medium text-gray-50 undefined text-left mt-4 outline-none outline-gray-800 p-3 rounded-md">
                              <label className="block pb-2">
                                  Choose Atleast Three document of Your Property
                              </label>
                              <span className="sr-only">Choose profile photo</span>
                                          <input type="file" name='image' multiple className="block w-full text-sm text-gray-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-md file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-purple-700 file:text-white
                                          hover:file:bg-purple-950
                                          "
                                          onChange={handleImages}
                                  />

                                <div className="w-full  mb-6 md:mb-0 pr-1 mt-2">
                                {!uploadedImg ?
                                            
                                            <button onClick={submitImages} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                {!imgUploading ?
                                                    <span>Submit Images</span>
                                                    :
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
                                        {errorImg !== '' &&
                                              <span className='text-red-600'>{errorImg}</span>
                                        }
                                </div>
                          </div>
                        </form>
                          
                          
          
                          <div className="flex items-center mt-4">
                            {activesubmit ?
                              <button onClick={submiting} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                  Add
                              </button>: <div className='text-center'><h1 className='text-sm text-center text-red-500'>Please Submit Images and Documents</h1></div>
                            }

                            
                          </div>
                      </form>
            </section>
          }          
        </div>

                          {cabsAddInfo !== undefined && open && <SuccessModal open={open} onClose={()=>setOpen(false)}>
                                <div className='text-center w-56'>
                    
                                    <GiConfirmed size={56} className='mx-auto text-green-600'></GiConfirmed>
                                    <div className='mx-auto my-4 w-48'>
                                        <h3 className='text-lg font-black text-gray-800 '>Item Added</h3>
                                        <p className='text-sm text-red-600'>Item sent for the admin confirmation</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={()=>{setOpen(false);props.setActive('My Properties')}} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Ok</button>
                                    </div>
                                </div>
                            </SuccessModal>}
                            {errorCatch !== '' &&
                                <OwnerTokenExpire message={errorCatch}/>
                            }
        </>
  )
}

export default CabsAdd
