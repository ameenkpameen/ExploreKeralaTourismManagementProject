import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import baseURL from '../../config';
import Modal from './Modal';

import {GiConfirmed} from "react-icons/gi"
import {ImBlocked} from "react-icons/im"
import {CgUnblock} from "react-icons/cg"




function UsersList() {
   
  const [userData, setUserData] = useState([])
  const [open, setOpen] = useState(false)
  const [unblockModal, setUnblockModal] = useState(false)
  const [changeStatus, setChangeStatus] = useState(false)
  const [id, setId] = useState('')

  useEffect(()=>{
    async function getNotifications(){
        const {data} = await axios.get(`${baseURL}/superadmin/getallusers`)
        if(data ){
            setUserData(data.data)
        }
    }
    getNotifications()
},[changeStatus])

const handleBlock = async(_id)=>{
    console.log(id);
    const {data} = await axios.post(`${baseURL}/superadmin/blockuser/${id}`)
    if(data){
      setOpen(false)
      setChangeStatus(!changeStatus)
    }
}

const handleUnBlock = async(_id)=>{
  console.log(id);
  const {data} = await axios.post(`${baseURL}/superadmin/unblockuser/${id}`)
  if(data){
    setUnblockModal(false)
    setChangeStatus(!changeStatus)
  }
}
    
// console.log(userData);


  return (
    <div className='rounded-2xl bg-gray-100 bg-opacity-60 bg-transparent'>
      <Table className="border-collapse w-full rounded-lg">
      <Thead>
        <Tr>
          <Th className="border-2 border-gray-600 font-semibold text-white p-2 bg-gray-600 lg:px-12">First Name</Th>
          <Th className="border-2 border-gray-600 font-semibold text-white p-2 bg-gray-600 lg:px-12">Last Name</Th>
          <Th className="border-2 border-gray-600 font-semibold text-white p-2 bg-gray-600 lg:px-12">phone Number</Th>
          <Th className="border-2 border-gray-600 font-semibold text-white p-2 bg-gray-600 lg:px-12">Email</Th>
          <Th className="border-2 border-gray-600 font-semibold text-white p-2 bg-gray-600 lg:px-12">Joined On</Th>
          <Th className="border-2 border-gray-600 font-semibold text-white p-2 bg-gray-600 lg:px-12">Control</Th>

        </Tr>
      </Thead>
      <Tbody>
        {userData.map((element,i)=>(
        <Tr key={i}>
          <Td className="border-2 border-gray-600 p-2 font-medium text-lg bg-gray-100 bg-opacity-60 ">{element.firstname}</Td>
          <Td className="border-2 border-gray-600 p-2 font-medium text-lg bg-gray-100 bg-opacity-60 ">{element.lastname}</Td>
          <Td className="border-2 border-gray-600 p-2 font-medium text-lg bg-gray-100 bg-opacity-60 ">{element.phonenumber}</Td>
          <Td className="border-2 border-gray-600 p-2 font-medium text-lg text-red-600 bg-gray-100 bg-opacity-60 ">{element.email}</Td>
          <Td className="border-2 border-gray-600 p-2 font-medium text-lg bg-gray-100 bg-opacity-60 ">{element.createdAt.slice(0,10)}</Td>
          <Td className="border-2 border-gray-600 p-2 font-medium text-lg bg-gray-100 bg-opacity-60 ">
               <div className='flex flex-col'>
                  
                     {element?.status === 'active' ?
                      <div className='bg-red-600 text-lg px-3 rounded-md text-white text-center font-normal'>
                        <button onClick={()=>{setOpen(!open);setId(element._id)}}>Block</button>
                      </div>
                        :
                      <div className='bg-green-800 text-lg px-3 rounded-md text-white text-center font-normal'>
                        <button onClick={()=>{setUnblockModal(!unblockModal);setId(element._id)}}>UnBlock</button>
                      </div>
                     }
                  
               </div>
            </Td>
        </Tr>
        ))}
      </Tbody>
    </Table>
        <Modal open={open} onClose={()=>setOpen(false)}>
            <div className='text-center w-56'>

               <ImBlocked size={40} className='mx-auto text-red-600'></ImBlocked>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-gray-800 '>Confirm Block</h3>
                     <p className='text-sm text-gray-500'>Are you sure to block this user?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setOpen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleBlock} className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
        </Modal>

        <Modal open={unblockModal} onClose={()=>setUnblockModal(false)}>
            <div className='text-center w-56'>

               <CgUnblock size={50} className='mx-auto text-green-600'></CgUnblock>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-gray-800 '>Confirm UnBlock</h3>
                     <p className='text-sm text-gray-500'>Are you sure to Unblock this user?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setUnblockModal(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleUnBlock} className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
        </Modal>
    </div>
  )
}

export default UsersList
