import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminLogout } from '../../actions/adminActions';
import { Navigate } from "react-router-dom"
import { superadminLogout } from '../../actions/superAdminActions';

import SuperAdminSidebar from '../components/SuperAdminSidebar'
import DestinationForm from '../components/DestinationForm'
import ListDestination from '../components/ListDestination'

import {HiMenuAlt3} from "react-icons/hi"
import {LuLayoutDashboard} from "react-icons/lu"
import {AiOutlineUsergroupDelete} from "react-icons/ai"
import {RiAdminLine} from "react-icons/ri"
import {BiMoneyWithdraw} from "react-icons/bi"
import {BiAddToQueue} from "react-icons/bi"
import {FaMapMarkerAlt} from "react-icons/fa"
import {ImProfile} from "react-icons/im"
import {MdNotificationsNone} from "react-icons/md"
import Notifications from './Notifications';
import axios from 'axios';
import baseURL from '../../config';
import ProperNotifications from './ProperNotifications';
import UsersList from './UsersList';
// import ListDestinations from '../../components/ListDestinations';
import ListAdmins from './ListAdmins';

function SuperAdminHeader() {

    const [navbar, setNavbar] = useState(false)
    // const [cabdata,setCabdata] = useState([]);
    // const [homestaydata,setHomestaydata] = useState([]);
    // const [hoteldata,setHoteldata] = useState([]);
    // const [count, setCount] = useState(0)
    // const [submenuOpen, setSubmenuOpen] = useState(false)
    // const [userData, setUserdata] = useState([])
    // const [adminData, setAdmindata] = useState([])

    // const menus = [
        
    //     {name: "DashBoard", link:"/", icon: LuLayoutDashboard},
    //     {name: "My Profile", link:"/", icon: ImProfile},
    //     {name: "Property Notifications",count:count, link:"/", icon: MdNotificationsNone, submenuItems :["Cabs","Hotels","HomeStays"]},
    //     {name: "Users", link:"/", icon: AiOutlineUsergroupDelete},
    //     {name: "Admins", link:"/", icon: RiAdminLine},
    //     {name: "List of Destinations", link:"/", icon: FaMapMarkerAlt},
    //     {name: "Revenue", link:"/", icon: BiMoneyWithdraw},
    //     {name: "Add Destination", link:"/", icon: BiAddToQueue}
    // ]

    const [open, setOpen] = useState(true);
    const [active, setActive] = useState("DashBoard")



   const navigate = useNavigate()
    if(localStorage.superadminInfo !== undefined){
        var superadmin = JSON.parse(localStorage.superadminInfo);
      }
  
  
  const dispatch = useDispatch();
  const superadminsLogin = useSelector(state => state.superadminLogin)
  const {superadminInfo} = superadminsLogin

  const logoutHandler = ()=>{
    dispatch(superadminLogout())
    navigate('/superadmin/login')
  }



const [navIsShown, setnavIsShown] = useState(false);
  const toggleNavIsShown = () => {
    setnavIsShown((navIsShown) => !navIsShown);
  };

  const listItemStyle = {
    borderBottom: '2px solid #666', // border-b-2 border-b-gray-600
    position: 'relative', // To position the dropdown content
    display: 'inline-block', // So it takes the width of the content
  };
  
  const dropdownContentStyle = {
    display: 'none', // Initially hide the dropdown content
    position: 'absolute',
    backgroundColor: '#ffffff',
    minWidth: '160px',
    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
    zIndex: 1,
  };
  
  const listItemLinkStyle = {
    textDecoration: 'none',
    display: 'block',
    padding: '5px 10px',
  };

  


  const handleMouseEnter = () => {
    document.getElementById('myDropdown').style.display = 'block';
  };

  const handleMouseLeave = () => {
    document.getElementById('myDropdown').style.display = 'none';
  };

  return (
    <div>
       
        
        <nav className='flex justify-between items-center h-20 px-4 absolute top-0 left-0 z-10 w-full text-white bg-[#1e1b4b]'>
                <h3 className="rounded-lg w-48 font-LobsterTwo text-3xl text-center text-white">
                    <span className='font-Squada font-bold text-red-400'>E</span>xplore<span className='font-Squada font-bold text-red-400'>K</span>erala
                </h3>
            <ul className='hidden md:flex gap-6'>
                <li>
                  <Link to='/superadmin'>Dashboard</Link>
                </li>
                <li>
                <Link to='/superadmin/notifications'>New Properties</Link>
                </li>
                <li>
                <Link to='/superadmin/listDestinations'>Destinations</Link>
                </li>
                <li
                    style={listItemStyle}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    >
                    <span>Other options</span>
                    <div id="myDropdown" className='rounded-md' style={dropdownContentStyle}>
                        <Link to='/superadmin/listusers' className='text-black font-medium hover:bg-blue-950 hover:text-white' style={listItemLinkStyle}>Users List</Link>
                        <Link to='/superadmin/listOwners' className='text-black font-medium hover:bg-blue-950 hover:text-white' style={listItemLinkStyle}>Owners List</Link>
                        <Link to='/superadmin/viewbanners' className='text-black font-medium hover:bg-blue-950 hover:text-white' style={listItemLinkStyle}>Banners List</Link>
                        <Link to='/superadmin/listcoupens' className='text-black font-medium hover:bg-blue-950 hover:text-white' style={listItemLinkStyle}>Coupens List</Link>
                        <Link to='/superadmin/addcoupens' className='text-black font-medium hover:bg-blue-950 hover:text-white' style={listItemLinkStyle}>Add Coupens</Link>
                        <Link to='/superadmin/adddestinations' className='text-black font-medium hover:bg-blue-950 hover:text-white' style={listItemLinkStyle}>Add Destination</Link>
                        {/* Add more links for additional dropdown options if needed */}
                    </div>
                    </li>
            </ul>
                 <div className='hidden md:flex'>
                
                
                <div>
                {!superadmin && 
                     
                           <Link
                        to="/superadmin/login"
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
                {superadmin && 
                        <div className='flex flex-row'>
                        <Link
                            
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
                <div className='md:hidden absolute z-10 top-0 left-0 w-full bg-gray-100/90 text-black px-4 pt-6 '>
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
                            <Link to='/superadmin'>Dashboard</Link>
                            </li>
                            <li className='border-b-2 border-b-gray-600'>
                            <Link to='/superadmin/notifications'>New Properties</Link>
                            </li>
                            <li className='border-b-2 border-b-gray-600'>
                            <Link to='/superadmin/listDestinations'>Destinations</Link>
                            </li>
                            <li className='border-b-2 border-b-gray-600'>
                            <Link to='/superadmin/listusers' >Users List</Link>
                            </li>
                            <li className='border-b-2 border-b-gray-600'>
                            <Link to='/superadmin/listOwners' >Owners List</Link>
                            </li>
                            <li className='border-b-2 border-b-gray-600'>
                            <Link to='/superadmin/viewbanners'>Banners List</Link>
                            </li>
                            <li className='border-b-2 border-b-gray-600'>
                            <Link to='/superadmin/listcoupens'>Coupens List</Link>
                            </li>
                            <li className='border-b-2 border-b-gray-600'>
                            <Link to='/superadmin/addcoupens'>Add Coupens</Link>
                            </li>
                            <li className='border-b-2 border-b-gray-600'>
                            <Link to='/superadmin/adddestinations'>Add Destination</Link>
                            </li>
                            
                        </ul>
                    <button className='w-full mb-1 btn'>Search</button>
                    {superadmin ?
                        <>
                            
                            <button onClick={()=>logoutHandler} className="w-full mb-4 btn"> Logout </button>
                        </> :
                        <button onClick={()=>navigate('/superadmin/login')} className='w-full mb-0 btn'>Login</button>
                    }
                </div>
            )}
        </nav>
        
    </div>
  )
}

export default SuperAdminHeader
