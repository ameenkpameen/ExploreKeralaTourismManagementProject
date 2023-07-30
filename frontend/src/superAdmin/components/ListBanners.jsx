import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from './Modal';
import {FaListUl } from "react-icons/fa"
import { CgPlayListRemove } from "react-icons/cg"
import { superAdminGetBanners, superAdminListBanner, superAdminUnListBanner } from '../../api/SuperadminAPI';

function ListBanners() {
    const [bannerData, setBannerData] = useState()
    const [listModalOpen, setListModalopen] = useState(false)
    const [unListModalOpen, setUnListModalopen] = useState(false)
    const [changeStatus, setChangeStatus] = useState(false)
    const [id, setId] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

     
    const handleUnlist = async()=>{
        const {data} = await superAdminUnListBanner(id)
        if(data){
            setUnListModalopen(false)
            setChangeStatus(!changeStatus)
        }
    }
    
    const handleList = async()=>{
      const {data} = await superAdminListBanner(id)
      if(data){
        setListModalopen(false)
        setChangeStatus(!changeStatus)
      }
    }

    useEffect(()=>{
        async function getBanners(){
            const { data,status } = await superAdminGetBanners()
            if(status === 201){
                setBannerData(data.bannerdata)
            }
        }
        getBanners()

    },[changeStatus])

    console.log(bannerData);
  return (
    <div className='flex justify-center'>
     <div className='container lg:px-52 min-h-screen mt-32'>
    <div className='rounded-2xl bg-gray-100 bg-opacity-60 bg-transparent mt-16 mx-7'>
                <div className='grid grid-cols-2'>
                    <form
                        className='flex border p-1 rounded-md font-bold text-[#1e1b4b] bg-gray-100/90 w-[100%] '
                        >
                        <input
                            type='text'
                            placeholder='Search Here...'
                            className='grow bg-transparent outline-none p-2'
                            onChange={(e)=>setSearchTerm(e.target.value)}
                        />
                    </form>
                    <div className='text-end my-auto text-white font-bold mr-4'>
                        Banners List
                    </div>
                    
                </div>  

        
    </div>
    <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                            <table class="min-w-full leading-normal max-w-fit">
                                <thead className=''>
                                  <tr>
                                    <th
                                      class="text-center py-3 border-b-2 border-gray-200 bg-blue-950 text-xs font-semibold text-white uppercase tracking-wider">
                                      Heading
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Description
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Created On
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Image
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Control
                                    </th>
                                    
                                  </tr>
                                </thead>
						                
                            <tbody>
                              {bannerData && bannerData !== [] && bannerData.filter((val)=>{
                                  if(searchTerm === ''){
                                      return val
                                  }else if(val.heading.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                      return val
                                  }
                                  }).map((element,i)=>(
                                  <tr>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {element.heading}
                                                    </p>
                                                </div>
                                            </div>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{element.description}</p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{element.createdAt.slice(0,10)}</p>
                                    </td>
                                    
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                            <img width={150} height={130} src={element.image} alt="" />
                                    </td>

                                    
                                    
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {element.status === 'list' &&
                                        <>
                                          <p class="text-green-700 whitespace-no-wrap">
                                          {element.status}
                                          </p>
                                          <span  onClick={()=>{setUnListModalopen(!unListModalOpen);setId(element._id)}} class="bg-gradient-to-tl from-red-600 to-red-400 p-1 rounded-sm px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">Unlist</span>
                                        </>
                                        }
                                        {element.status === 'unlist' &&
                                            <>
                                              <p class="text-red-600 whitespace-no-wrap">
                                                  {element.status}
                                              </p> 
                                              <span onClick={()=>{setListModalopen(!listModalOpen);setId(element._id)}} class="bg-gradient-to-tl from-green-600 to-lime-400 p-1 rounded-sm px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">List</span>
                                            </>
                                        }
                                        
                                    </td>
                                    
                                </tr> 
                                ))}
							
							
						                </tbody>
					                </table>
                </div>
            </div>

    </div>


    <Modal open={unListModalOpen} onClose={()=>setUnListModalopen(false)}>
            <div className='text-center w-56'>

               <CgPlayListRemove size={40} className='mx-auto text-red-600'></CgPlayListRemove>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg text-gray-800 font-medium'>Confirm Unlist</h3>
                     <p className='text-sm text-gray-500 font-semibold'>Are you sure to unlist this banner?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setUnListModalopen(false)} className="btn bg-white text-black font-semibold shadow-lg text-base hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleUnlist} className="btn bg-red-500 hover:bg-red-600 text-white font-semibold text-base p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
        </Modal>

        <Modal open={listModalOpen} onClose={()=>setListModalopen(false)}>
            <div className='text-center w-56'>

               <FaListUl size={30} className='mx-auto text-green-600'></FaListUl>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-medium text-gray-800 '>Confirm List</h3>
                     <p className='text-sm text-gray-500 font-semibold'>Are you sure to list this banner?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setListModalopen(false)} className="btn bg-white text-black shadow-lg font-semibold text-base hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleList} className="btn bg-red-500 hover:bg-red-600 text-white font-semibold text-base p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default ListBanners
