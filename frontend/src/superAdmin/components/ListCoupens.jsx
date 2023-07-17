import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import baseURL from '../../config';
import Modal from './Modal';
import {ImBlocked} from "react-icons/im"
import {CgUnblock} from "react-icons/cg"
import { useNavigate } from 'react-router-dom';

function ListCoupens() {
    const [coupenData, setCoupenData] = useState([])
    const [ blockModalopen, setBlockModalopen] = useState(false)
    const [ unblockModalOpen, setUnblockModalopen] = useState(false)
    const [id, setId] = useState('')
    const [changeStatus, setChangeStatus] = useState(false)
    const [editCoupen, setEditCoupen] = useState('')
    const navigate = useNavigate()
    
    const handleNavigation = () => {
        console.log(editCoupen);
        if(editCoupen !== ''){
            navigate('/superadmin/editcoupen', { state: editCoupen });
        }
      };

    const handleBlock = async()=>{
        console.log(id);
        const {data} = await axios.post(`${baseURL}/superadmin/blockcoupen/${id}`)
        if(data){
            setBlockModalopen(false)
          setChangeStatus(!changeStatus)
        }
    }
    
    const handleUnBlock = async()=>{
      console.log(id);
      const {data} = await axios.post(`${baseURL}/superadmin/unblockcoupen/${id}`)
      if(data){
        setUnblockModalopen(false)
        setChangeStatus(!changeStatus)
      }
    }

    useEffect(()=>{
        async function getCoupens(){
            const { data,status } = await axios.get(`${baseURL}/superadmin/getcoupens`)
            if(status === 201){
                setCoupenData(data.coupendata)
            }
        }
        getCoupens()

    },[changeStatus])
  return (
    <div className='rounded-2xl bg-gray-100 bg-opacity-60 bg-transparent mt-16'>
       <Table className="border-collapse w-full rounded-lg">
            <Thead>
            <Tr>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Coupen Code</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Property type</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Percentage</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Max Offer</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Expiry Date</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Controls</Th>

            </Tr>
            </Thead>
            <Tbody>
            {coupenData && coupenData !== [] && coupenData.map((element,i)=>(
            <Tr key={i}>
                <Td className="border-2 p-5 text-red-700 border-gray-600 bg-gray-100 text-base font-medium bg-opacity-60 ">{element.coupencode}</Td>
                <Td className="border-2 p-5 border-gray-600  bg-gray-100 bg-opacity-60 text-base font-medium ">{element.propertytype}</Td>
                
                <Td className="border-2 border-gray-600 p-5 bg-gray-100 bg-opacity-60 text-base font-medium ">{element.percentage}</Td>
                <Td className="border-2 border-gray-600 p-1 bg-gray-100 bg-opacity-60 text-base font-medium ">₹{element.maxoffer}</Td>
                <Td className="border-2 border-gray-600 p-1 bg-gray-100 bg-opacity-60 text-base font-medium ">{element.expirydate.slice(0,10)}</Td>
                <Td className="border-2 border-gray-600 p-5 bg-gray-100 bg-opacity-60 ">
                    <div className='flex flex-col'>
                        {element?.status === 'active' ?
                            <div className='bg-red-600 text-lg px-3 rounded-md text-white text-center font-normal'>
                                <button onClick={()=>{setBlockModalopen(!blockModalopen);setId(element._id)}}>Block</button>
                            </div>
                                :
                            <div className='bg-green-800 text-lg px-3 rounded-md text-white text-center font-normal'>
                                <button onClick={()=>{setUnblockModalopen(!unblockModalOpen);setId(element._id)}}>UnBlock</button>
                            </div>
                            }
                        
                    </div>
                    <div className='flex flex-col mt-2'>
                        
                            <div className='bg-white text-lg px-3 rounded-md text-red-600 text-center font-normal'>
                                <button onClick={()=>{setEditCoupen(element);handleNavigation()}}>Edit</button>
                            </div>
                        
                    </div>
                </Td>
            </Tr>
            ))}
            </Tbody>
        </Table>
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
