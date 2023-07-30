import React, { useState } from 'react'
import { Link } from 'react-router-dom';

import {LuLayoutDashboard} from "react-icons/lu"
import {MdAddHomeWork} from "react-icons/md"
import {MdOutlinePropaneTank} from "react-icons/md"
import {AiFillNotification} from "react-icons/ai"
import { BiChat } from "react-icons/bi"
import {ImProfile} from "react-icons/im"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import { BsFillArrowRightCircleFill } from "react-icons/bs"

function SideBar({children}) {

    const menus = [
        {name: "DashBoard", link:"/owner", icon: LuLayoutDashboard},
        {name: "My Profile", link:"/owner/profile", icon: ImProfile},
        {name: "Add Properties", link:"/owner/addproperties", icon: MdAddHomeWork},
        {name: "My Properties", link:"/owner/myproperties", icon: MdOutlinePropaneTank},
        {name: "Orders", link:"/owner/mypropertyorders", icon: MdOutlinePropaneTank},
        {name: "Add Banners", link:"/owner/addbanners", icon: AiFillNotification},
        {name: "Chats", link:"/owner/mychats", icon: BiChat},
    ]

    const [open, setOpen] = useState(false);
  return (
    <section className='flex gap-6 '>

       
                <div className={`sidebar min-h-screen top-16 mt-16  bottom-0 lg:left-0 p-2 ${open ? 'w-64' :'w-16'}   duration-500 text-gray-100 overflow-y-auto text-center bg-black`}>
                    
                    <div className='mt-4 flex flex-col gap-4 relative pt-5'>
                           {open ?
                            <div className=' flex justify-end text-gray-50'>
                                     <BsFillArrowLeftCircleFill size={26} className='cursor-pointer' onClick={()=>setOpen(!open)}/>
                            </div>  :
                             <div className=' flex justify-end text-gray-50'>
                                    <BsFillArrowRightCircleFill size={26} className='cursor-pointer' onClick={()=>setOpen(!open)}/>
                             </div>
                           }
                        {
                        menus?.map((menu,i)=>(
                            <Link  key={i} className='group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md ' to={menu.link}>
                            <div>
                                {React.createElement(menu?.icon,{size: "20"})}
                            </div>
                            
                            
                              
                             <h2 
                                style={{transitionDelay: `${i+3}00ms`}} 
                                className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}>{menu?.name}
                             
                             </h2> 
                   
                            
                             <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit `}>
                            {menu?.name}
                            </h2>
                        </Link>
                        ))   
                            }
                    </div>
                </div>

                <div className='w-full m-3 text-xl  flex justify-center items-center font-bold pt-16 '>
                        <div className='flex flex-col items-center'>
                          {children}
                        </div>
                   </div>
                
                

            </section>
  )
}

export default SideBar
