import React, { useState } from 'react'
import {ImProfile} from "react-icons/im"
import {LuLayoutDashboard} from "react-icons/lu"
import {FaMapMarkerAlt} from "react-icons/fa"
import {FaPlaneDeparture} from "react-icons/fa"
import { Link } from 'react-router-dom'
import {TfiWallet} from "react-icons/tfi"


function Sidebar({children}) {
    const [active, setActive] = useState("Add Destination")
    const [open, setOpen] = useState(true);

    const menus = [
        
        {name: "DashBoard", link:"/", icon: LuLayoutDashboard},
        {name: "My Profile", link:"/myprofile", icon: ImProfile},
        {name: "Plan a trip", link:"/plantrip", icon: FaPlaneDeparture},
        {name: "List of Destinations", link:"/listdestinations", icon: FaMapMarkerAlt},
        {name: "My Orders", link:"/myorders", icon: LuLayoutDashboard},
        {name: "My Wallet", link:"/mywallet", icon: TfiWallet},
    ]
  return (
    <section className='flex gap-6 '>

              
                <div className={`sidebar min-h-screen top-16 mt-16  bottom-0 lg:left-0 p-2 ${open ? 'w-72' :'hidden'} sm:w-1/6  duration-500 text-gray-100 overflow-y-auto text-center bg-black`}>
                                
                    <div className='mt-4 flex flex-col gap-4 relative pt-5'>
                    
                        {
                        menus?.map((menu,i)=>(
                            <Link  key={i} className='group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ' 
                            to={menu.link}
                            >
                            <div>
                                {React.createElement(menu?.icon,{size: "20"})}
                            </div>
                            
                            <h2 style={{transitionDelay: `${i+3}00ms`}} className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}</h2>
                            <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
                            {menu?.name}
                            </h2>
                        </Link>
                        ))   
                            }
                    </div>
                </div>

                 <div className='w-full m-3 text-xl  flex justify-center items-center font-bold pt-16 '>
                        <div open={open} onClose={()=>setOpen(false)} className='flex flex-col items-center'>
                          {children}
                        </div>
                   </div>
                
                

            </section>
  )
}

export default Sidebar
