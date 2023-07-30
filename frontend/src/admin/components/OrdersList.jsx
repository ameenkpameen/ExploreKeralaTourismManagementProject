import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useNavigate } from 'react-router-dom';
import { getPropertyOrders, updateOrderStatus } from '../../api/OwnerAPI';
import { FcViewDetails } from 'react-icons/fc'
import { TiTick } from "react-icons/ti"
import OwnerModal from './OwnerModal';
import {BsFillArrowUpCircleFill, BsFillArrowDownCircleFill} from 'react-icons/bs'
import OwnerTokenExpire from './OwnerTokenExpire';
import ReactPaginate from 'react-paginate';


function OrdersList() {
    const navigate = useNavigate()
    const [ordersData, setOrdersData] = useState([])
    const [statusModalOpen, setStatusModalOpen] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [statusEdited, setStatusEdited] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [sorted, setSorted] = useState({sorted: 'name', reversed: false})
    const [errorCatch, setErrorCatch] = useState('')
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages]= useState(1)

    const dataPerPage = 7

    let handlePageClick = (e)=>{
        setPageNumber(e.selected+1)
    }

    if(localStorage.ownerInfo !== undefined){
        var owner = JSON.parse(localStorage.ownerInfo);
      }
    const id = owner ? owner._id : navigate('/login')
    useEffect(()=>{
        try {
            const getData = async()=>{
                    const data = await getPropertyOrders(id,dataPerPage,pageNumber)
                    if(data){
                        setTotalPages(data.data.numberOfPages)
                        setOrdersData(data.data.orders)
                    }
            }
            getData()
        } catch (error) {
            if(error?.response?.data?.message === 'jwt expired'){
                localStorage.removeItem('ownerInfo')
                setErrorCatch(error.response.data.message)
            }else{
                console.log(error);
            }
        }
    },[pageNumber,statusEdited])

    const sortByStatus = ()=>{
        setSorted({sorted: 'status', reversed: !sorted.reversed})
        const ordersCopy = [...ordersData]
        ordersCopy.sort((orderA,orderB)=>{
            if(sorted.reversed){
                return orderB.status.localeCompare(orderA.status);
            }
                return orderA.status.localeCompare(orderB.status);
        })
        setOrdersData(ordersCopy)
    }

    const sortByName = ()=>{
        setSorted({sorted: 'name', reversed: !sorted.reversed})
        const ordersCopy = [...ordersData]
        ordersCopy.sort((orderA,orderB)=>{
            if(sorted.reversed){
                return orderB.propertyname.localeCompare(orderA.propertyname);
            }
                return orderA.propertyname.localeCompare(orderB.propertyname);
        })
        setOrdersData(ordersCopy)
    }
    const renderArrow = ()=>{
        if(sorted.reversed){
            return <BsFillArrowUpCircleFill />
        }
        return <BsFillArrowDownCircleFill />
    }

    const handleStatusUpdate = async()=>{
        try {
            const {data} = await updateOrderStatus(orderId)
            if(data){
                setStatusModalOpen(false)
                setStatusEdited(!statusEdited)
                console.log(data);
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

  return (
    <>
    <div className='flex justify-center'>
        <div className='container lg:px-40 min-h-screen mt-48'>
        
                
                 <div className='grid grid-cols-3'>
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
                    <div className='text-center my-auto text-white font-bold mr-4'>
                        Orders List
                    </div>
                    <form
                        className='flex border p-1 rounded-md font-bold text-[#1e1b4b] bg-gray-100/90 w-[50%] ' style={{ marginLeft: 'auto' }}
                        >
                        <select
                            type='text'
                            placeholder='Search Here...'
                            className='block w-full font-normal text-[#1e1b4b] text-sm bg-gray-100/90 rounded-md '
                        >
                            <option value="" className='text-gray-800 bg-white hover:text-white hover:bg-blue-950 font-normal'>Filter by</option>
                            <option value="" className='text-gray-800 bg-white hover:text-white hover:bg-blue-950 font-normal'>Status-cancelled</option>
                            <option value="" className='text-gray-800 bg-white hover:text-white hover:bg-blue-950 font-normal'>Status-confirmed</option>
                            <option value="" className='text-gray-800 bg-white hover:text-white hover:bg-blue-950 font-normal'>Status-Pending</option>
                        </select>
                        
                    </form>
                    
                </div>   
                  
              
              
            <div class="-mx-4 sm:-mx-8 px-2 sm:px-8 py-2 overflow-x-auto">
                <div className='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                    <table class="min-w-full leading-normal">
						<thead className=''>
							<tr>
								<th
									onClick={sortByName}
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									<div className='grid grid-cols-2'>
                                        <span>Property Name</span>
                                        {sorted.sorted === 'name'?
                                            renderArrow() :
                                            null    
                                        }
                                    </div>
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Ordered on
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									From
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									To
								</th>
                                <th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Duration
								</th>
                                <th
									onClick={sortByStatus}
                                    class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									<div className='grid grid-cols-2'>
                                        <span>Status</span>
                                        {sorted.sorted === 'status'?
                                            renderArrow() :
                                            null    
                                        }
                                    </div>
								</th>
								<th
									class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
									Control
								</th>
							</tr>
						</thead>
						<tbody>
                            {ordersData.filter((val)=>{
                                if(searchTerm === ''){
                                    return val
                                }else if(val.propertyname.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.createdAt.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                    return val
                                }
                                }).map((element,i)=>(
                               <tr>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {element.propertyname}
                                                    </p>
                                                </div>
                                            </div>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{element.createdAt.slice(0,10)}</p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.fromDate.slice(0,10)}
                                        </p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.toDate.slice(0,10)}
                                        </p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {element.numberofdays} days
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {element.status === 'confirmed' &&
                                        <p class="text-gray-800 font-semibold whitespace-no-wrap">
                                         {element.status}
                                        </p> }
                                        {element.status === 'approved' &&
                                        <p class="text-green-600 font-semibold whitespace-no-wrap">
                                         {element.status}
                                        </p> 
                                        }
                                        {element.status === 'delivered' &&
                                        <p class="text-green-600 font-semibold whitespace-no-wrap">
                                         {element.status}
                                        </p> 
                                        }
                                        {element.status === 'cancelled' &&
                                        <p class="text-red-600 font-semibold whitespace-no-wrap">
                                           {element.status}
                                         </p>
                                        }
                                        {element.status === 'Pending' &&
                                        <p class="text-blue-600 font-semibold whitespace-no-wrap">
                                           {element.status}
                                         </p>
                                        }
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <div className='flex flex-row gap-0 cursor-pointer' onClick={()=>navigate('/owner/orderdetails',{state:element})}>
                                            <div>
                                               < FcViewDetails size={25} />
                                            </div>
                                            <div>
                                                <p className='text-xs mt-1 text-red-500'>Details</p>
                                            </div>
                                        </div>
                                        {element.status === 'Pending' &&
                                            <div className='flex mt-2 flex-row gap-0 cursor-pointer' onClick={()=>{setStatusModalOpen(true);setOrderId(element._id)}}>
                                                <div>
                                                < TiTick color='green' size={25} />
                                                </div>
                                                <div>
                                                    <p className='text-xs mt-1 text-green-500'>Approve</p>
                                                </div>
                                            </div>
                                        }
                                    </td>
                                </tr> 
                            ))}
							
							
						</tbody>
					</table>
                </div>
            </div>
        </div>
        <OwnerModal open={statusModalOpen} onClose={()=>setStatusModalOpen(false)}>
            <div className='text-center w-56'>

               
               <TiTick size={40} className='mx-auto text-green-600'></TiTick>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-black text-gray-800 '>Confirm Approve</h3>
                     <p className='text-sm text-gray-500'>Are you sure to Approve this order?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setStatusModalOpen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleStatusUpdate}  className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
         </OwnerModal>
         {errorCatch !== '' &&
            <OwnerTokenExpire message={errorCatch}/>
        }
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
    </>
  )
}

export default OrdersList
