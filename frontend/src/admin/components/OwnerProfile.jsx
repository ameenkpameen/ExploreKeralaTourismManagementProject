import React, { useEffect, useState } from 'react'
import baseURL from "../../config";
import axios from "axios";

import {AiTwotoneEdit} from "react-icons/ai"
import {IoMdCloseCircle} from "react-icons/io"
import EditOwnerProfile from './EditOwnerProfile';
import { useSelector } from 'react-redux';
import OwnerError from './OwnerError';
import OwnerLoading from './OwnerLoading';


function OwnerProfile() {

    const [profileData, setprofileData] = useState('')
    const [edit,setEdit] = useState(false)
    const [edited,setEdited] = useState(false)
    // const adminsLogin = useSelector(state => state.adminLogin)
    // const { loading,error, adminInfo } = adminsLogin

    const adminsLogin = useSelector(state => state.ownerEditProfile)
    const { loading,error, adminsInfo } = adminsLogin

    // console.log(adminsInfo);

    if(localStorage.ownerInfo !== undefined){
        var owner = JSON.parse(localStorage.ownerInfo);
      }

    const id = owner._id

    useEffect(()=>{
        async function getAdminInfo(){
            const {data} = await axios.get(`${baseURL}/owner/getprofile/${id}`)
            if(data){
                setprofileData(data.owner)
            }
        }
        getAdminInfo() 
    },[edit])

    console.log(profileData);

   
    
  return (
    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-20'>
                 
                {owner.status === 'inActive' ?
                   <h1 className=' text-red-600 bg-white p-5 rounded-lg'>You Are Blocked by Admin</h1> :
            
                <section class="sm:w-3/4 md:w-96 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                    {error && <OwnerError message={error}>{error}</OwnerError>}
                    {loading && <OwnerLoading />}
                    <div class="flex items-center justify-between">
                        <span class="text-gray-400 text-sm">2d ago</span>
                        <span id="dropdownHoverButton" onClick={()=>setEdit(!edit)}  data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" class="text-emerald-400  focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center " type="button" >
                            { !edit ? <AiTwotoneEdit size={32} color="red"/> : <IoMdCloseCircle size={32} color="red"/>}
                        </span>
                    </div>
                    {!edit &&
                   <div>
                    <div class="mt-6 w-fit mx-auto">
                        <img src={profileData.image} class="rounded-full w-28 " alt="profile picture" srcset="" />
                    </div>

                    <div class="h-1 w-full bg-black mt-8 rounded-full">
                        <div class="h-1 rounded-full w-full bg-yellow-500 "></div>
                    </div>
                
                    <div class="mt-8 ">
                        <h2 class="text-white font-bold text-2xl tracking-wide">{profileData.firstname} <br/> {profileData.lastname}</h2>
                    </div>

                    <div class="h-1 w-full bg-black mt-8 rounded-full">
                        <div class="h-1 rounded-full w-full bg-yellow-500 "></div>
                    </div>

                    <p class="text-emerald-400 font-semibold mt-2.5" >
                        Phone: {profileData.phonenumber}
                    </p>
                    <p class="text-emerald-400 font-normal mt-2.5" >
                        Joined On: <span className='text-gray-50'>{profileData.createdAt}</span>
                    </p>

                    <p class="text-emerald-400 font-normal mt-2.5" >
                        Last Updated On: <span className='text-gray-50'>{profileData.updatedAt}</span>
                    </p>

                    <p class="text-emerald-400 font-normal mt-2.5" >
                        Email Address: <br /> <span className='text-gray-50'>{profileData.email}</span>
                    </p>
                    </div>
                    
                  }
                    
                   {
                        edit && <EditOwnerProfile setEdit={setEdit} profileData={profileData}/>
                    }
                </section>

               }




            
    </div>
  )
}

export default OwnerProfile
