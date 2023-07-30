import React, { useEffect, useState } from 'react'
import {VscDebugBreakpointLog} from "react-icons/vsc"
import { useNavigate } from 'react-router-dom';
import { getDestination, getDestinationData, getDestinationProperties } from '../../api/UserAPI';
import TokenExpireModal from './TokenExpireModal';
import ReactPaginate from 'react-paginate';

function ListDestinations() {
   
   const navigate = useNavigate()
   const [destinations,setDestinations] = useState([])
   const [errorCatch, setErrorCatch]= useState('')
   const [pageNumber, setPageNumber] = useState(1)
   const [totalPages, setTotalPages]= useState(1)

   const dataPerPage = 3
  
  const exploreSubmit = async(destination)=>{
    try {
      const {data} = await getDestinationProperties(destination)
      if(data){
        navigate('/showdestinationproperties',{state:data.combinedArray})
      }
    } catch (error) {
      if(error.response.data.message === 'jwt expired'){
        localStorage.removeItem('userInfo')
        setErrorCatch(error.response.data.message)
      }
    }
  }


  useEffect(()=>{
    const getDestinations = async()=>{
       try {
         const {data} = await getDestinationData(pageNumber,dataPerPage)
         if(data){
              setTotalPages(data.numberOfPages)
             setDestinations(data.destinationdata)
         }
       } catch (error) {
          if(error.response.data.message === 'jwt expired'){
            localStorage.removeItem('userInfo')
            setErrorCatch(error.response.data.message)
          }
       }
    }
    getDestinations()

  },[pageNumber])

  let handlePageClick = (e)=>{
    setPageNumber(e.selected+1)
  }

  return (
    <div className='flex justify-center'>
      <div className='container min-h-screen mt-5'>
          <div className='grid grid-cols-1 lg:grid-cols-3 lg:mx-32 md:grid-cols-2 lg:gap-10 md:gap-10 gap-7 justify-items-center mt-40 rounded-lg mb-20 mx-7'>
            {destinations.map((element)=>(
              <section className=" rounded-lg px-8 py-6 w-full shadow-lg md:mx-8 sm:mx-8 bg-gray-50 bg-opacity-80">
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
                <ReactPaginate
                  breakLabel="..."
                  nextLabel= "next >"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={dataPerPage}
                  pageCount={totalPages}
                  containerClassName={'paginationBttns'}
                  previousLinkClassName={'previousBttn'}
                  nextLinkClassName={'nextBttn'}
                  disabledClassName={'paginationDisabled'}
                  activeClassName={'paginationActive'}
                  previousLabel="< previous"
                  renderOnZeroPageCount={null}
                />
     </div>
     {errorCatch !== '' &&
        <TokenExpireModal message={errorCatch} />
    }
     </div>
  )
}

export default ListDestinations
