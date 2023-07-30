import React, { useEffect, useState } from 'react'
import {AiTwotoneEdit} from "react-icons/ai"
import {IoMdCloseCircle} from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from './errorMessage';
import EditProfile from './EditProfile';
import { useNavigate } from 'react-router-dom';
import { getProfileData } from '../../api/UserAPI';
import TokenExpireModal from './TokenExpireModal';
import { hideLoading, showLoading } from '../../actions/alertSlice';

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [profileData, setprofileData] = useState([])
    const [edit,setEdit] = useState(false)
    const [edited,setEdited] = useState(false)
    const [blocked, setBlocked]= useState(false)
    const [errorCatch, setErrorCatch]= useState('')

    const userLogin = useSelector((state)=> state.userLogin)
    const {loading,error,userInfo} = userLogin
     

    if(localStorage.userInfo !== undefined){
        var user = JSON.parse(localStorage.userInfo);
      }
    
    const id = userInfo ? userInfo._id : navigate('/')

    useEffect(()=>{
        async function getAdminInfo(){
            try {
                dispatch(showLoading())
                const {data} = await getProfileData(id)
                if(data){
                    dispatch(hideLoading())
                    if(data.blocked){
                        setBlocked(true)
                    }else{
                        setprofileData(data.user)
                    }
                }else{
                    navigate('/')
                }
            } catch (error) {
                if(error.response.data.message === 'jwt expired'){
                    localStorage.removeItem('userInfo')
                    setErrorCatch(error.response.data.message)
                }
            }
            
        }
        getAdminInfo()
    },[edit])


  return (
    <div className='flex justify-center overflow-hidden'>
     <div className='container min-h-screen mt-32'>
    <div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 py-20'>
         
            {!blocked ?
            <>    
                {!edit ?
                 <h1 className='mx-auto text-2xl text-center text-white font-semibold mb-5'>My Profile</h1> :
                 <h1 className='mx-auto text-2xl text-center text-white font-semibold mb-5'>Edit Profile</h1>
                }
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
                
                    <div class="mt-6 ">
                        <h2 class="text-gray-800 font-bold text-lg tracking-wide">{profileData.firstname} <br/> {profileData.lastname}</h2>
                    </div>

                    <div class="h-1 w-full bg-black mt-6 rounded-full">
                        <div class="h-1 rounded-full w-full bg-red-600 "></div>
                    </div>

                    <p class="text-gray-600 font-semibold mt-2.5" >
                        Phone: <span className='text-gray-600'>{profileData.phonenumber}</span>
                    </p>
                    <p class="text-gray-600 font-normal mt-2.5 text-base" >
                        Joined On: <span className='text-gray-600 text-base'>{profileData.createdAt}</span>
                    </p>

                    <p class="text-gray-600 font-normal mt-2.5 text-base" >
                        Last Updated On: <span className='text-gray-600 text-base'>{profileData.updatedAt}</span>
                    </p>

                    <p class="text-gray-600 font-normal mt-2.5 text-base" >
                        Email Address: <br /> <span className='text-red-600 text-lg'>{profileData.email}</span>
                    </p>
                    </div>
                    
                  }
                    
                   {
                        edit && <EditProfile setEdit={setEdit} profileData={profileData}/>
                    }
                </section>
                </>
            :
                <h1>You are blocked by admin</h1>
                }
            

                




            
    </div>
    </div>
    {errorCatch !== '' &&
        <TokenExpireModal message={errorCatch} />
    }
    </div>
  )
}

export default Profile
