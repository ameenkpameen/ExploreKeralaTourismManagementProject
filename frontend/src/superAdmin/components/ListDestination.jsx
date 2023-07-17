import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import baseURL from '../../config';
import Modal from './Modal';
import {GiConfirmed} from "react-icons/gi"
import {BsFillCheckCircleFill} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {ImBlocked} from "react-icons/im"
import {CgUnblock} from "react-icons/cg"


function ListDestination() {

    const [destinations, setDestinations] = useState([])
    const [editOpen,setEditOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState('')
    const [blockModalOpen, setBlockModalopen] = useState(false)
    const [unblockModalOpen, setUnblockModalopen] = useState(false)
    const [dest_id, setDest_id] = useState('')
    const [id, setId] = useState('')
    const [changeStatus, setChangeStatus] = useState(false)

    const [destination, setDestination] = useState('');
    const [district, setDistrict] = useState('');
    const [spots, setSpots] = useState('');
    const [image, setImage] = useState(null);
    const [image_url, setImage_url] = useState(null);
    const [public_id, setPublic_id] = useState(null);
    const [destUpdate, setDestUpdate] = useState(false)
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const [imgUploading, setImgUploading] = useState(false)
    const [uploadedImg, setUplodedImg] = useState(false)
    const [errorImg, setErrorImg] = useState('')
    const [deleteImage, setDeleteImage] = useState(false)
    const [activeSubmit, setActiveSubmit] = useState(false)
    const [destinationData, setDestinationData] = useState('')

    const handleDestinationChange = (e)=>{
      const { name, value } = e.target;
      setDestinationData((prevState) => ({
         ...prevState,
         [name]: value,
       }));
       console.log(destinationData);
   }

   const handleSubmitChanges = async(e)=>{
       e.preventDefault();
       try {
        const {data} = await axios.post(`${baseURL}/superadmin/editestination`,{
            destinationData
        })
        if(data){
          console.log(data);
          setEditOpen(false);
          setDestUpdate(!destUpdate)
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
   }

    const imageUpload = (async (e)=>{
      e.preventDefault()

      const uploadImage = async (image) => {
        console.log(image);
        if(image === null){
          setErrorImg('Minimum One Document Required')
        }else{
          setImgUploading(true)
          try {
            const formData = new FormData();
            formData.append("file", image);
            formData.append("upload_preset", "exploreKerala");

            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/dp7ydtvg8/image/upload",
              formData
            );
        
            const responseData = response.data;
            setDestinationData((prevState) => ({
              ...prevState,
              image: responseData.url,
              public_id: responseData.public_id
            }));
            
            setImage_url(responseData.url);
            setPublic_id(responseData.public_id);
            setCloudinaryImage(responseData.secure_url);

            setImgUploading(false)
            setUplodedImg(true)
            setErrorImg('')
            setActiveSubmit(true)
          } catch (error) {
            console.log(error);
          }
        }
      
      }

      const docData = await uploadImage(image)
    })


    const handledeleteImage = async(e)=>{
      e.preventDefault();
      const pub_id = public_id
      const property_id = dest_id
      try {
          const {data} = await axios.post(`${baseURL}/superadmin/deletedestinationimage`,{
              public_id:pub_id,
              id:property_id
          })
          if(data.success){
              setModalOpen(false)
              setDestUpdate(!destUpdate)
              setDeleteImage(!deleteImage)
          }
          console.log(data.success);
        } catch (error) {
          console.log("Error:", error.message);
        }
   }

const handleBlockDestination = async(_id)=>{
    console.log(id);
    const {data} = await axios.post(`${baseURL}/superadmin/blockdestination/${id}`)
    if(data){
      setBlockModalopen(false)
      setChangeStatus(!changeStatus)
    }
}

const handleUnblockDestination = async(_id)=>{
  console.log(id);
  const {data} = await axios.post(`${baseURL}/superadmin/unblockdestination/${id}`)
  if(data){
    setUnblockModalopen(false)
    setChangeStatus(!changeStatus)
  }
}



    useEffect(()=>{
        async function getDestinations(){
            const { data,status } = await axios.get(`${baseURL}/superadmin/getdestinations`)
            if(status === 201){
                setDestinations(data.destinationdata)
            }
        }
        getDestinations()

    },[destUpdate,changeStatus,deleteImage])

    const [ currentPage, setCurrentPage] = useState(1)
    const recordsPerPage = 10
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    const records = destinations.slice( firstIndex, lastIndex)
    const npage = Math.ceil( destinations.length / recordsPerPage )
    const numbers = [...Array( npage + 1 ).keys()].slice(1)
    

  return (
    
    <div className='rounded-2xl bg-gray-100 bg-opacity-60 bg-transparent mt-16 mb-12'>
    <Table className="border-collapse w-full rounded-lg">
    <Thead>
      <Tr>
        <Th className="border-2 border-gray-600 text-white font-semibold text-base p-4 bg-gray-600 lg:px-12">Destination</Th>
        <Th className="border-2 border-gray-600 text-white font-semibold text-base p-4 bg-gray-600 lg:px-12">District</Th>
        <Th className="border-2 border-gray-600 text-white font-semibold text-base p-4 bg-gray-600 lg:px-12">Spots</Th>
        <Th className="border-2 border-gray-600 text-white font-semibold text-base p-4 bg-gray-600 lg:px-12">Created On</Th>
        <Th className="border-2 border-gray-600 text-white font-semibold text-base p-4 bg-gray-600 lg:px-12">Image</Th>
        <Th className="border-2 border-gray-600 text-white font-semibold text-base p-4 bg-gray-600 lg:px-12">Control</Th>

      </Tr>
    </Thead>
    <Tbody>
      {records.map((element,i)=>(
      <Tr key={i}>
        <Td className="border-2 p-5 text-red-700 border-gray-600 bg-gray-100 bg-opacity-60 ">{element.destination}</Td>
        <Td className="border-2 p-5 border-gray-600 font-semibold text-base bg-gray-100 bg-opacity-60 ">{element.district}</Td>
        <Td className="border-2 border-gray-600 font-semibold  p-5  text-xs bg-gray-100 bg-opacity-60 ">
            <div className="flex flex-col">
               {element.spots.map((e)=>(
                 <div>
                    {e}
                 </div>
               ))}
            </div>
        </Td>
        <Td className="border-2 border-gray-600 p-5 font-semibold text-base bg-gray-100 bg-opacity-60 ">{element.createdAt.slice(0,10)}</Td>
        <Td className="border-2 border-gray-600 p-1 bg-gray-100 bg-opacity-60 "><img width={150} height={130} src={element.image} alt="" /></Td>
        <Td className="border-2 border-gray-600 p-5 bg-gray-100 bg-opacity-60 ">
             <div className='flex flex-col'>
                   {element?.status === 'active' ?
                      <div className='bg-red-600 text-lg px-3 rounded-md text-white text-center font-normal'>
                        <button onClick={()=>{setBlockModalopen(!blockModalOpen);setId(element._id)}}>Block</button>
                      </div>
                        :
                      <div className='bg-green-800 text-lg px-3 rounded-md text-white text-center font-normal'>
                        <button onClick={()=>{setUnblockModalopen(!unblockModalOpen);setId(element._id)}}>UnBlock</button>
                      </div>
                     }
                <div className='bg-white mt-3 py-1 text-lg px-3 rounded-md text-black text-center font-normal'>
                   <button onClick={()=>{setDestinationData(element);setEditOpen(true)}} className=''>Edit</button>
                </div>
             </div>
          </Td>
      </Tr>
      ))}
    </Tbody>
  </Table>
            <Modal open={editOpen} onClose={()=>setEditOpen(false)}>
                  <div className='text-center w-96'>
                    
                          <div>
                             <h1 className='text-red-600'>Edit Destination</h1>
                            
                            <div className='mx-auto my-4 w-96'>
                              <form  className="w-full max-w-sm mx-auto text-white bg-[#20354b] p-8 rounded-lg shadow-xl drop-shadow-2xl" encType="multipart/form-data">
                                  <div className="mb-4">
                                      <label className="block text-white text-sm font-bold mb-2" htmlFor="destination">Destination Name</label>
                                      <input className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                      type="text" id="name" name="destination" placeholder="" value={destinationData.destination} onChange={handleDestinationChange}/>
                                  </div>
                                  <div className="mb-4">
                                      <label className="block text-white text-sm font-bold mb-2" htmlFor="district">District</label>
                                      <input className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                      type="text" id="email" name="district" value={destinationData.district} onChange={handleDestinationChange} />
                                  </div>
                                  <div className="mb-4">
                                      <label className="block text-white text-sm font-bold mb-2" htmlFor="spots">Tourist Spots</label>
                                      <input className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                                      type="text" multiple id="spots" name="spots" placeholder="" value={destinationData.spots} onChange={handleDestinationChange}/>
                                  </div>
                                  <div className="mb-4">
                                        {destinationData && destinationData.image ?
                                          <div className='w-full mt-4 space-x-1'>
                                                {destinationData && destinationData.image &&
                                                    <form action="">
                                                        <div className='flex flex-col bg-slate-100 rounded-lg justify-center text-center items-center p-2'>
                                                              <img className='h-16' src={destinationData.image} alt='' />
                                                                <span onClick={()=>{setModalOpen(true);setPublic_id(destinationData.public_id);setDest_id(destinationData._id)}} className='flex justify-center space-x-0 mt-2 bg-white'>
                                                                    
                                                                    <span className='text-red-600 text-xs mt-1'>Delete</span>
                                                                </span>
                                                        </div>
                                                    </form>
                                                }
                                            </div>
                                            :
                                           <form action="">
                                             <label className="block">
                                                <input type="file" name='image_url' className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-semibold
                                                file:bg-black file:text-white
                                                hover:file:bg-gray-600
                                                "
                                                onChange={(e)=>setImage(e.target.files[0])}
                                                />
                                                <div className="w-full  mb-6 md:mb-0 pr-1 mt-2">
                                                        {!uploadedImg ?
                                                            <button onClick={imageUpload} className="w-full px-4 py-2 tracking-wide text-white text-base transition-colors duration-200 transform bg-black rounded-md ">
                                                                {!imgUploading ?
                                                                    <span>Submit Image</span>
                                                                    :
                                                                    <div role="status">
                                                                        <svg aria-hidden="true" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                                                        </svg>
                                                                        <span class="sr-only">Loading...</span>
                                                                    </div>
                                                                }
                                                            </button>:
                                                            <div className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                                                <BsFillCheckCircleFill className='mx-auto' color='white' size={30}/>
                                                            </div>
                                                          }
                                                          {errorImg !== '' &&
                                                              <span className='text-red-600 text-sm'>{errorImg}</span>
                                                          }
                                                    </div>
                                            </label>
                                          </form>  
                                        }

                                      </div>
                                    
                                        <button
                                        className="w-full bg-black text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
                                        onClick={handleSubmitChanges}
                                        type="submit">Save</button>
                                    
                                </form>
                            </div>
                            
                            
                          </div>
                  
                      
                  </div>
              </Modal>

              
                <Modal open={modalOpen} onClose={()=>setModalOpen(false)}>
                  <div className='text-center w-56'>

                    
                    <AiTwotoneDelete size={56} className='mx-auto text-red-600'></AiTwotoneDelete>
                      <div className='mx-auto my-4 w-48'>
                          <h3 className='text-lg font-black text-gray-800 '>Confirm Delete</h3>
                          <p className='text-sm text-gray-500'>Are you sure to Delete this image?</p>
                      </div>
                      <div className="flex gap-4">
                          <button onClick={()=>setModalOpen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                          <button onClick={handledeleteImage}  className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full">Delete</button>
                      </div>
                  </div>
                </Modal>

                <Modal open={blockModalOpen} onClose={()=>setBlockModalopen(false)}>
                  <div className='text-center w-56'>

                    
                    <ImBlocked size={40} className='mx-auto text-red-600'></ImBlocked>
                      <div className='mx-auto my-4 w-48'>
                          <h3 className='text-lg font-black text-gray-800 '>Confirm Block</h3>
                          <p className='text-sm text-gray-500'>Are you sure to block this destination?</p>
                      </div>
                      <div className="flex gap-4">
                          <button onClick={()=>setBlockModalopen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                          <button onClick={handleBlockDestination}  className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full">Block</button>
                      </div>
                  </div>
                </Modal>
                <Modal open={unblockModalOpen} onClose={()=>setUnblockModalopen(false)}>
                  <div className='text-center w-56'>

                    
                    <CgUnblock size={40} className='mx-auto text-red-600'></CgUnblock>
                      <div className='mx-auto my-4 w-48'>
                          <h3 className='text-lg font-black text-gray-800 '>Confirm UnBlock</h3>
                          <p className='text-sm text-gray-500'>Are you sure to unblock this destination?</p>
                      </div>
                      <div className="flex gap-4">
                          <button onClick={()=>setUnblockModalopen(false)} className="btn bg-white text-black shadow-lg hover:bg-gray-100 p-2 rounded-lg w-full">Cancel</button>
                          <button onClick={handleUnblockDestination}  className="btn bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg w-full">UnBlock</button>
                      </div>
                  </div>
                </Modal>
  </div>
    
  )
}

export default ListDestination
