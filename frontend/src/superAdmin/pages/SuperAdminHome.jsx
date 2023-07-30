import React, { useEffect, useState } from 'react'
import SuperAdminHeader from '../components/SuperAdminHeader'
import SuperAdminFooter from '../components/SuperAdminFooter'
import SuperAdminSidebar from '../components/SuperAdminSidebar'
import DestinationForm from '../components/DestinationForm'
import ListDestination from '../components/ListDestination'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'

import {HiMenuAlt3} from "react-icons/hi"
import {LuLayoutDashboard} from "react-icons/lu"
import {AiOutlineUsergroupDelete} from "react-icons/ai"
import {RiAdminLine} from "react-icons/ri"
import {BiMoneyWithdraw} from "react-icons/bi"
import {BiAddToQueue} from "react-icons/bi"
import {FaMapMarkerAlt} from "react-icons/fa"
import {ImProfile} from "react-icons/im"
import SideBar from '../components/SideBar'
import SuperDashBoard from '../components/SuperDashBoard'


function SuperAdminHome() {
      const navigate = useNavigate();
      if(localStorage.superadminInfo !== undefined){
        var superadmin = JSON.parse(localStorage.superadminInfo);
      }
      
      const superadminsLogin = useSelector(state => state.superadminLogin)
      const {superadminInfo} = superadminsLogin

      useEffect(()=> {
        if(superadminInfo){
            navigate('/superadmin')
        }
      },[superadminInfo])

    // const menus = [
        
    //     {name: "DashBoard", link:"/", icon: LuLayoutDashboard},
    //     {name: "My Profile", link:"/", icon: ImProfile},
    //     {name: "Users", link:"/", icon: AiOutlineUsergroupDelete},
    //     {name: "Admins", link:"/", icon: RiAdminLine},
    //     {name: "List of Destinations", link:"/", icon: FaMapMarkerAlt},
    //     {name: "Revenue", link:"/", icon: BiMoneyWithdraw},
    //     {name: "Add Destination", link:"/", icon: BiAddToQueue}
    // ]

    // const [open, setOpen] = useState(false);
    // const [active, setActive] = useState("Dashboard")

    
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'blur(10px)' }}>
      <SuperAdminHeader />
          <SuperDashBoard />
      <SuperAdminFooter />
    </div>
  )
}

export default SuperAdminHome
