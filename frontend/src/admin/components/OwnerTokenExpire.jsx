import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
import {FcCancel} from "react-icons/fc"
import { useNavigate } from 'react-router-dom'

function OwnerTokenExpire({message}) {
    const navigate = useNavigate()

    return (
      <div  className={`fixed inset-0 flex justify-center items-center transition-colors visible bg-black/70 `}>
          <div  className={`bg-white rounded-xl shadow p-6 transition-all
        "scale-100 opacity-100" }
        `}>
          <div className='text-center w-56'>
  
          <FcCancel size={40} className='mx-auto text-red-600'></FcCancel>
          <div className='mx-auto my-4 w-48'>
              <h3 className='text-lg font-black text-red-500 '>{message}</h3>
              <p className='text-sm text-blue-500'>Please Login</p>
          </div>
          <div className="flex gap-4">
              <button onClick={()=>navigate('/owner')} className="btn bg-white text-black shadow-lg hover:bg-gray-100 text-sm p-2 rounded-lg w-full">Login</button>
              
          </div>
          </div>
          </div>
      </div>
    )
}

export default OwnerTokenExpire
