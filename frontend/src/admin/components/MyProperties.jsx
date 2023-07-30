import React, { useEffect, useState } from 'react'
import FeaturesModal from "./FeaturesModal"
import EditProperties from './EditProperties'
import {AiTwotoneEdit} from "react-icons/ai"
import {MdDelete} from "react-icons/md"
import { Link } from 'react-router-dom'
import OwnerModal from './OwnerModal'
import {MdDeleteOutline} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import { deleteCab, deleteHomeStay, deleteHotel, getOwnerProperties } from '../../api/OwnerAPI'
import OwnerTokenExpire from './OwnerTokenExpire'

function MyProperties() {
     
    const navigate = useNavigate();
    const [cabsdata, setCabsdata] = useState([])
    const [homestaydata, setHomestaydata] = useState([])
    const [hoteldata, setHoteldata] = useState([])
    const [active, setActive] = useState('')
    const [currentData, setCurrentData] = useState([])
    const [featuresModalOpen, setFeaturesModalOpen] = useState(false)
    const [featuresModalData, setFeaturesModalData] = useState('')
    const [openEdit, setOpenEdit] = useState(false)
    const [editData, setEditData] = useState('')
    const [successDelete, setSuccessDelete] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState('')
    const [deleteActive, setDeleteActive] = useState('')
    const [errorCatch, setErrorCatch] = useState('')

    
    const ownerInfo = JSON.parse(localStorage.ownerInfo);
    
    const id = ownerInfo._id
    useEffect(()=>{
      try {
        async function getProperties(){
            const {data} = await getOwnerProperties(id)
            if(data){
                setCabsdata(data.cabsdata)
                setHomestaydata(data.homestaydata)
                setHoteldata(data.hoteldata)
            }
        }
        getProperties()
      } catch (error) {
        if(error?.response?.data?.message === 'jwt expired'){
          localStorage.removeItem('ownerInfo')
          setErrorCatch(error.response.data.message)
        }else{
            console.log(error);
        }
      }
      },[id,successDelete])

      useEffect(()=>{
          if(active === 'Cabs'){
            setCurrentData(cabsdata)
          }else if(active === 'HomeStays'){
            setCurrentData(homestaydata)
          }else{
            setCurrentData(hoteldata)
          }
      },[successDelete,id,active])

      const handleDeleteProperty = async(e)=>{
        e.preventDefault();
        const id = deleteId
        const type = deleteActive
        console.log(id, type);
        if(type === "Cabs"){
             try {
               const {data} = await deleteCab(id)
               if(data){
                 console.log(data);
                 setDeleteModal(false)
                 navigate('/owner/myproperties')
                 setSuccessDelete(!successDelete)
               }
             } catch (error) {
                if(error?.response?.data?.message === 'jwt expired'){
                  localStorage.removeItem('ownerInfo')
                  setErrorCatch(error.response.data.message)
                  }else{
                      console.log(error);
                  }
             }
        }else if(type === "HomeStays"){
            try {
              const {data} = await deleteHomeStay(id)
              if(data){
                console.log(data);
                setDeleteModal(false)
                navigate('/owner/myproperties')
                setSuccessDelete(!successDelete)
              }
            } catch (error) {
              if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('ownerInfo')
                setErrorCatch(error.response.data.message)
                }else{
                    console.log(error);
                }
            }
        }else if(type === "Hotels"){
            try {
              const {data} = await deleteHotel(id)
              if(data){
                console.log(data);
                setDeleteModal(false)
                navigate('/owner/myproperties')
                setSuccessDelete(!successDelete)
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
      }


  return (
    <>
    <div className='flex justify-center'>
     <div className='container min-h-screen mt-32 '>
       
       {!openEdit ?
         <div className='min-h-screen items-center lg:w-8/12 md:w-9/12 sm:w-9/12 lg:my-10 sm:my-7 mx-auto rounded-3xl justify-center bg-gray-50 bg-transparent px-3'>
           
          <div className='grid grid-cols-1 lg:grid-cols-3 text-center font-bold text-lg mb-7 pt-10'>
             <div className='w-full px-24' onClick={()=>setActive('Cabs')}>
                {active === "Cabs" ?
                 <h1 className='text-red-600'>Cabs</h1> : <h1>Cabs</h1>
                }
             </div>
             <div className='w-full px-24' onClick={()=>setActive('HomeStays')}>
                {active === "HomeStays" ?
                 <h1 className='text-red-600'>HomeStays</h1> : <h1>HomeStays</h1>
                }
             </div>
             <div className='w-full px-24' onClick={()=>setActive('Hotels')}>
                {active === "Hotels" ?
                 <h1 className='text-red-600'>Hotels</h1> : <h1>Hotels</h1>
                }
             </div>
          </div>
          {currentData.map((element)=>(
          <div className='rounded-lg mb-5 sm:my-7 justify-center bg-gray-300 bg-opacity-75 '>
            
              <>
                <div className="flex flex-row items-center 2xl:container 2xl:mx-auto lg:px-10 md:py-12 md:px-6 py-9 px-4">
                 
                  <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
              
                      <div className="w-full lg:w-6/12">
                          <h2 className="w-full font-bold lg:text-2xl text-black text-3xl lg:leading-10 leading-9">{(element?.brandname || element?.modelname) ? `${element?.brandname},${element?.modelname}` : element?.propertyname}</h2>
                          <h2 className="w-full font-semibold  text-gray-500  lg:text-lg md:text-xl sm:text-lg lg:leading-10 leading-9">Destination: <span className='text-black font-semibold'>{element?.destination},{element?.district}</span></h2>
                          <h2 className="w-full font-semibold  text-gray-500  lg:text-lg md:text-xl lg:-mt-3 sm:text-lg lg:leading-10 leading-9">{element?.fuelType ? (
                                          <>
                                          Fuel Type: <span className='text-black font-semibold'>{element.fuelType}</span>
                                          </>
                                      ) : (
                                          <>
                                          Address: <span className='text-black text-sm'>{element.address}</span>
                                          </>
                                      )}</h2>
                          <h2 className="w-full font-semibold text-gray-500 lg:text-lg lg:-mt-3 md:text-xl sm:text-lg lg:leading-10 leading-9">{element?.extraFair ? (
                                              <>
                                              Extra Fair (After 150 kms):{' '}
                                              <span className='text-black font-semibold'>₹{element.extraFair}</span>
                                              </>
                                          ) : (
                                              <>
                                              {element?.description && (
                                                  <>
                                                  Extra Features:{' '}
                                                  
                                                   <span className='text-blue-700' onClick={()=>{setFeaturesModalOpen(!featuresModalOpen);setFeaturesModalData(element.description)}}> View Features</span>
                                                  
                                                  </>
                                              )}
                                              </>
                                          )}</h2>
                          <h2 className="w-full font-semibold  lg:text-lg  lg:-mt-3 md:text-xl sm:text-lg text-gray-500 lg:leading-10 leading-9">{element?.registerNumber ? (
                                              <>
                                              Register Number: <span className='text-black font-semibold'>{element.registerNumber}</span>
                                              </>
                                          ) : (
                                              <>
                                              Base Price: <span className='text-black'>₹{element.baseprice}</span>
                                              </>
                                          )}</h2>
                          <h2 className="w-full font-semibold  lg:text-lg -mt-3 md:text-sm sm:text-lg text-gray-500 lg:leading-10 leading-9">{element?.seatingCapacity ? (
                                          <>
                                          Seating Capacity: <span className='text-black font-semibold'>{element.seatingCapacity}</span>
                                          </>
                                      ) : (
                                          <>
                                          Net Price: <span className='text-black'>₹{element.netprice}</span>
                                          </>
                                      )}</h2>
                          {element?.minCharge && (
                                <h2 className="w-full font-semibold text-gray-500 lg:text-lg lg:-mt-3 md:text-sm sm:text-lg lg:leading-10 leading-9">
                                  Min.Charge: <span className='text-black'>{element.minCharge}</span>
                                </h2>
                            )}
                       {/* <p className="font-normal text-base leading-6 text-gray-600 mt-2">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p> */}
                             <div className='grid grid-flow-col gap-5 px-6 mt-3'>
                                  <button onClick={()=>{setDeleteModal(true);setDeleteId(element._id);setDeleteActive(active)}} className="flex flex-row items-center text-center justify-center py-2  text-sm tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-600 focus:text-gray-50">
                                         <div>
                                             <MdDelete size={20} />
                                          </div>
                                          <div>
                                              Delete 
                                          </div>
                                  </button>

                                  {active === 'Cabs' &&
                                  <Link to={`/owner/editproperties/${element._id}/${active}`} className="flex flex-row items-center text-center justify-center space-x-1 text-sm tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none ">
                                          <div>
                                             <AiTwotoneEdit size={20} />
                                          </div>
                                          <div>
                                              Edit 
                                          </div>
                                  </Link> 
                                  }
                                  {active === 'HomeStays' &&
                                  <Link to={`/owner/editproperties/${element._id}/${active}`} className="flex flex-row items-center text-center justify-center space-x-1 text-sm tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none ">
                                          <div>
                                             <AiTwotoneEdit size={20} />
                                          </div>
                                          <div>
                                              Edit 
                                          </div>
                                  </Link> 
                                  }
                                  {active === 'Hotels' &&
                                  <Link to={`/owner/editproperties/${element._id}/${active}`} className="flex flex-row items-center text-center justify-center space-x-1 text-sm tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-900 focus:outline-none ">
                                          <div>
                                             <AiTwotoneEdit size={20} />
                                          </div>
                                          <div>
                                              Edit 
                                          </div>
                                  </Link> 
                                  }

                              </div>
                     </div>
                    <div className="w-full lg:w-5/12">
                      <img className="sm:block w-full h-40 p-2" src={element.images[0] && element?.images[0].url} alt="property" />
                      <div className='flex'>

                        <div className='w-full lg:w-6/12 p-2'>
                          <img className=" sm:block w-full h-full" src={element.images[1] && element?.images[1].url} alt="property" />
                        </div>
                        <div className='w-full lg:w-6/12 p-2'>
                          <img  className=" block w-full h-full" src={element.images[2] && element?.images[2].url} alt="property" />
                        </div>
                      </div>
                    </div>
                    
               </div>
 
             </div>

              
             </> 
            
          </div>
          ))}
          <FeaturesModal open={featuresModalOpen} onClose={()=>setFeaturesModalOpen(false)}>
            <div className='text-center w-56'>

                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-gray-800 '>{featuresModalData}</h3>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setFeaturesModalOpen(false)} className="btn bg-gray-700 text-white shadow-lg hover:bg-gray-800 p-2 rounded-lg w-full">Cancel</button>
                </div>
            </div>
        </FeaturesModal>
      </div> :
        
        <EditProperties open={openEdit} data={editData}  onClose={()=>setOpenEdit(false)} >
                  
        </EditProperties>

      }
      <OwnerModal open={deleteModal} onClose={()=>setDeleteModal(false)}>
            <div className='text-center w-56'>

               <MdDeleteOutline size={40} className='mx-auto text-red-600'></MdDeleteOutline>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-gray-800 '>Confirm Delete</h3>
                     <p className='text-sm text-gray-500'>Are you sure to delete this property?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setDeleteModal(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 text-sm p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleDeleteProperty} className="btn bg-red-500 hover:bg-red-600 text-white text-sm p-2 rounded-lg w-full">Yes,delete it</button>
                </div>
            </div>
        </OwnerModal>
        </div>
        </div>
        {errorCatch !== '' &&
            <OwnerTokenExpire message={errorCatch}/>
        }
    </>
  )
}

export default MyProperties
