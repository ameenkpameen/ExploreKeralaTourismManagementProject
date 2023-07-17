import React, { useEffect } from 'react'
import { useState } from "react";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Link, Navigate, useNavigate } from 'react-router-dom'




import {MdAddHomeWork} from "react-icons/md"
import {RiAdminLine} from "react-icons/ri"
import {BiMoneyWithdraw} from "react-icons/bi"
import {BiAddToQueue} from "react-icons/bi"

import {MdOutlinePropaneTank} from "react-icons/md"

import DashBoard from './DashBoard';
import Profile from './Profile';
import PlanTrip from './PlanTrip';
import ListDestinations from './ListDestinations';
import axios from 'axios';
import baseURL from '../../config';
import LoginPage from '../pages/LoginPage';
import Sidebar from './Sidebar';

function NavbarPart() {

    

  const [navbar, setNavbar] = useState(false)
  const [open, setOpen] = useState(true);
  
  

  if(localStorage.userInfo !== undefined){
    var user = JSON.parse(localStorage.userInfo);
    console.log(user.firstname);
  }

  const userLogin = useSelector((state)=> state.userLogin)
  const {loading,error,userInfo} = userLogin


  const navigate = useNavigate()
  const dispatch = useDispatch();
  
  const logoutHandler = ()=>{
    localStorage.removeItem("userInfo")
    // dispatch(logout())
    navigate('/')
  }

  

  return (
    <div>
      <nav className="w-full bg-black shadow fixed inset-x-0 z-50">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                  <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className='flex items-center justify-between'>
                                
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
                                <a href="/">Home</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="/">Blog</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="/">About US</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="/">Contact US</a>
                            </li>
                        </ul>

                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                        {!user && <Link
                            to="/login"
                            className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                        >
                            Sign in
                        </Link>}
                        {user && <Link
                            
                            className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                        >
                            {user.firstname +" "+ user.lastname}
                        </Link>}
                        {user && <Link
                            onClick={logoutHandler}
                            className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                        >
                            Logout
                        </Link>}
                </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                
                {user && <Link
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                        >
                        {user.firstname +" "+ user.lastname}
                </Link>}

                {user && <Link
                        onClick={logoutHandler}
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Logout
                    </Link>}
                    
                    {! user && <Link
                        to="/login"
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Sign in
                    </Link>
                    }
                </div>
            </div>
        </nav>
      {/* {user ?
         <Sidebar />
        :

             <div className='min-h-screen bg-white'>
                Please Login
             </div>

        } */}
    </div>
  )
}

export default NavbarPart
