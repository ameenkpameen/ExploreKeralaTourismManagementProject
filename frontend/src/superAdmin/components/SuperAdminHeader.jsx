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

//   useEffect(()=> {
//     if(superadminInfo){
//         navigate('/superadmin')
//     }
//   },[superadminInfo])

  


// useEffect(()=>{
//     async function getNotifications(){
//         const {data} = await axios.get(`${baseURL}/superadmin/getpropertiesnotifications`)
//         if(data){
//             setCabdata(data.cabsData)
//             setHomestaydata(data.homestayData)
//             setHoteldata(data.hotelData)
//             const notcount = cabdata.length+homestaydata.length+hoteldata.length
//             setCount(notcount)
//         }
        
        
//     }
//     getNotifications()
// },[])

// useEffect(()=>{
//     async function getNotifications(){
//         const adminsdata = await axios.get(`${baseURL}/superadmin/getalladmins`)
//         const {data} = await axios.get(`${baseURL}/superadmin/getallusers`)
//         if(data ){
//             console.log(data);
//             setUserdata(data)
//             console.log(userData);
//         }

//         if(adminsdata){
//             setAdmindata(adminsdata.data.adminsdata)
//         }
//     }
//     getNotifications()
// },[])

  return (
    <div>
       
        <nav className="w-full bg-black shadow fixed  inset-x-0 z-50">
            
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                        <div className='flex items-center justify-between'>
                            {superadminInfo &&
                                <div className=' flex justify-end text-gray-50'>
                                    <HiMenuAlt3 size={26} className='cursor-pointer' onClick={()=>setOpen(!open)}/>
                                </div> 
                            }
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
                                <h1 className='font-bold'>Super Admin Panel</h1>
                            </li>
                            
                        </ul>
                        
                        
                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                        {superadmin && <Link
                            onClick={logoutHandler}
                            className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                        >
                            Logout
                        </Link>}
                        {superadmin && <Link
                            
                            className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                        >
                            PROFILE
                        </Link>}

                        {!superadmin && <Link
                            to="/superadmin/login"
                            className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                            >
                            Login
                           </Link>}
                </div>
                    
                    </div>
                    
                </div>
                <div className="hidden space-x-2 md:inline-block">
                
                  { superadmin &&
                    <Link
                    onClick={logoutHandler}
                    className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                   >
                    Logout
                   </Link>
                  }
                    
                    
                    {!superadmin && <Link
                        to="/superadmin/login"
                        className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                    >
                        Sign in
                    </Link>}
                    
                </div>

                
                
            </div>
        </nav>
        
    </div>
  )
}

export default SuperAdminHeader
