import React, { useEffect, useState } from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import image from '../../../src/assets/images/wallet.jpg'
  import {TfiWallet} from "react-icons/tfi"
import { useSelector } from 'react-redux';
import axios from 'axios';
import baseURL from '../../config';

function Wallet() {

  const [userData, setUserData] = useState('')

  const userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin
     
    const id = userInfo._id

    useEffect(()=>{
      async function getAdminInfo(){
        const {data} = await axios.get(`${baseURL}/getprofile/${id}`)
        if(data){
            setUserData(data.user)
        }
      }
      getAdminInfo()
    },[])
  return (
    <div>
      <Card className="flex-row w-full max-w-[48rem]">
      <CardHeader shadow={false} floated={false} className="w-2/5 shrink-0 m-0 rounded-r-none">
        <img 
          src={image} 
          alt="wallet" 
          className="w-full h-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h6" color="blue" className="uppercase mb-4">My Wallet</Typography>
        <Typography variant="h4" color="blue-gray" className="mb-2">
            Pleasurable Shopping Experience...Fast Payment...
        </Typography>
        <Typography color="gray" className="font-normal mb-8">
            The amount is deducted from the virtual pocket automatically each time the customer shops from the site.
        </Typography>
        <div className='flex flex-row gap-3'>
           <TfiWallet color='blue' size={30}/>
           <div className='flex flex-row'>
              <div className='text-base'>
                 Your Balance:
              </div>
              <div className='text-base text-red-500 ml-2'>
                ₹{userData.wallet}
              </div>
           </div>
        </div>
        <span href="#" className="inline-block">
          <Button variant="text" className="flex items-center gap-2">
            Use Wallet 
            
          </Button>
        </span>
      </CardBody>
    </Card>
    </div>
  )
}

export default Wallet
