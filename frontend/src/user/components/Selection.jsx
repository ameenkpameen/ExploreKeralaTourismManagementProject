import axios from 'axios'
import React, { useEffect, useState } from 'react'
import baseURL from '../../config'
import { getDestinationProperties } from '../../api/UserAPI'
import { useNavigate } from 'react-router-dom';
import TokenExpireModal from './TokenExpireModal';

function Selection({image, caption}) {
  const navigate = useNavigate();
  const [errorCatch, setErrorCatch]= useState('')

  const exploreSubmit = async(destination)=>{
    
      try {
        const {data} = await getDestinationProperties(destination)
        if(data){
          navigate('/showdestinationproperties',{state:data.combinedArray})
        }
      } catch (error) {
        if(error.response.data.message === 'jwt expired'){
          localStorage.removeItem('userInfo')
          setErrorCatch(error.response.data.message)
        }
      }
    
}
    
  return (
    <div>
      
                <figure className='relative' onClick={()=>exploreSubmit(caption)}>
                  <img src={image} alt={caption} className='w-full rounded-xl h-64 object-cover' />
                  <figcaption className='absolute z-10 bottom-2 left-2 text-white text-2xl font-bold'>
                    {caption}
                  </figcaption>
                  <div className='absolute top-0 left-0 w-full h-full bg-black/30 rounded-xl'></div>
                </figure>

                {errorCatch !== '' &&
                  <TokenExpireModal message={errorCatch} />
                }
    </div>
  )
}

export default Selection
