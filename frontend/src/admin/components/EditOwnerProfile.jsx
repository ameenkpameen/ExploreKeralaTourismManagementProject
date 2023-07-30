import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { editOwnerProfile } from '../../actions/adminActions';
import OwnerError from './OwnerError';
import OwnerLoading from './OwnerLoading';
import { uploadCloudinary } from '../../api/OwnerAPI';
import OwnerTokenExpire from './OwnerTokenExpire';
import {BsFillCheckCircleFill} from 'react-icons/bs'

function EditOwnerProfile(props) {
    const navigate = useNavigate();
    
    const [firstname,setFirstname] = useState(props.profileData.firstname)
    const [lastname,setLastname] = useState(props.profileData.lastname)
    const [phonenumber,setPhonenumber] = useState(props.profileData.phonenumber)
    const [email,setEmail] = useState(props.profileData.email)
    const [image,setImage] = useState(props.profileData.image)
    const [editImage,setEditImage] = useState(false)
    const currImage = props.profileData.image
    const [image_url, setImage_url] = useState(props.profileData.image);
    const [public_id, setPublic_id] = useState(props.profileData.public_id);
    const [uploading, setUploading] = useState(false)
    const [imageError, setImageError] = useState('')
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const dispatch = useDispatch()
    const adminsLogin = useSelector(state => state.ownerEditProfile)
     const { loading,error, adminInfo } = adminsLogin
     const [errorCatch, setErrorCatch] = useState('')
     const [uploaded, setUploaded] = useState(false)

    

    const imageSubmit = (async(e)=>{
        e.preventDefault();
        if(editImage){
            try{
                    setUploading(true)
                    const formData = new FormData()
                    formData.append("file", image);
                    formData.append("upload_preset", "exploreKerala");
                    
                        const response = await uploadCloudinary(formData)
                    
                        const responseData = response.data;
                        setImage_url(responseData.url);
                        setPublic_id(responseData.public_id);
                        setCloudinaryImage(responseData.secure_url);
                        if(responseData){
                            setUploading(false)
                            setUploaded(true)
                        }
                
                
            }catch(error){
                if(error?.response?.data?.message === 'jwt expired'){
                    localStorage.removeItem('ownerInfo')
                    setErrorCatch(error.response.data.message)
                }else{
                    console.log(error);
                }
            }
        }else{
            setImageError('Minimum One Document Required')
        }
        
     })

    
    const submitHandler = async(e)=>{
        e.preventDefault();
        const id = props.profileData._id
        try {
            if(editImage){   
                dispatch(editOwnerProfile(id, firstname, lastname,phonenumber, email, image_url, public_id));
                props.setEdit(false)    
            }else{
                const newImage_url = props.profileData.image
                const newPublic_id = props.profileData.public_id
                dispatch(editOwnerProfile(id, firstname, lastname,phonenumber, email, newImage_url, newPublic_id));
                props.setEdit(false)
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
     

  
  
    return (
        <>
                        {error && <OwnerError message={error}>{error}</OwnerError>}
                        {loading && <OwnerLoading />}
                      <form className="mt-6" onSubmit={submitHandler}>
                         
                          <div className='flex flex-wrap'>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label
                                      htmlFor="name"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      First Name
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text"
                                          value={firstname}
                                          name="firstname"
                                          placeholder={props.profileData.firstname}
                                          onChange={(e) => setFirstname(e.target.value)}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label
                                      htmlFor="name"
                                      className="block text-sm font-medium text-gray-50 undefined text-center"
                                  >
                                      Last Name
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text"
                                          name="lastname"
                                          value={lastname}
                                          placeholder={props.profileData.lastname}
                                          onChange={(e) => setLastname(e.target.value)}
                                          className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="mt-4">
                              <label
                                  htmlFor="password_confirmation"
                                  className="block text-sm font-medium text-gray-50 undefined text-center"
                              >
                                  Phone Number
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number"
                                      name="phonenumber"
                                      value={phonenumber}
                                      placeholder={props.profileData.phonenumber}
                                      onChange={(e) => setPhonenumber(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                          <div className="mt-4">
                              <label
                                  htmlFor="email"
                                  className="block text-sm font-medium text-gray-50 undefined text-center"
                              >
                                  Email
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="email"
                                      name="email"
                                      value={email}
                                      placeholder={props.profileData.email}
                                      onChange={(e) => setEmail(e.target.value)}
                                      className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                        <form action="">  
                          <div className="mt-4 outline-none outline-gray-800 p-3 rounded-md">
                            {!uploaded &&
                                <label className="block">
                                    <span className="sr-only">Choose profile photo</span>
                                            <input type="file" name='image' className="block w-full text-sm text-gray-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-md file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-purple-700 file:text-white
                                            hover:file:bg-gray-600
                                            "
                                            onChange={(e) => {
                                                const handleOnChange = () => {
                                                setImage(e.target.files[0]);
                                                setEditImage(true);
                                                };
                                            
                                                handleOnChange();
                                            }}
                                    />
                                </label>
                            }
                                <div className="w-full  mb-6 md:mb-0 pr-1 mt-2">
                                    {!uploaded ?
                                        <button onClick={imageSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors text-sm duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                            {!uploading ?
                                                <span>Submit Image</span> :
                                                <div role="status">
                                                        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                        </svg>
                                                        <span class="sr-only">Loading...</span>
                                                    </div>
                                            }
                                        </button> :
                                        <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                <BsFillCheckCircleFill className='mx-auto' color='white' size={30}/>
                                        </div>
                                    }
                                </div>
                                {imageError && 
                                    <div className='mt-3'>
                                        <span className='text-red-600 mt-5'>{imageError}</span>
                                    </div>
                                }
                          </div>
                        </form>
                          
                          
          
                          <div className="flex items-center mt-4">
                              <button onClick={submitHandler} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                  Edit
                              </button>
                          </div>
                      </form>
                      {errorCatch !== '' &&
                            <OwnerTokenExpire message={errorCatch}/>
                        }
        </>
    )
}

export default EditOwnerProfile
