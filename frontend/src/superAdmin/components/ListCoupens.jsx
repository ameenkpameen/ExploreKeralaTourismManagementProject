import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from './Modal';
import {ImBlocked} from "react-icons/im"
import {CgUnblock} from "react-icons/cg"
import { useNavigate } from 'react-router-dom';
import { AiFillEdit } from "react-icons/ai"
import { superAdminBlockCoupen, superAdminGetCoupens, superAdminUnBlockCoupen } from '../../api/SuperadminAPI';

function ListCoupens() {
    const [coupenData, setCoupenData] = useState([])
    const [ blockModalopen, setBlockModalopen] = useState(false)
    const [ unblockModalOpen, setUnblockModalopen] = useState(false)
    const [id, setId] = useState('')
    const [changeStatus, setChangeStatus] = useState(false)
    const [editCoupen, setEditCoupen] = useState('')
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState('')
    
    const handleNavigation = () => {
        console.log(editCoupen);
        if(editCoupen !== ''){
            navigate('/superadmin/editcoupen', { state: editCoupen });
        }
      };

    const handleBlock = async()=>{
        console.log(id);
        const {data} = await superAdminBlockCoupen(id)
        if(data){
            setBlockModalopen(false)
          setChangeStatus(!changeStatus)
        }
    }
    
    const handleUnBlock = async()=>{
      console.log(id);
      const {data} = await superAdminUnBlockCoupen(id)
      if(data){
        setUnblockModalopen(false)
        setChangeStatus(!changeStatus)
      }
    }

    useEffect(()=>{
        async function getCoupens(){
            const { data,status } = await superAdminGetCoupens()
            if(status === 201){
                setCoupenData(data.coupendata)
            }
        }
        getCoupens()

    },[changeStatus])
  return (
    <div className='flex justify-center'>
     <div className='container lg:px-52  min-h-screen mt-32'>
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
                        Coupens List
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
                                      Coupen Code
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Property type
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Percentage
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Max Offer
                                    </th>
                                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Expiry Date
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Status
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Control
                                    </th>
                                  </tr>
                                </thead>
						                
                            <tbody>
                              {coupenData && coupenData !== [] && coupenData.filter((val)=>{
                                  if(searchTerm === ''){
                                      return val
                                  }else if(val.coupencode.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.propertytype.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ){
                                      return val
                                  }
                                  }).map((element,i)=>(
                                  <tr>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {element.coupencode}
                                                    </p>
                                                </div>
                                            </div>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{element.propertytype}</p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                          
                                        <p class="text-gray-900 whitespace-no-wrap">
                                        {element.percentage}
                                        </p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.maxoffer}
                                        </p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                            {element.expirydate.slice(0,10)}
                                        </p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {element.status === 'active' &&
                                        <>
                                          <p class="text-green-700 whitespace-no-wrap">
                                          {element.status}
                                          </p>
                                          <span onClick={()=>{setBlockModalopen(!blockModalopen);setId(element._id)}} class="bg-gradient-to-tl from-red-600 to-red-400 p-1 rounded-sm px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">Block</span>
                                        </>
                                        }
                                        {element.status === 'inActive' &&
                                            <>
                                              <p class="text-red-600 whitespace-no-wrap">
                                                  {element.status}
                                              </p> 
                                              <span onClick={()=>{setUnblockModalopen(!unblockModalOpen);setId(element._id)}} class="bg-gradient-to-tl from-green-600 to-lime-400 p-1 rounded-sm px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">Unblock</span>
                                            </>
                                        }
                                        
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <div  onClick={()=>{setEditCoupen(element);handleNavigation()}} className='flex flex-row gap-0 cursor-pointer'>
                                            <div>
                                               < AiFillEdit size={25} color='blue'/>
                                            </div>
                                            <div>
                                                <p className='text-xs mt-1 text-blue-700'>Edit</p>
                                            </div>
                                        </div>
                                        
                                    </td>
                                </tr> 
                                ))}
							
							
						                </tbody>
					                </table>
                </div>
            </div>
        </div>
        <Modal open={blockModalopen} onClose={()=>setBlockModalopen(false)}>
            <div className='text-center w-56'>

               <ImBlocked size={40} className='mx-auto text-red-600'></ImBlocked>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg text-gray-800 font-medium'>Confirm Block</h3>
                     <p className='text-sm text-gray-500 font-semibold'>Are you sure to block this coupen?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setBlockModalopen(false)} className="btn bg-white text-black font-semibold shadow-lg text-base hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleBlock} className="btn bg-red-500 hover:bg-red-600 text-white font-semibold text-base p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
        </Modal>

        <Modal open={unblockModalOpen} onClose={()=>setUnblockModalopen(false)}>
            <div className='text-center w-56'>

               <CgUnblock size={50} className='mx-auto text-green-600'></CgUnblock>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-medium text-gray-800 '>Confirm UnBlock</h3>
                     <p className='text-sm text-gray-500 font-semibold'>Are you sure to Unblock this coupen?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setUnblockModalopen(false)} className="btn bg-white text-black shadow-lg font-semibold text-base hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleUnBlock} className="btn bg-red-500 hover:bg-red-600 text-white font-semibold text-base p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default ListCoupens
