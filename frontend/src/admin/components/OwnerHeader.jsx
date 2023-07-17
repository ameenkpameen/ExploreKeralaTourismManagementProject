import React, { useState } from 'react'
import { useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { adminLogout } from '../../actions/adminActions';

import {HiMenuAlt3} from "react-icons/hi"


function OwnerHeader() {


    const [open, setOpen] = useState(true);

   if(localStorage.ownerInfo !== undefined){
        var admin = JSON.parse(localStorage.ownerInfo);
      }
  const [navbar, setNavbar] = useState(false)
  
  const dispatch = useDispatch()

  const logoutHandler = ()=>{
      dispatch(adminLogout())
  }


  return (
    <div>   
          
            <nav className="w-full bg-black shadow fixed   inset-x-0 z-50">
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className='flex items-center justify-between'>
                                <div className=' flex justify-end text-gray-50'>
                                            <HiMenuAlt3 size={26} className='cursor-pointer' onClick={()=>setOpen(!open)}/>
                                </div>
                                <h3 className="rounded-lg w-48 font-LobsterTwo text-3xl text-center text-white">
                                    <span className='font-Squada font-bold text-red-400'>E</span>xplore<span className='font-Squada font-bold text-red-400'>K</span>erala
                                </h3>
                        </div>
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-white"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                                navbar ? "block" : "hidden"
                            }`}
                        >
                            <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                                <li className="text-white hover:text-indigo-200">
                                    <h1 className='font-bold'>Admin Panel</h1>
                                </li>
                                
                            </ul>

                            <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                            {admin && <Link
                                onClick={logoutHandler}
                                className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                            >
                                Logout
                            </Link>}
                            {admin && <Link
                                
                                className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                            >
                                {admin.firstname +" "+ admin.lastname}
                            </Link>}

                            {!admin && <Link
                                to="/owner/login"
                                className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                            >
                                Login
                            </Link>}
                    </div>
                        </div>
                    </div>
                    <div className="hidden space-x-2 md:inline-block">
                    
                    { admin &&
                        <Link
                        onClick={logoutHandler}
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Logout
                    </Link>
                    }
                        
                        
                        {!admin && <Link
                            to="/owner/login"
                            className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                        >
                            Sign in
                        </Link>}
                        
                    </div>
                </div>
            </nav>
           {/* {admin &&
             <SideBar />
            } */}
    </div>
  )
}

export default OwnerHeader

