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
import { getProfileData } from '../../api/UserAPI';
import TokenExpireModal from './TokenExpireModal';
import { useNavigate } from 'react-router-dom';

function Wallet() {
  const navigate = useNavigate()
  const [userData, setUserData] = useState('')
  const [errorCatch, setErrorCatch]= useState('')

    const userLogin = useSelector((state)=> state.userLogin)
    const {userInfo} = userLogin
    const id = userInfo ? userInfo._id : navigate('/')
    useEffect(()=>{
      async function getAdminInfo(){
        try {
          const {data} = await getProfileData(id)
          if(data){
              setUserData(data.user)
          }
        } catch (error) {
          if(error.response.data.message === 'jwt expired'){
            localStorage.removeItem('userInfo')
            setErrorCatch(error.response.data.message)
          }
        }
      }
      getAdminInfo()
    },[])
  return (
    <div>
      <div className='flex justify-center'>
          <div className='container min-h-screen mt-20'>
                <Card className="flex-row w-full mx-auto mt-28 max-w-[48rem]">
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
      </div>
      {errorCatch !== '' &&
        <TokenExpireModal message={errorCatch} />
      }
    </div>
  )
}

export default Wallet
