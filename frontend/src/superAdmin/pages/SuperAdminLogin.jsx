import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import SuperAdminHeader from '../components/SuperAdminHeader'
import SuperAdminFooter from '../components/SuperAdminFooter'
import SuperAdminError from '../components/SuperAdminError'
import SuperAdminLoading from '../components/SuperAdminLoading'
import { superadminLogin } from '../../actions/superAdminActions'

function SuperAdminLogin() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const superadminsLogin = useSelector(state => state.superadminLogin)
  const { loading,error, superadminInfo } = superadminsLogin
  const dispatch = useDispatch();

  useEffect(()=> {
    if(superadminInfo){
        navigate('/superadmin')
    }
  },[superadminInfo])

  const submitHandler = async(e) =>{
    e.preventDefault()
    
    dispatch(superadminLogin(email,password))
  }

  return (
    <>
     <SuperAdminHeader />
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden px-10 " >
                <div className='flex items-center justify-center bg-cover'>
                    <h1 className=" py-2 rounded-lg w-48 font-LobsterTwo text-3xl mt-24 text-center text-black">
                        <span className='font-Squada font-bold text-red-500'>E</span>xplore<span className='font-Squada font-bold text-red-500'>K</span>erala
                    </h1>
                </div>
                <div className="w-full p-10 m-auto bg-white rounded-md shadow-xl drop-shadow-2xl  lg:max-w-xl opacity-100">
                    <h1 className="text-3xl font-bold text-center text-red-600 uppercase">
                    SUPER ADMIN
                    </h1>
                    {error && <SuperAdminError message={error}>{error}</SuperAdminError>}
                    {loading && <SuperAdminLoading />}
                    <form className="mt-6" onSubmit={submitHandler}>
                        <div className="mb-2">
                            <label
                                for="email"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e)=> setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label
                                for="password"
                                className="block text-sm font-semibold text-gray-800"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                onChange={(e)=> setPassword(e.target.value)}
                            />
                        </div>
                        {/* <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a> */}
                        <div className="mt-6">

                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-950 rounded-md hover:bg-purple-900 focus:outline-none focus:bg-purple-900">
                                Login
                            </button>
                        </div>
                    </form>

                    
                </div>
            </div>
            <SuperAdminFooter />
        </>
  )
}

export default SuperAdminLogin
