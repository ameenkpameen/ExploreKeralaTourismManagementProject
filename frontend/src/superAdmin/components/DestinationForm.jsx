import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addDestination } from '../../actions/superAdminActions';
import SuperAdminError from './SuperAdminError';
import SuperAdminLoading from './SuperAdminLoading';
import {BsFillCheckCircleFill} from 'react-icons/bs'
import Modal from './Modal';
import {GiConfirmed} from "react-icons/gi"
import {BiErrorAlt} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';
import { uploadCloudinary } from '../../api/SuperadminAPI';

function DestinationForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [destination, setDestination] = useState('');
    const [district, setDistrict] = useState('');
    const [spots, setSpots] = useState('');
    const [image, setImage] = useState(null);
    const [image_url, setImage_url] = useState(null);
    const [public_id, setPublic_id] = useState(null);
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const [imgUploading, setImgUploading] = useState(false)
    const [uploadedImg, setUplodedImg] = useState(false)
    const [errorImg, setErrorImg] = useState('')
    const [activeSubmit, setActiveSubmit] = useState(false)
    const [open, setOpen] =useState(false)

    const addsDestination = useSelector(state => state.addDestination)
    const { loading,error} = addsDestination
    

    const imageUpload = (async (e)=>{
      e.preventDefault()

      const uploadImage = async (image) => {
        console.log(image);
        if(image === null){
          setErrorImg('Minimum One Document Required')
        }else{
          setImgUploading(true)
          try {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "exploreKerala");

            const response = await uploadCloudinary(formData)
        
            const responseData = response.data;
            setImage_url(responseData.url);
            setPublic_id(responseData.public_id);
            setCloudinaryImage(responseData.secure_url);

            setImgUploading(false)
            setUplodedImg(true)
            setErrorImg('')
            setActiveSubmit(true)
          } catch (error) {
            console.log(error);
          }
        }
      
      }

      const docData = await uploadImage(image)
    })

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(error);
        dispatch(addDestination(destination, district, spots, image_url, public_id));
        setOpen(true)
      };

      
  

  return (
        <div>
          <div className='flex justify-center'>
          <div className='container min-h-screen mt-32'>
           <div className="container mx-auto py-8">
                <h1 className="text-2xl text-blue-950 font-bold mb-6 text-center">Add New Destination</h1>
                {error && <SuperAdminError message={error}>{error}</SuperAdminError>}
                {loading && <SuperAdminLoading />}
                <form onSubmit={submitHandler} className="w-full max-w-sm mx-auto text-white bg-[#20354b] p-8 rounded-lg shadow-xl drop-shadow-2xl" encType="multipart/form-data">
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="destination">Destination Name</label>
                    <input className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text" id="name" name="destination" placeholder="" value={destination} onChange={(e)=>setDestination(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="district">District</label>
                    <input className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text" id="email" name="district" value={district} onChange={(e)=>setDistrict(e.target.value)} />
                </div>
                <div className="mb-4">
                    <label className="block text-white text-sm font-bold mb-2" htmlFor="spots">Tourist Spots</label>
                    <input className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                    type="text" multiple id="spots" name="spots" placeholder="" value={spots} onChange={(e)=>setSpots(e.target.value)}/>
                </div>
                <div className="mb-4">
                    <form action="">
                        <label className="block">
                            <span className="sr-only">Choose profile photo</span>
                                <input type="file" name='image' className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-black file:text-white
                                hover:file:bg-gray-600
                                "
                                onChange={(e)=>setImage(e.target.files[0])}
                                />
                                <div className="w-full  mb-6 md:mb-0 pr-1 mt-2">
                                         {!uploadedImg ?
                                            <button onClick={imageUpload} className="w-full px-4 py-2 tracking-wide text-white text-base transition-colors duration-200 transform bg-black rounded-md ">
                                                {!imgUploading ?
                                                     <span>Submit Image</span>
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
                                           {errorImg !== '' &&
                                              <span className='text-red-600 text-sm'>{errorImg}</span>
                                           }
                                    </div>
                        </label>
                    </form>  
                </div>
                    {activeSubmit &&
                        <button
                        className="w-full bg-black text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                        type="submit">Save</button>
                    }
                </form>
            </div>

                <Modal open={open} onClose={()=>setOpen(false)}>
                  <div className='text-center w-56'>
                    {error ?
                        <div>
                            <BiErrorAlt size={56} className='mx-auto text-red-600'></BiErrorAlt>
                            <div className='mx-auto my-4 w-48'>
                                <h3 className='text-lg font-black text-red-700 '>{error}</h3>
                                
                            </div>
                            <div className="flex gap-4">
                                <button onClick={()=>{setOpen(false)}} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Ok</button>
                            </div>
                        </div>  :
                          <div>
                             <GiConfirmed size={56} className='mx-auto text-green-600'></GiConfirmed>
                            <div className='mx-auto my-4 w-48'>
                                <h3 className='text-lg font-black text-gray-800 '>Destinatio Added</h3>
                                <p className='text-sm text-red-600'>Successfully</p>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={()=>{navigate('/superadmin/listDestinations');setOpen(false)}} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Ok</button>
                            </div>
                          </div>
                  }
                      
                  </div>
              </Modal>
        </div>
        </div>
        </div>
        
  )
}

export default DestinationForm
