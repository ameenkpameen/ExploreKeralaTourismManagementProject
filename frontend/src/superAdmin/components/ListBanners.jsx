import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import baseURL from '../../config';

function ListBanners() {
    const [bannerData, setBannerData] = useState()
    const [blockModalOpen, setBlockModalopen] = useState(false)
    const [unblockModalOpen, setUnblockModalopen] = useState(false)
    const [id, setId] = useState('')



    useEffect(()=>{
        async function getBanners(){
            const { data,status } = await axios.get(`${baseURL}/superadmin/getbanners`)
            if(status === 201){
                setBannerData(data.bannerdata)
            }
        }
        getBanners()

    },[])

    console.log(bannerData);
  return (
    <div className='rounded-2xl bg-gray-100 bg-opacity-60 bg-transparent mt-16'>
       <Table className="border-collapse w-full rounded-lg">
            <Thead>
            <Tr>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Heading</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Description</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Created On</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Image</Th>
                <Th className="border-2 border-gray-600 text-white p-4 bg-gray-600 font-thin lg:px-12">Control</Th>

            </Tr>
            </Thead>
            <Tbody>
            {bannerData && bannerData !== [] && bannerData.map((element,i)=>(
            <Tr key={i}>
                <Td className="border-2 p-5 text-red-700 border-gray-600 bg-gray-100 text-base font-medium bg-opacity-60 ">{element.heading}</Td>
                <Td className="border-2 p-5 border-gray-600  bg-gray-100 bg-opacity-60 text-base font-medium ">{element.description}</Td>
                
                <Td className="border-2 border-gray-600 p-5 bg-gray-100 bg-opacity-60 text-base font-medium ">{element.createdAt.slice(0,10)}</Td>
                <Td className="border-2 border-gray-600 p-1 bg-gray-100 bg-opacity-60 text-base font-medium "><img width={150} height={130} src={element.image} alt="" /></Td>
                <Td className="border-2 border-gray-600 p-5 bg-gray-100 bg-opacity-60 ">
                    <div className='flex flex-col'>
                        {element?.status === 'list' ?
                            <div className='bg-red-600 text-lg px-3 rounded-md text-white text-center font-normal'>
                                <button onClick={()=>{setBlockModalopen(!blockModalOpen);setId(element._id)}}>Block</button>
                            </div>
                                :
                            <div className='bg-green-800 text-lg px-3 rounded-md text-white text-center font-normal'>
                                <button onClick={()=>{setUnblockModalopen(!unblockModalOpen);setId(element._id)}}>UnBlock</button>
                            </div>
                            }
                        
                    </div>
                </Td>
            </Tr>
            ))}
            </Tbody>
        </Table>
    </div>
  )
}

export default ListBanners
