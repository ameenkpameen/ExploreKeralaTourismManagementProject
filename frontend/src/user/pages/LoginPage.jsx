import React, { useEffect, useState } from 'react'
import Footer from '../components/footer'
import NavbarPart from '../components/NavbarPart'
import { useNavigate,Link } from 'react-router-dom'
import Loading from '../components/Loading'
import ErrorMessage from '../components/errorMessage'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../actions/userActions'

function LoginPage() {
  const navigate = useNavigate()
  const [navbar, setNavbar] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
  const { loading,error, userInfo } = userLogin
  
  useEffect(()=> {
    if(userInfo){
        navigate('/')
    }
  },[userInfo])

  const submitHandler = async(e) =>{
    e.preventDefault()
    
    dispatch(login(email,password))
  }

  return (
    <> 
      <nav className="w-full bg-black shadow fixed inset-x-0 z-50">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                  <div>
                    <div className="flex items-center justify-between py-3 md:py-5 md:block">
                    <div className='flex items-center justify-between'>
                                
                                <h3 className="rounded-lg w-48 font-LobsterTwo text-3xl text-center text-white">
                                    <span className='font-Squada font-bold text-red-400'>E</span>xplore<span className='font-Squada font-bold text-red-400'>K</span>erala
                                </h3>
                        </div>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className="text-white hover:text-indigo-200">
                                <a href="/">Home</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="/">Blog</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="/">About US</a>
                            </li>
                            <li className="text-white hover:text-indigo-200">
                                <a href="/">Contact US</a>
                            </li>
                        </ul>

                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                        
                            Sign in
                        
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                
                
                </div>
            </div>
        </nav>
          <section >
            
                    <div className='flex items-center justify-center bg-cover'>
                        <h1 className=" py-2 rounded-lg w-48 font-LobsterTwo text-3xl mt-24 text-center text-black">
                            <span className='font-Squada font-bold text-red-500'>E</span>xplore<span className='font-Squada font-bold text-red-500'>K</span>erala
                        </h1>
                    </div>
                    <div className=" p-10 m-auto mb-20 bg-white rounded-md shadow-xl drop-shadow-2xl  lg:max-w-xl opacity-100">
                        <h1 className="text-3xl font-bold text-center text-purple-950 uppercase">
                        Please Login
                        </h1>
                        {error && <ErrorMessage message={error}>{error}</ErrorMessage>}
                        {loading && <Loading />}
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
                                to="/signup"
                                className="font-medium text-purple-600 hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </section>
            
        <Footer />
    </>
  )
}

export default LoginPage
