import React, { useEffect } from 'react'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OwnerError from '../components/OwnerError'
import OwnerLoading from '../components/OwnerLoading'
import { ownerLogin } from '../../actions/adminActions'

function OwnerLogin() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [errorClose, setErrorClose] = useState(false)
  const [password, setPassword] = useState("")
  const adminsLogin = useSelector(state => state.ownerLogin)
  const { loading,error, ownerInfo } = adminsLogin
  const dispatch = useDispatch();
  

  useEffect(()=> {
    if(ownerInfo){
        navigate('/owner')
    }
  },[ownerInfo])

  const submitHandler = async(e) =>{
    e.preventDefault()
    
    dispatch(ownerLogin(email,password))
  }

  return (
    <>
      {/* <OwnerHeader />  */}
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden px-10 " >
            <div className='flex items-center justify-center bg-cover'>
                <h1 className=" py-2 rounded-lg w-48 font-LobsterTwo text-3xl mt-24 text-center text-black">
                    <span className='font-Squada font-bold text-red-500'>E</span>xplore<span className='font-Squada font-bold text-red-500'>K</span>erala
                </h1>
            </div>
            <div className="w-full p-10 m-auto bg-white rounded-md shadow-xl drop-shadow-2xl  lg:max-w-xl opacity-100">
                <h1 className="text-3xl font-bold text-center text-red-600 uppercase">
                   Login To Our Team
                </h1>
                {error && <OwnerError open={errorClose} onClose={()=>setErrorClose(!errorClose)} message={error}>{error}</OwnerError>}
                {loading && <OwnerLoading />}
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
                    <a
                        href="#"
                        className="text-xs text-purple-600 hover:underline"
                    >
                        Forget Password?
                    </a>
                    <div className="mt-6">

                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-950 rounded-md hover:bg-purple-900 focus:outline-none focus:bg-purple-900">
                            Login
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-700">
                    {" "}
                    Don't have an account?{" "}
                    <Link
                        to="/owner/signup"
                        className="font-medium text-purple-600 hover:underline"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
        <OwnerFooter />
    </>
  )
}

export default OwnerLogin
