import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button
  } from "@material-tailwind/react";
import HomeStayAdd from './HomeStayAdd';
import CabsAdd from './CabsAdd';
import baseURL from '../../config';
import { ownerGetDestinations } from '../../api/OwnerAPI';
import OwnerTokenExpire from './OwnerTokenExpire';

function AddProperties(props) {


    if(localStorage.ownerInfo !== undefined){
        var owner = JSON.parse(localStorage.ownerInfo);
      }

   const [active,setActive] = useState('');
   const [destinations,setDestinations] = useState([])
   const [add,setAdd] = useState(false);
   const [errorCatch, setErrorCatch] = useState('')

  const menus = [
    {name: "HomeStays", link:"https://akm-img-a-in.tosshub.com/businesstoday/images/story/201810/home-loan_660_020117053409_030917101300_103018074036.jpg"},
    {name: "Hotels", link:"https://images.jdmagicbox.com/comp/mumbai/10/022pgl01810/catalogue/taj-lands-end-hotel-bandra-west-mumbai-5-star-hotels-4swt18.jpg?clr="},
    {name: "Cabs", link:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV5kZNQdJxUAiSn9eFc7_MbLzoQ5wY-paDsC9SL1vKcQ-VO6qHir3LSUaT7YDmf5U4CVcE8vqV730&usqp=CAU&ec=48665701"}
  ]

  useEffect(()=>{
    async function getDestinations(){
        try {
            const {data} = await ownerGetDestinations
            if(data){
                const destinationArray = []
                data.destinationdata.forEach((e)=>{
                    destinationArray.push(e.destination)
                })
                setDestinations(destinationArray)
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
    getDestinations()
},[])

  return (
   <>
   <div className='flex justify-center'>
     <div className='container lg:px-40 min-h-screen mt-32'>
    {owner.status === 'inActive' ?
       <h1 className=' text-red-600 bg-white p-5 rounded-lg'>You Are Blocked by Admin</h1> :
            <div className='py-2 mx-20'>
                {!add &&
                <div className='grid grid-cols-1 lg:grid-cols-3 lg:gap-0 justify-items-center mt-5 rounded-lg'>
                    {
                        menus?.map((menu, index)=>(
                    <Card key={index} className="mt-6 w-80 p-5 bg-[#20354b] items-center">
                    <CardHeader color="blue-gray" className="relative h-56">
                        <img src={menu?.link} alt="img-blur-shadow" layout="fill" />
                    </CardHeader>
                    
                    <CardFooter className="">
                        <Button className='bg-red-600 text-white' onClick={()=>{setActive(menu?.name);setAdd(!add)}}>Add {menu?.name}</Button>
                    </CardFooter>
                    
                    </Card>

                    ))   
                    }
                </div>
                 }
                <div className='w-full m-3 text-xl  flex justify-center items-center font-bold pt-16 '>
                    <div className='flex flex-col items-center'>
                        {active === "HomeStays" && < HomeStayAdd setActive={props.basesetActive} active={props.baseactive} setAdd={setAdd} add={add} destinations={destinations} property={"homestay"} Heading={"ADD HOMESTAYS"}/>}
                    </div>
                    <div className='flex flex-col items-center'>
                        {active === "Hotels" && < HomeStayAdd setActive={props.basesetActive} active={props.baseactive} setAdd={setAdd} add={add} destinations={destinations} property={"hotel"} Heading={"ADD HOTELS"}/>}
                    </div>
                    <div className='flex flex-col items-center'>
                        {active === "Cabs" && < CabsAdd setActive={props.basesetActive} active={props.baseactive} setAdd={setAdd} add={add} destinations={destinations} Heading={"ADD CABS"}/>}
                    </div>
                </div>
       </div>
    }
    </div>
    </div>
    {errorCatch !== '' &&
        <OwnerTokenExpire message={errorCatch}/>
      }
    </>
  )
}

export default AddProperties
