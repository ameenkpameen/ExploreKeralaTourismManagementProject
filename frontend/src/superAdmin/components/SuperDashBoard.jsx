import React, { useEffect, useState } from 'react'
import { getNumberDatas } from '../../api/SuperadminAPI'
import {BsBuildingsFill } from "react-icons/bs"
import { FaMapMarkerAlt } from "react-icons/fa"
import { AiFillCar } from 'react-icons/ai'
import { HiHomeModern } from "react-icons/hi2"
import { FaHotel } from "react-icons/fa"
import { FaUserFriends } from "react-icons/fa"
import { RiAdminFill } from "react-icons/ri"
import { RiCouponFill } from "react-icons/ri"
import { Chart } from 'primereact/chart';

function SuperDashBoard() {
    const [totalProperties, setTotalPropertis] = useState(0)
    const [cabCount, setCabCount] = useState(0)
    const [homestayCount, setHomestayCount] = useState(0)
    const [hotelCount, setHotelCount] = useState(0)
    const [propertyCount, setPropertyCount] = useState(0)
    const [destCount, setDestCount] = useState(0)
    const [coupenCount, setCoupenCount] = useState(0)
    const [ownerCount, setOwnerCount] = useState(0)
    const [userCount, setUserCount] = useState(0)
    const [owners, setOwners] = useState([])
    const [weekDays, setWeekDays]= useState([])
    const [weekCabs, setWeekCabs] =useState([])
    const [weekHomeStays, setWeekHomeStays] =useState([])
    const [weekHotels, setWeekHotels] =useState([])
    const [isDataFetched, setIsDataFetched] = useState(false);

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});


    useEffect(()=>{
        const getDataNumbers = async()=>{
            const {data} = await getNumberDatas()
            if(data){
                setCabCount(data.Cab)
                setHomestayCount(data.HomeStay)
                setHotelCount(data.Hotel)
                setPropertyCount(data.Property)
                setDestCount(data.Destinations)
                setCoupenCount(data.Coupens)
                setOwnerCount(data.Owners)
                setUserCount(data.Users)
                setOwners(data.FullOwners)
                setWeekDays(data.Days)
                setWeekCabs(data.cabsOrder)
                setWeekHomeStays(data.homestayOrder)
                setWeekHotels(data.hotelOrder)
                setIsDataFetched(true)

            }
        }
        getDataNumbers()
        const data = {
            labels: weekDays,
            datasets: [
                {
                    label: 'Cab Orders',
                    backgroundColor: documentStyle.getPropertyValue('--rose-600'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: weekCabs
                },
                {
                    label: 'HomeStay Orders',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: weekHomeStays
                },
                {
                    label: 'Hotel Orders',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: weekHotels
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    
        setChartData(data);
        setChartOptions(options);
    },[isDataFetched])

    


    const boxes = [
        {
            Name: "Total Propertis",
            Value: propertyCount,
            icon : <BsBuildingsFill className='m-auto mt-3' color='white' size={25} />
        },
        {
            Name: "Total Destinations",
            Value: destCount,
            icon : <FaMapMarkerAlt className='m-auto mt-3' color='white' size={25} />
        },
        {
            Name: "Total Cabs",
            Value: cabCount,
            icon : <AiFillCar className='m-auto mt-3' color='white' size={25} />
        },
        {
            Name: "Total HomeStays",
            Value: homestayCount,
            icon :  <HiHomeModern className='m-auto mt-3' color='white' size={25} />
        },
        {
            Name: "Total Hotels",
            Value: cabCount,
            icon :  <FaHotel className='m-auto mt-3' color='white' size={25} />
        },
        {
            Name: "Active Users",
            Value: userCount,
            icon :  <FaUserFriends className='m-auto mt-3' color='white' size={25} />
        },
        {
            Name: "Active Owners",
            Value: ownerCount,
            icon :  <RiAdminFill className='m-auto mt-3' color='white' size={25} />
        },
        {
            Name: "Active Coupens",
            Value: coupenCount,
            icon :  <RiCouponFill className='m-auto mt-3' color='white' size={25} />
        }
    ]


    
  return (
    <div className='flex justify-center'>
        <div className='container mx-40 lg:px-5 min-h-screen mt-36 mb-40'>
            <div class="flex flex-wrap -mx-3">
                  {boxes.map((element)=>(
                    <div class="w-full mt-5 max-w-full px-1 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">{element.Name}</p>
                                <h5 class="mb-0 font-bold">
                                    {element.Value}
                                    
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                    {element.icon}
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                ))}
                    
            </div>

            <div class="flex flex-wrap -mx-5 mt-5">
                <div class="flex-none w-full max-w-full px-3">
                    <div class="relative flex flex-col min-w-0 mb-6 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-lg bg-clip-border">
                    <div class="p-6 pb-0 mb-0 bg-white border-b-0 border-b-solid rounded-lg border-b-transparent">
                        <h6>Owners table</h6>
                    </div>
                    <div class="flex-auto px-0 pt-0 pb-2">
                        <div class="p-0 overflow-x-auto">
                        <table class="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
                            <thead class="align-bottom">
                            <tr>
                                <th class="px-6 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Owner</th>
                                <th class="px-6 py-3 pl-2 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Function</th>
                                <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Status</th>
                                <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-400 opacity-70">Joined</th>
                                <th class="px-6 py-3 font-bold text-center uppercase align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-400 opacity-70">Phone Number</th>
                            </tr>
                            </thead>
                            <tbody>
                            {owners.map((element,index)=>(
                                <tr key={index}>
                                    <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <div class="flex px-2 py-1">
                                        <div>
                                        <img src={element.image} class="inline-flex items-center justify-center mr-4 text-sm text-white transition-all duration-200 ease-soft-in-out h-9 w-9 rounded-xl" alt="user1" />
                                        </div>
                                        <div class="flex flex-col justify-center">
                                        <h6 class="mb-0 text-sm leading-normal">{element.firstname +" "+ element.lastname}</h6>
                                        <p class="mb-0 text-xs leading-tight text-slate-400">{element.email}</p>
                                        </div>
                                    </div>
                                    </td>
                                    <td class="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <p class="mb-0 text-xs font-semibold leading-tight">Owner</p>
                                    <p class="mb-0 text-xs leading-tight text-slate-400">Property holder</p>
                                    </td>
                                    <td class="p-2 text-sm leading-normal text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                       {element.status === 'active' ?
                                            <span class="bg-gradient-to-tl p-1 rounded-md from-green-600 to-lime-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">{element.status}</span> :
                                            <span class="bg-gradient-to-tl p-1 rounded-md from-red-600 to-red-400 px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">{element.status}</span>
                                       }
                                    </td>
                                    <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <span class="text-xs font-semibold leading-tight text-slate-400">{element.createdAt.slice(0,10)}</span>
                                    </td>
                                    <td class="p-2 text-center align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                       {element.phonenumber}
                                    </td>
                                </tr>
                            ))}
                            
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div class="flex flex-wrap -mx-3">
                   <div class="w-full max-w-full px-1 sm:w-full sm:flex-none xl:w-full">
                       <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl max-h-full rounded-lg bg-clip-border px-20 py-5">
                            <h1 className='text-center text-red-500 font-bold text-xl mt-4'>Orders (Last Week)</h1>
                            <div className="card">
                                    <Chart type="bar" data={chartData} options={chartOptions} />
                            </div> 
                       </div>
                   </div>
                   {/* <div class="w-full mt-5 max-w-full px-1 sm:w-1/2 sm:flex-none xl:w-1/2">
                       <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                            <h1 className='text-center text-red-500 font-bold text-xl mt-4'>Orders (Statuses)</h1>
                            <div className="card visible flex justify-content-center mx-auto py-5">
                                <Chart type="pie" data={chart2Data} options={chartOptions} className="w-full md:w-30rem" />
                            </div>
                       </div>
                   </div> */}
                </div>
                
        </div>
    </div>
  )
}

export default SuperDashBoard
