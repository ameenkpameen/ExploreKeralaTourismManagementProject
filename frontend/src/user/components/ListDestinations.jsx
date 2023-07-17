import React, { useEffect, useState } from 'react'
import axios from 'axios';
import baseURL from '../../config';
import {VscDebugBreakpointLog} from "react-icons/vsc"
import { useNavigate } from 'react-router-dom';

function ListDestinations() {
   
   const navigate = useNavigate()
   const [destinations,setDestinations] = useState([])

  

  const exploreSubmit = async(destination)=>{
      const {data} = await axios.get(`${baseURL}/destinationproperties/${destination}`)
      if(data){
        navigate('/showdestinationproperties',{state:data.combinedArray})
      }
  }


  useEffect(()=>{
    async function getDestinations(){
        const {data} = await axios.get(`${baseURL}/getdestinations`)
        if(data){
            setDestinations(data.destinationdata)
        }
    }
    getDestinations()
  },[])


  return (
    <div className='min-h-screen mt-5'>
          <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:gap-7 md:gap-7 gap-7 justify-items-center mt-20 rounded-lg mb-20'>
            {destinations.map((element)=>(
              <section className=" rounded-2xl px-8 py-6 w-full shadow-lg  bg-gray-50 bg-opacity-60">
                    {/* {error && <AdminError message={error}>{error}</AdminError>}
                    {loading && <AdminLoading />} */}
                   <div>
                    <div class="mt-6 w-fit mx-auto">
                        <img src={element.image} class="rounded-full w-28 " alt="profile" srcset="" />
                    </div>

                    <div class="h-1 w-full bg-black mt-8 rounded-full">
                        <div class="h-1 rounded-full w-full bg-green-700 "></div>
                    </div>
                
                    <div class="mt-2 ">
                        <h1 class="text-black font-bold text-lg tracking-wide">{element.destination}</h1>
                        <h1 class="text-black font-semibold text-base tracking-wide">{element.district}</h1>
                    </div>

                    <div class="h-1 w-full bg-black mt-2 rounded-full">
                        <div class="h-1 rounded-full w-full bg-green-700 "></div>
                    </div>

                    <p class="text-red-600 font-semibold text-base mt-2.5" >
                        Tourist Spots
                    </p>
                    {element.spots.map((elem)=>(
                      <div className='flex'>
                         <div className='mt-2'>
                            <VscDebugBreakpointLog size={18} color="blue" />
                         </div>
                         <p class="text-emerald-400 text-base font-semibold mt-1" >
                          <span className='text-black'>{elem}</span>
                         </p>
                      </div> 
                    ))}
                    </div>

                    <button onClick={()=>exploreSubmit(element.destination)} className="mt-4  w-full px-4 py-2 tracking-wide text-white text-lg font-normal transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
                          Explore {element.destination}
                    </button>
                    
                </section>

             ))}
                
        </div>
     </div>
  )
}

export default ListDestinations
