import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { getChartDataFromBackend, getOrderStatusDashboard, getTypeDataFromBackend, getTypeNumberFromBackend, getWeekWiseOrders } from '../../api/OwnerAPI';
import {BsCartCheckFill} from "react-icons/bs"
import {BsBuildingsFill } from "react-icons/bs"
import { AiFillCar } from 'react-icons/ai'
import { MdNotListedLocation } from "react-icons/md"
import { MdPendingActions } from "react-icons/md"
import { FaHotel } from "react-icons/fa"
import { HiHomeModern } from "react-icons/hi2"
import { IoMdToday } from "react-icons/io"
import OwnerTokenExpire from './OwnerTokenExpire';
import { useNavigate } from 'react-router-dom';

function OwnerDashBoard() {
    const navigate = useNavigate()
    const [chartData, setChartData] = useState({});
    const [chart2Data, setChart2Data] = useState({});
    const [chart3Data, setChart3Data] = useState({});
    const [chart3Options, setChart3Options] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [chart2Options, setChart2Options] = useState({});
    const [labelNames, setLabelNames] = useState([]);
    const [labelValues, setLabelValues] = useState([]);
    const [labelNames2, setLabelNames2] = useState([]);
    const [labelValues2, setLabelValues2] = useState([]);
    const [labelNumberValues, setLabelNumberValues] = useState([]);
    const [todayOrders,setTodayOrders] = useState(0)
    const [totalOrders,setTotalOrders] = useState(0)
    const [pendingOrders,setPendingOrders] = useState(0)
    const [unlistedProperties,setUnlistedProperties] = useState(0)
    const [cabCount,setCabCount] = useState(0)
    const [homestayCount,setHomestayCount] = useState(0)
    const [hotelCount,setHotelCount] = useState(0)
    const [myPropertis,setMyPropertis] = useState(0)
    const [errorCatch, setErrorCatch] = useState('')
    const [isDataFetched, setIsDataFetched] = useState(false);
    const [weekDays, setWeekDays]= useState([])
    const [weekCabs, setWeekCabs] =useState([])
    const [weekHomeStays, setWeekHomeStays] =useState([])
    const [weekHotels, setWeekHotels] =useState([])

    

    if(localStorage.ownerInfo !== undefined){
        var owner = JSON.parse(localStorage.ownerInfo);
      }

    const id = owner ? owner._id : navigate('/owner')

    useEffect(()=>{
        const getTypeDatas = async()=>{
            try {
                if(id !== undefined){
                    const {data} = await getTypeDataFromBackend(id && id)
                    if(data){
                        setCabCount(data.cabCount)
                        setHomestayCount(data.homestayCount)
                        setHotelCount(data.hotelCount)
                        setTodayOrders(data.todayOrders)
                        setMyPropertis(data.myPropertis)
                        setPendingOrders(data.pendingOrders)
                        setUnlistedProperties(data.unlistedProperties)
                        setTotalOrders(data.totalOrders)
                    }
                }
            } catch (error) {
                if(error?.response?.data?.message === 'jwt expired'){
                    localStorage.removeItem('ownerInfo')
                    setErrorCatch(error.response.data.message)
                }else{
                    console.log(error);
                }
            }
        }
        if(id !== undefined){
            getTypeDatas()
        }
    },[])

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        const getTypeNumbers = async()=>{
            try {
                if(id !== undefined){
                    const {data} = await getTypeNumberFromBackend(id && id)
                    if(data){
                        setLabelNumberValues(data.values)
                    }
                }
            } catch (error) {
                if(error?.response?.data?.message === 'jwt expired'){
                    localStorage.removeItem('ownerInfo')
                    setErrorCatch(error.response.data.message)
                }else{
                    console.log(error);
                }
            }
        }
        if(id !== undefined){
            getTypeNumbers()
        }

        const getChartData = async()=>{
            try {
                setTimeout(async() => {
                    if(id !== undefined){
                        const {data} = await getChartDataFromBackend(id && id)
                        if(data){
                            setLabelNames(data.names)
                            setLabelValues(data.values)
                            setIsDataFetched(true)
                        }
                    }
                }, 2000);
            } catch (error) {
                console.log(error.response.data.message);
                if(error?.response?.data?.message === 'jwt expired'){
                    localStorage.removeItem('ownerInfo')
                    setErrorCatch(error.response.data.message)
                }else if(error?.response?.data?.message === 'Owner Token Not Found'){
                    setErrorCatch(error.response.data.message)
                }
                else{
                    console.log(error);
                }
            }
        }

             if(id !== undefined){
                 getChartData()
             }

        const getWeeklyOrders = async()=>{
            try {
                    const {data} = await getWeekWiseOrders(id && id)
                    if(data){
                        setWeekDays(data.Days)
                        setWeekCabs(data.Cabs)
                        setWeekHomeStays(data.HomeStays)
                        setWeekHotels(data.Hotels)
                    }
            } catch (error) {
                if(error?.response?.data?.message === 'jwt expired'){
                    localStorage.removeItem('ownerInfo')
                    setErrorCatch(error.response.data.message)
                }else{
                    console.log(error);
                }
            }
        }

        if(id !== undefined){
            getWeeklyOrders()
        }
        
        const getStatusOrders = async()=>{
            try {
                    const {data} = await getOrderStatusDashboard(id && id)
                    if(data){
                        setLabelNames2(data.names)
                        setLabelValues2(data.values)
                        if(labelNames2.length >0 && labelValues2.length >0){
                            setIsDataFetched(true)
                        }
                    }
                
            } catch (error) {
                if(error?.response?.data?.message === 'jwt expired'){
                    localStorage.removeItem('ownerInfo')
                    setErrorCatch(error.response.data.message)
                }else{
                    console.log(error);
                }
            }
        }
        
        if(id !== undefined){
            getStatusOrders()
        }

        const datas = {
            labels: labelNames,
            datasets: [
                {
                    data: labelValues,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'), 
                        documentStyle.getPropertyValue('--yellow-500'), 
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'), 
                        documentStyle.getPropertyValue('--yellow-400'), 
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        }

        const datas1 = {
            labels: labelNames2,
            datasets: [
                {
                    data: labelValues2,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--rose-600'), 
                        documentStyle.getPropertyValue('--gray-400'), 
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--blue-400')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--rose-500'), 
                        documentStyle.getPropertyValue('--gray-200'), 
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--blue-600')
                    ]
                }
            ]
        }

        
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };

        const data3 = {
            labels: weekDays,
            datasets: [
                {
                    type: 'bar',
                    label: 'Cabs',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    data: weekCabs
                },
                {
                    type: 'bar',
                    label: 'Homestays',
                    backgroundColor: documentStyle.getPropertyValue('--green-500'),
                    data: weekHomeStays
                },
                {
                    type: 'bar',
                    label: 'Hotels',
                    backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                    data: weekHotels
                }
            ]
        };

        const options2 = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                tooltips: {
                    mode: 'index',
                    intersect: false
                },
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        
        setChart3Options(options2)
        setChart3Data(data3)
        setChart2Data(datas1)
        setChartData(datas);
        setChartOptions(options);
    }, [isDataFetched]);
  return (
    <div className='flex justify-center'>
        <div className='container mx-40 lg:px-5 min-h-screen mt-36 mb-40'>
                <div class="flex flex-wrap -mx-3">
                    <div class="w-full mt-5 max-w-full px-1 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">Today's Orders</p>
                                <h5 class="mb-0 font-bold">
                                    {todayOrders}
                                    
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                    <IoMdToday className='m-auto mt-3' color='white' size={25} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                
                    <div class="w-full mt-5 max-w-full px-1 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">Total Orders</p>
                                <h5 class="mb-0 font-bold">
                                    {totalOrders}
                                    {/* <span class="text-sm leading-normal font-weight-bolder text-lime-500">+3%</span> */}
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                <BsCartCheckFill className='m-auto mt-3' color='white' size={25} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="w-full mt-5 max-w-full px-1 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">Pending Orders</p>
                                <h5 class="mb-0 font-bold">
                                    {pendingOrders}
                                    {/* <span class="text-sm leading-normal font-weight-bolder text-lime-500">+3%</span> */}
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                <MdPendingActions className='m-auto mt-3' color='white' size={25} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                
                    <div class="w-full mt-5 max-w-full px-1 mb-6 sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">My Properties</p>
                                <h5 class="mb-0 font-bold">
                                    {myPropertis}
                                    {/* <span class="text-sm leading-normal text-red-600 font-weight-bolder">-2%</span> */}
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                <BsBuildingsFill className='m-auto mt-3' color='white' size={25} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    
                    <div class="w-full mt-5 max-w-full px-1 sm:w-1/2 sm:flex-none xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">Unlisted Properties</p>
                                <h5 class="mb-0 font-bold">
                                    {unlistedProperties}
                                    {/* <span class="text-sm leading-normal font-weight-bolder text-lime-500">+5%</span> */}
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                <MdNotListedLocation className='m-auto mt-3' color='white' size={25} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="w-full mt-5 max-w-full px-1 sm:w-1/2 sm:flex-none xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">My Cabs</p>
                                <h5 class="mb-0 font-bold">
                                    {cabCount}
                                    {/* <span class="text-sm leading-normal font-weight-bolder text-lime-500">+5%</span> */}
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                <AiFillCar className='m-auto mt-3' color='white' size={25} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="w-full mt-5 max-w-full px-1 sm:w-1/2 sm:flex-none xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">My HomeStays</p>
                                <h5 class="mb-0 font-bold">
                                    {homestayCount}
                                    {/* <span class="text-sm leading-normal font-weight-bolder text-lime-500">+5%</span> */}
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                <HiHomeModern className='m-auto mt-3' color='white' size={25} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div class="w-full mt-5 max-w-full px-1 sm:w-1/2 sm:flex-none xl:w-1/4">
                        <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                        <div class="flex-auto p-4">
                            <div class="flex flex-row -mx-3">
                            <div class="flex-none w-2/3 max-w-full px-3">
                                <div>
                                <p class="mb-0 font-sans text-sm font-semibold leading-normal">My Hotels</p>
                                <h5 class="mb-0 font-bold">
                                    {hotelCount}
                                    {/* <span class="text-sm leading-normal font-weight-bolder text-lime-500">+5%</span> */}
                                </h5>
                                </div>
                            </div>
                            <div class="px-3 text-right basis-1/3">
                                <div class="inline-block w-12 h-12 text-center rounded-lg bg-gradient-to-tl from-purple-700 to-pink-500">
                                <FaHotel className='m-auto mt-3' color='white' size={25} />
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>

                    
                </div>

                <div class="flex flex-wrap -mx-3">
                   <div class="w-full mt-5 max-w-full px-1 sm:w-1/2 sm:flex-none xl:w-1/2">
                       <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                            <h1 className='text-center text-red-500 font-bold text-xl mt-4'>Orders (PropertyWise)</h1>
                                <div className="card flex justify-content-center mx-auto py-5">
                                    <Chart type="pie" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                                </div> 
                       </div>
                   </div>
                   <div class="w-full mt-5 max-w-full px-1 sm:w-1/2 sm:flex-none xl:w-1/2">
                       <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl rounded-lg bg-clip-border">
                            <h1 className='text-center text-red-500 font-bold text-xl mt-4'>Orders (Statuses)</h1>
                            <div className="card visible flex justify-content-center mx-auto py-5">
                                <Chart type="pie" data={chart2Data} options={chartOptions} className="w-full md:w-30rem" />
                            </div>
                       </div>
                   </div>
                </div>

                <div class="flex flex-wrap -mx-3">
                   <div class="w-full mt-5 max-w-full px-1 sm:w-full sm:flex-none xl:w-full">
                       <div class="relative flex flex-col min-w-0 break-words bg-white shadow-soft-xl max-h-full rounded-lg bg-clip-border">
                            <h1 className='text-center text-red-500 font-bold text-xl mt-4'>Orders (Last Week)</h1>
                            <div className="card visible py-10 xl:px-52 sm:px-5">
                                <Chart type="bar" data={chart3Data} options={chart3Options} />
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
    {errorCatch !== '' &&
      <OwnerTokenExpire message={errorCatch}/>
    }
    </div>
  )
}

export default OwnerDashBoard
