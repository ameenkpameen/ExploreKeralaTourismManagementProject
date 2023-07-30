import React, { useState } from 'react'
import { Link } from 'react-router-dom';


import {LuLayoutDashboard} from "react-icons/lu"
import {AiOutlineUsergroupDelete} from "react-icons/ai"
import {RiAdminLine} from "react-icons/ri"
import {BiAddToQueue} from "react-icons/bi"
import {MdOutlineLocalOffer} from "react-icons/md"
import {FaMapMarkerAlt} from "react-icons/fa"
import { BsListOl } from "react-icons/bs"
import {MdNotificationsNone} from "react-icons/md"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import { BsFillArrowRightCircleFill } from "react-icons/bs"

function SideBar({children}) {

    const menus = [
        
        {name: "DashBoard", link:"/superadmin", icon: LuLayoutDashboard},
        {name: "Property Notifications",link:"/superadmin/notifications", icon: MdNotificationsNone, submenuItems :["Cabs","Hotels","HomeStays"]},
        {name: "Users", link:"/superadmin/listusers", icon: AiOutlineUsergroupDelete},
        {name: "Owners", link:"/superadmin/listOwners", icon: RiAdminLine},
        {name: "List of Destinations", link:"/superadmin/listDestinations", icon: FaMapMarkerAlt},
        // {name: "Revenue", link:"/superadmin/showrevenue", icon: BiMoneyWithdraw},
        {name: "Add Destination", link:"/superadmin/adddestinations", icon: BiAddToQueue},
        // {name: "Add Banners", link:"/superadmin/addbanners", icon: CgCarousel},
        {name: "Banners List", link:"/superadmin/viewbanners", icon: BsListOl},
        {name: "Add Coupens", link:"/superadmin/addcoupens", icon: MdOutlineLocalOffer},
        {name: "List Coupens", link:"/superadmin/listcoupens", icon: MdOutlineLocalOffer}

    ]

    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("DashBoard")


  return (
    <section className='flex gap-6 '>
                      
                    <div className={`sidebar min-h-screen top-16 mt-16 bottom-0 lg:left-0 p-2 ${open ? 'w-72' : 'w-16'} duration-500 text-gray-100 overflow-y-auto text-center bg-black`}>
                    <div className='mt-4 flex flex-col gap-4 relative pt-5 '>
                           {open ?
                            <div className=' flex justify-end text-gray-50'>
                                     <BsFillArrowLeftCircleFill size={26} className='cursor-pointer' onClick={()=>setOpen(!open)}/>
                            </div>  :
                             <div className=' flex justify-end text-gray-50'>
                                    <BsFillArrowRightCircleFill size={26} className='cursor-pointer' onClick={()=>setOpen(!open)}/>
                             </div>
                           }
                        {menus?.map((menu, i) => (
                        <div key={i} className="relative">
                            <Link
                            className='group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md'
                            onClick={() =>setActive(menu?.name)}
                            to={menu.link}
                            >
                            <div>
                                {React.createElement(menu?.icon, { size: "20" })}
                            </div>
                                {active===menu?.name ?
                                    <h2
                                     className={`text-red-600 whitespace-pre  duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}
                                    >
                                        {menu?.name}
                                    </h2>   :
                                    <h2
                                    className={`whitespace-pre duration-500 ${!open && 'opacity-0 translate-x-28 overflow-hidden'}`}
                                    >
                                        {menu?.name}
                                    </h2>
                                }


                                <h2
                                    className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
                                >
                                    {menu?.name}
                                </h2>
                            </Link>
                            
                        </div>
                        ))}
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
