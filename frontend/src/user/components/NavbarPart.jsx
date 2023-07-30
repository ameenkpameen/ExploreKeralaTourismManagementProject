import React from 'react'
import { useState } from "react";
import {  useDispatch, useSelector } from 'react-redux';
import { logout } from '../../actions/userActions';
import { Link, useNavigate } from 'react-router-dom'



function NavbarPart() {
    const navigate = useNavigate()
  if(localStorage.userInfo !== undefined){
    var user = JSON.parse(localStorage.userInfo);
  }
  const userLogin = useSelector((state)=> state.userLogin)
//   const {loading,error,userInfo} = userLogin

  const dispatch = useDispatch();
  
  const logoutHandler = ()=>{
    localStorage.removeItem("userInfo")
    dispatch(logout())
  }

  const [navIsShown, setnavIsShown] = useState(false);
  const toggleNavIsShown = () => {
    setnavIsShown((navIsShown) => !navIsShown);
  };
  

  return (
    <div>
      

        <nav className='flex justify-between items-center h-20 px-4 absolute top-0 left-0 z-10 w-full text-white bg-[#131136]'>
                <h3 className="rounded-lg w-48 font-LobsterTwo text-3xl text-center text-white">
                    <span className='font-Squada font-bold text-red-400'>E</span>xplore<span className='font-Squada font-bold text-red-400'>K</span>erala
                </h3>
            <ul className='hidden md:flex gap-6'>
                <li>
                <Link to='/'>Home</Link>
                </li>
                <li>
                <Link to='/listdestinations'>Destinations</Link>
                </li>
                <li>
                <Link to='/plantrip' href=''>Plan Travel</Link>
                </li>
                <li>
                <Link to='/myorders'>Orders</Link>
                </li>
                <li>
                <Link to='/mywallet'>Wallet</Link>
                </li>
                <li>
                <Link to='/chatpage'>Chat</Link>
                </li>
            </ul>
                 <div className='hidden md:flex'>
                
                
                <div>
                {!user && 
                     
                           <Link
                        to="/login"
                        className="flex flex-row gap-2 w-full px-4 py-2 text-center text-white "
                        >
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                            >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                            />
                            </svg>
                        <p>Sign in</p>
                        </Link>
                     
                       }
                {user && 
                        <div className='flex flex-row'>
                        <Link
                            to="/myprofile"
                            className="flex flex-row gap-2 w-full px-4 py-2 text-center text-white "
                        >
                            <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'
                            >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
                            />
                            </svg>
                            <p>Profile</p>
                        </Link>
                        <Link
                            onClick={logoutHandler}
                            className="flex flex-row gap-2 w-full px-4 py-2 text-center text-white"
                        >
                            Logout
                        </Link>
                        </div>
                        }
                </div>
                    
                        
                
            </div>
            {!navIsShown && (
                <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 md:hidden'
                onClick={toggleNavIsShown}
                >
                <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25'
                />
                </svg>
            )}
            {navIsShown && (
                <div className='md:hidden absolute z-10 top-0 left-0 w-full bg-gray-100/90 text-black px-4 py-6'>
                <div className='flex justify-between'>
                <h3 className="rounded-lg w-48 font-LobsterTwo text-3xl text-center text-gray-950">
                    <span className='font-Squada font-bold text-red-400'>E</span>xplore<span className='font-Squada font-bold text-red-400'>K</span>erala
                </h3>
                    <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                    onClick={toggleNavIsShown}
                    >
                    <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                    />
                    </svg>
                </div>
                <ul className='mt-5 mb-4'>
                    <li className='border-b-2 border-b-gray-600'>
                    <Link to='/'>Home</Link>
                    </li>
                    <li className='border-b-2 border-b-gray-600'>
                    <Link to='/listdestinations'>Destinations</Link>
                    </li>
                    <li className='border-b-2 border-b-gray-600'>
                    <Link to='/plantrip'>Plan Travel</Link>
                    </li>
                    <li className='border-b-2 border-b-gray-600'>
                    <Link to='/myorders'>Orders</Link>
                    </li>
                    <li className='border-b-2 border-b-gray-600'>
                    <Link to='/mywallet'>Wallet</Link>
                    </li>
                </ul>
                  <button className='w-full mb-4 btn'>Search</button>
                  {user ?
                    <>
                        <button onClick={()=>navigate('/myprofile')} className='w-full mb-4 btn'>My Profile</button> 
                        <button onClick={()=>logoutHandler} className="w-full mb-4 btn"> Logout </button>
                    </> :
                    <button onClick={()=>navigate('/login')} className='w-full mb-4 btn'>Login</button>
                  }
                </div>
            )}
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
