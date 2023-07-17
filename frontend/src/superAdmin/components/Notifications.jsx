import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
import axios from 'axios';
import baseURL from '../../config';
import ProperNotifications from './ProperNotifications';


function Notifications() {
    const [active,setActive] = useState('');
    const [cabdata,setCabdata] = useState([]);
    const [homestaydata,setHomestaydata] = useState([]);
    const [hoteldata,setHoteldata] = useState([]);
    const [approveStatus, setApproveStatus] = useState(false)
    const [count, setCount] = useState()

    const menus = [
        {name: "HomeStays", link:"https://akm-img-a-in.tosshub.com/businesstoday/images/story/201810/home-loan_660_020117053409_030917101300_103018074036.jpg"},
        {name: "Hotels", link:"https://images.jdmagicbox.com/comp/mumbai/10/022pgl01810/catalogue/taj-lands-end-hotel-bandra-west-mumbai-5-star-hotels-4swt18.jpg?clr="},
        {name: "Cabs", link:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV5kZNQdJxUAiSn9eFc7_MbLzoQ5wY-paDsC9SL1vKcQ-VO6qHir3LSUaT7YDmf5U4CVcE8vqV730&usqp=CAU&ec=48665701"}
      ]

    useEffect(()=>{
        async function getNotifications(){
            const {data} = await axios.get(`${baseURL}/superadmin/getpropertiesnotifications`)
            if(data){
                setCabdata(data.cabsData)
                setHomestaydata(data.homestayData)
                setHoteldata(data.hotelData)
            }
            
            
        }
        getNotifications()
    },[])
    

  return (
    <div className='py-28'>
                <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-3 justify-items-center mt-5 rounded-lg'>
                    {
                        menus?.map((menu, index)=>(
                    <Card key={index} className=" w-80 p-3 bg-[#20354b] items-center">
                    
                    <CardBody>
                        <Typography variant="h5" color="blue-gray" className="mb-2 text-white">
                        {menu?.name}
                        </Typography>
                        
                    </CardBody>
                    
                    <CardFooter className="pt-0 bg-purple-900 w-full rounded-md text-center hover:bg-purple-950 cursor-pointer">
                        <Button className='text-white' onClick={()=>setActive(menu?.name)}>Notifications of {menu?.name}</Button>
                    </CardFooter>
                    
                    </Card>

                ))   
                }
                </div>


               <div className=''>
                    <div className='flex flex-col items-center'>
                        {active === "HomeStays" && < ProperNotifications property ={"homestay"} data={homestaydata}/>}
                        {active === "Hotels" && < ProperNotifications property ={"hotel"} data={hoteldata} />}
                        {active === "Cabs" && < ProperNotifications property ={"cab"} data={cabdata}/>}
                    </div>
                    
                </div>

 </div>
  )
}

export default Notifications
