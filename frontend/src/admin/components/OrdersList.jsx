import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import baseURL from '../../config';
import { useNavigate } from 'react-router-dom';

function OrdersList() {
    const navigate = useNavigate()
    const [ordersData, setOrdersData] = useState([])

    if(localStorage.ownerInfo !== undefined){
        var owner = JSON.parse(localStorage.ownerInfo);
      }
    const id = owner._id
    useEffect(()=>{
        const getData = async()=>{
                const data = await axios.get(`${baseURL}/owner/getorders/${id}`)
                if(data){
                    setOrdersData(data.data.orders)
                }
        }
        getData()
    },[])

    console.log(ordersData);

  return (
    <div className='rounded-lg bg-gray-100 bg-opacity-60 bg-transparent'>
      <Table className="border-collapse w-full rounded-lg">
      <Thead>
        <Tr>
          <Th className="border-2 border-gray-600 text-white font-semibold p-2 bg-gray-600 lg:px-12">Property</Th>
          <Th className="border-2 border-gray-600 text-white font-semibold p-2 bg-gray-600 lg:px-12">Ordered On</Th>
          <Th className="border-2 border-gray-600 text-white font-semibold p-2 bg-gray-600 lg:px-12">From</Th>
          <Th className="border-2 border-gray-600 text-white font-semibold p-2 bg-gray-600 lg:px-12">To</Th>
          <Th className="border-2 border-gray-600 text-white font-semibold p-2 bg-gray-600 lg:px-12">Duration</Th>
          <Th className="border-2 border-gray-600 text-white font-semibold p-2 bg-gray-600 lg:px-12">Control</Th>
        </Tr>
      </Thead>
      <Tbody>
        {ordersData.map((element,i)=>(
        <Tr key={i}>
          <Td className="border-2 border-gray-600 text-lg p-2 font-medium bg-gray-100 bg-opacity-60 ">{element.propertyname} {element.lastname}</Td>
          <Td className="border-2 border-gray-600 text-lg p-2 font-medium bg-gray-100 bg-opacity-60 ">{element.createdAt.slice(0,10)}</Td>
          <Td className="border-2 border-gray-600 text-lg p-2 text-red-600 font-medium bg-gray-100 bg-opacity-60 ">{element.fromDate.slice(0,10)}</Td>
          <Td className="border-2 border-gray-600 text-lg p-2 font-medium bg-gray-100 bg-opacity-60 ">{element.toDate.slice(0,10)}</Td>
          <Td className="border-2 border-gray-600 text-lg p-2 font-medium bg-gray-100 bg-opacity-60 ">{element.numberofdays} Days</Td>
          <Td className="border-2 border-gray-600 p-2 bg-gray-100 bg-opacity-60 ">
               <div className='flex flex-col'>
                      <div className='bg-red-600 text-lg px-3 rounded-md text-white text-center font-normal'>
                        <button onClick={()=>navigate('/owner/orderdetails',{state:element})}>View Details</button>
                      </div>
               </div>
            </Td>
        </Tr>
        ))}
      </Tbody>
    </Table>

    </div>
  )
}

export default OrdersList
