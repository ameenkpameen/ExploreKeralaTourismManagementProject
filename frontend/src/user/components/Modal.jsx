import React from 'react'
import {AiOutlineClose} from "react-icons/ai"
function Modal({open,onClose, children}) {
  return (
    <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}>
        <div onClick={(e)=>e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 transition-all
        ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}>
          <button onClick={onClose} className='absolute top-3 z-10 right-3 p-1 rounded-full text-white bg-red-600  hover:text-white'>
            <AiOutlineClose />
          </button>

           {children}

        </div>
    </div>
  )
}

export default Modal