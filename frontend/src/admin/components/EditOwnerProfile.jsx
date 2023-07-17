import React, { useState } from 'react'
import OwnerFooter from './OwnerFooter'
import {AiTwotoneEdit} from "react-icons/ai"
import { Link,useNavigate } from 'react-router-dom'


import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { editOwnerProfile } from '../../actions/adminActions';
import OwnerError from './OwnerError';
import OwnerLoading from './OwnerLoading';

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
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const dispatch = useDispatch()
    const adminsLogin = useSelector(state => state.ownerEditProfile)
     const { loading,error, adminInfo } = adminsLogin

    

    const imageSubmit = (async(e)=>{
        e.preventDefault();
        if(editImage){
            try{
           
                console.log("herereerere");
                const formData = new FormData()
                formData.append("file", image);
                formData.append("upload_preset", "exploreKerala");
                
                    const response = await axios.post(
                      "https://api.cloudinary.com/v1_1/dp7ydtvg8/image/upload",
                      formData
                    );
                
                    const responseData = response.data;
                    console.log(responseData);
                    setImage_url(responseData.url);
                    setPublic_id(responseData.public_id);
                    setCloudinaryImage(responseData.secure_url);
                    
                    console.log(image_url);
                    console.log(public_id);
            }catch(error){
                console.log(error);
            }
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
            console.log(error);
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
                              <div className="w-full  mb-6 md:mb-0 pr-1 mt-2">
                                    <button onClick={imageSubmit} className="w-full px-4 py-2 tracking-wide text-white transition-colors text-sm duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                        Submit Image
                                    </button>
                                </div>
                          </div>
                        </form>
                          
                          
          
                          <div className="flex items-center mt-4">
                              <button onClick={submitHandler} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                  Edit
                              </button>
                          </div>
                      </form>
                      
        </>
    )
}

export default EditOwnerProfile
