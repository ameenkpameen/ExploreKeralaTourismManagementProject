import React, { useEffect, useState } from 'react'
import Footer from '../components/footer'
import ErrorMessage from '../components/errorMessage'
import Loading from '../components/Loading'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../actions/userActions'

function SignupPage() {
  const navigate = useNavigate()
  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [phonenumber, setPhonenumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state)=> state.userRegister)
  const {loading, error, userInfo} = userRegister

  useEffect(()=> {
    if(userInfo){
        navigate('/')
    }
  },[userInfo])

  const submitHandler = async(e)=> {
    e.preventDefault();
    if(password !== confirmpassword){
        setMessage("Passwords do not match")
    }else{
        dispatch(register(firstname,lastname,phonenumber,email,password))
    }
  }

  return (
    <div>
            <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 bg-gray-50  pb-20">
                <div className='flex items-center justify-center bg-cover'>
                    <h1 className="bg-black py-2 rounded-lg w-48 font-LobsterTwo text-3xl mt-24 text-center text-white">
                        <span className='font-Squada font-bold text-red-500'>E</span>xplore<span className='font-Squada font-bold text-red-500'>K</span>erala
                    </h1>
                </div>
                <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-xl drop-shadow-2xl sm:max-w-lg max-w-md lg:max-w-xl opacity-100 sm:rounded-lg">
                    <h1 className="text-3xl font-bold text-center text-purple-950 uppercase">
                    REGISTER HERE
                    </h1>
                    {error && <ErrorMessage message={error}>{error}</ErrorMessage>}
                    {loading && <Loading />}
                    {message && <ErrorMessage message={message}>{message}</ErrorMessage>}
                    <form className="mt-6" onSubmit={submitHandler}>
                        <div className='flex flex-wrap'>
                            <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 undefined text-center"
                                >
                                    First Name
                                </label>
                            
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        value={firstname}
                                        name="firstname"
                                        onChange={(e) => setFirstname(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 undefined text-center"
                                >
                                    Last Name
                                </label>
                            
                                <div className="flex flex-col items-start">
                                    <input
                                        type="text"
                                        name="lastname"
                                        value={lastname}
                                        onChange={(e) => setLastname(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password_confirmation"
                                className="block text-sm font-medium text-gray-700 undefined text-center"
                            >
                                Phone Number
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="number"
                                    name="phonenumber"
                                    value={phonenumber}
                                    onChange={(e) => setPhonenumber(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 undefined text-center"
                            >
                                Email
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 undefined text-center"
                            >
                                Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-700 undefined text-center"
                            >
                                Confirm Password
                            </label>
                            <div className="flex flex-col items-start">
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={confirmpassword}
                                    onChange={(e) => setConfirmpassword(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                        
                        <a
                            href="#"
                            className="text-xs text-purple-600 hover:underline"
                        >
                            Forget Password?
                        </a>
                        <div className="flex items-center mt-4">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                Register
                            </button>
                        </div>
                    </form>
                    <div className="mt-4 text-grey-600 text-center">
                        Already have an account?{" "}
                        <span>
                            <Link className="text-purple-600 hover:underline" to="/login">
                                Log in
                            </Link>
                        </span>
                    </div>
                    <div className="flex items-center w-full my-4">
                        <hr className="w-full" />
                        <p className="px-3 ">OR</p>
                        <hr className="w-full" />
                    </div>
                    <div className="my-6 space-y-2">
                        <button
                            aria-label="Login with Google"
                            type="button"
                            className="flex items-center justify-center w-full p-2 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-400 focus:ring-violet-400"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 32 32"
                                className="w-5 h-5 fill-current"
                            >
                                <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                            </svg>
                            <p>Login with Google</p>
                        </button>
                        
                    </div>
                </div>
            </div>
            <Footer />
        </div>
  )
}

export default SignupPage
