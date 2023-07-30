import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import Modal from './Modal';
import {ImBlocked} from "react-icons/im"
import {CgUnblock} from "react-icons/cg"
import { superAdminBlockUser, superAdminGetUsers, superAdminUnBlockUser } from '../../api/SuperadminAPI';
import ReactPaginate from 'react-paginate';


function UsersList() {
   
  const [userData, setUserData] = useState([])
  const [open, setOpen] = useState(false)
  const [unblockModal, setUnblockModal] = useState(false)
  const [changeStatus, setChangeStatus] = useState(false)
  const [id, setId] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages]= useState(1)

  const dataPerPage = 5

  let handlePageClick = (e)=>{
    setPageNumber(e.selected+1)
  }

  useEffect(()=>{
    async function getNotifications(){
        const {data} = await superAdminGetUsers(pageNumber,dataPerPage)
        if(data ){
            setTotalPages(data.numberOfPages)
            setUserData(data.data)
        }
    }
    getNotifications()
},[pageNumber,changeStatus])

const handleBlock = async(_id)=>{
    const {data} = await superAdminBlockUser(id)
    if(data){
      setOpen(false)
      setChangeStatus(!changeStatus)
    }
}

const handleUnBlock = async(_id)=>{
  const {data} = await superAdminUnBlockUser(id)
  if(data){
    setUnblockModal(false)
    setChangeStatus(!changeStatus)
  }
}
    

  return (
    <>
    <div className='flex justify-center'>
     <div className='container lg:px-52  min-h-screen mt-32'>
            <div className='rounded-2xl bg-gray-100 bg-opacity-60 bg-transparent mx-7'>
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
                        Users List
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
                                      First Name
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Last Name
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Phone Number
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Email
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Joined On
                                    </th>
                                    <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Control
                                    </th>
                                    {/* <th
                                      class="px-5 py-3 border-b-2 border-gray-200 bg-blue-950 text-left text-xs font-semibold text-white uppercase tracking-wider">
                                      Control
                                    </th> */}
                                  </tr>
                                </thead>
						                
                            <tbody>
                              {userData.filter((val)=>{
                                  if(searchTerm === ''){
                                      return val
                                  }else if(val.firstname.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.lastname.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                                      return val
                                  }
                                  }).map((element,i)=>(
                                  <tr>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <div class="flex items-center">
                                            
                                                <div class="ml-3">
                                                    <p class="text-gray-900 whitespace-no-wrap">
                                                        {element.firstname}
                                                    </p>
                                                </div>
                                            </div>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{element.lastname}</p>
                                    </td>
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">{element.phonenumber}</p>
                                    </td>
                                    
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.email}
                                        </p>
                                    </td>

                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        <p class="text-gray-900 whitespace-no-wrap">
                                         {element.createdAt.slice(0,10)}
                                        </p>
                                    </td>
                                    
                                    <td class="px-5 py-2 border-b border-gray-200 bg-white text-sm">
                                        {element.status === 'active' &&
                                        <>
                                          <p class="text-green-700 whitespace-no-wrap">
                                          {element.status}
                                          </p>
                                          <span onClick={()=>{setOpen(!open);setId(element._id)}} class="bg-gradient-to-tl from-red-600 to-red-400 p-1 rounded-sm px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">Block</span>
                                        </>
                                        }
                                        {element.status === 'inActive' &&
                                            <>
                                              <p class="text-red-600 whitespace-no-wrap">
                                                  {element.status}
                                              </p> 
                                              <span onClick={()=>{setUnblockModal(!unblockModal);setId(element._id)}} class="bg-gradient-to-tl from-green-600 to-lime-400 p-1 rounded-sm px-2.5 text-xs rounded-1.8 py-1.4 inline-block whitespace-nowrap text-center align-baseline font-bold uppercase leading-none text-white">Unblock</span>
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
    
    <Modal open={open} onClose={()=>setOpen(false)}>
            <div className='text-center w-56'>

               <ImBlocked size={35} className='mx-auto text-red-600'></ImBlocked>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-bold text-gray-800 '>Confirm Block</h3>
                     <p className='text-sm font-normal text-gray-500'>Are you sure to block this user?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setOpen(false)} className="btn bg-white text-black text-base font-medium shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleBlock} className="btn bg-red-500 hover:bg-red-600 text-base font-medium text-white p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
        </Modal>

        <Modal open={unblockModal} onClose={()=>setUnblockModal(false)}>
            <div className='text-center w-56'>

               <CgUnblock size={45} className='mx-auto text-green-600'></CgUnblock>
                <div className='mx-auto my-4 w-48'>
                     <h3 className='text-lg font-bold text-gray-800 '>Confirm UnBlock</h3>
                     <p className='text-sm font-normal text-gray-500'>Are you sure to Unblock this user?</p>
                </div>
                <div className="flex gap-4">
                    <button onClick={()=>setUnblockModal(false)} className="btn text-base font-medium bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                    <button onClick={handleUnBlock} className="btn bg-red-500 text-base font-medium hover:bg-red-600 text-white p-2 rounded-lg w-full">Yes</button>
                </div>
            </div>
        </Modal>
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

export default UsersList
