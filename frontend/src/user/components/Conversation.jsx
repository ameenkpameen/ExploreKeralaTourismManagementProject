import React, { useEffect, useState } from 'react'
import { getOwnerData } from '../../api/UserAPI';

function Conversation({data, currentUserId, online}) {
  const [ownerData, setOwnerData] = useState(null)

  useEffect(()=>{
      const ownerId = data.members.find((id)=> id !== currentUserId)
      const getOwnersData = async()=>{
        try {
            const {data} = await getOwnerData(ownerId)
            if(data){
                setOwnerData(data.ownerData)
            }
        } catch (error) {
            console.log(error);
        }
      }
      getOwnersData()
  },[])
  return (
    <>
        <div className='follower conversation '>
            <div className='flex flex-row '>
                {online && <div className="online-dot"></div>}
                
                    <img className='followerImage rounded-full' src={ownerData ?. image} alt="" style={{width: '50px', height: '50px'}} />
                <div className="name ml-3 flex flex-col mt-1" style={{fontSize: '1.0rem'}}>
                    <span className='font-bold '>{ownerData?.firstname} {ownerData?.lastname}</span>
                    {online ?
                        <span className='text-xs text-green-500'>Online</span> :
                        <span className='text-xs text-red-500'>Offline</span>
                    }
                </div>
            </div>
        </div>
        <hr className='mx-auto' style={{width: '85%', border:'0.1px solid #ececec'}}/>
    </>
  )
}

export default Conversation
