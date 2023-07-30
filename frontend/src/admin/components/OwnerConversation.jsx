import React, { useEffect, useState } from 'react'
import { getUserData } from '../../api/OwnerAPI';
import OwnerTokenExpire from './OwnerTokenExpire';

function OwnerConversation({data, currentUserId, online}) {
    const [userData, setUserData] = useState(null)
    const [errorCatch, setErrorCatch] = useState('')

  useEffect(()=>{
      const userId = data.members.find((id)=> id !== currentUserId)
      const getOwnersData = async()=>{
        try {
            const {data} = await getUserData(userId)
            if(data){
                setUserData(data.userData)
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
      getOwnersData()
  },[])
  return (
    <>
        <div className='follower conversation '>
            <div className='flex flex-row '>
                {online &&
                    <div className="online-dot"></div>
                }
                    <img className='followerImage rounded-full' src= "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"  alt="" style={{width: '50px', height: '50px'}} />
                <div className="name ml-3 flex flex-col mt-1 " style={{fontSize: '1.0rem'}}>
                    <span className='font-bold'>{userData?.firstname} {userData?.lastname}</span>
                    {online ?
                        <span className='text-xs text-green-500'>Online</span> :
                        <span className='text-xs text-red-500'>Offline</span>
                    }
                </div>
            </div>
        </div>
        <hr className='mx-auto' style={{width: '85%', border:'0.1px solid #ececec'}}/>
        {errorCatch !== '' &&
            <OwnerTokenExpire message={errorCatch}/>
        }
    </>
  )
}

export default OwnerConversation
