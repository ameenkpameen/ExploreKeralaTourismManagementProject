import React, { useEffect, useState } from 'react'
import axios from "axios";

import {AiTwotoneEdit} from "react-icons/ai"
import {IoMdCloseCircle} from "react-icons/io"
import { useSelector } from 'react-redux';
// import AdminError from './AdminError';
// import AdminLoading from './AdminLoading';
import ErrorMessage from './errorMessage';
import Loading from './Loading';
import baseURL from '../../config';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const navigate = useNavigate()
    const [profileData, setprofileData] = useState([])
    const [edit,setEdit] = useState(false)
    const [edited,setEdited] = useState(false)

    const userLogin = useSelector((state)=> state.userLogin)
    const {loading,error,userInfo} = userLogin
     

    if(localStorage.userInfo !== undefined){
        var user = JSON.parse(localStorage.userInfo);
      }
    
    const id = userInfo._id

    useEffect(()=>{
        async function getAdminInfo(){
            const {data} = await axios.get(`${baseURL}/getprofile/${id}`)
            if(data){
                setprofileData(data.user)
            }else{
                navigate('/')
            }
        }
        getAdminInfo()
    },[edit])


  return (
    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-20'>
         
            
                <section class="sm:w-3/4 md:w-96 mx-auto bg-[#fefefe] rounded-2xl px-8 py-6 shadow-lg">
                    {error && <ErrorMessage message={error}>{error}</ErrorMessage>}
                    <div class="flex items-center justify-between">
                        <span class="text-gray-400 text-sm">2d ago</span>
                        <span id="dropdownHoverButton" onClick={()=>setEdit(!edit)}  data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" className="text-gray-800  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center " type="button" >
                            { !edit ? <AiTwotoneEdit size={32} color="blue"/> : <IoMdCloseCircle size={32} color="red"/>}
                        </span>
                    </div>
                    {!edit &&
                   <div>
                    {/* <div class="mt-6 w-fit mx-auto">
                        <img src={profileData.image} class="rounded-full w-28 " alt="profile picture" srcset="" />
                    </div> */}

                    <div class="h-1 w-full bg-black mt-8 rounded-full">
                        <div class="h-1 rounded-full w-full bg-red-600 "></div>
                    </div>
                
                    <div class="mt-8 ">
                        <h2 class="text-gray-800 font-bold text-2xl tracking-wide">{profileData.firstname} <br/> {profileData.lastname}</h2>
                    </div>

                    <div class="h-1 w-full bg-black mt-8 rounded-full">
                        <div class="h-1 rounded-full w-full bg-red-600 "></div>
                    </div>

                    <p class="text-gray-600 font-semibold mt-2.5" >
                        Phone: <span className='text-gray-600'>{profileData.phonenumber}</span>
                    </p>
                    <p class="text-gray-600 font-normal mt-2.5" >
                        Joined On: <span className='text-gray-600'>{profileData.createdAt}</span>
                    </p>

                    <p class="text-gray-600 font-normal mt-2.5" >
                        Last Updated On: <span className='text-gray-600'>{profileData.updatedAt}</span>
                    </p>

                    <p class="text-gray-600 font-normal mt-2.5" >
                        Email Address: <br /> <span className='text-gray-600'>{profileData.email}</span>
                    </p>
                    </div>
                    
                  }
                    
                   {
                        edit && <EditProfile setEdit={setEdit} profileData={profileData}/>
                    }
                </section>

                




            
    </div>
  )
}

export default Profile
