import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { editProfile } from '../../actions/userActions';

function EditProfile(props) {
    const [firstname,setFirstname] = useState(props.profileData.firstname)
    const [lastname,setLastname] = useState(props.profileData.lastname)
    const [phonenumber,setPhonenumber] = useState(props.profileData.phonenumber)
    const [email,setEmail] = useState(props.profileData.email)
    const dispatch = useDispatch()
    // const adminsLogin = useSelector(state => state.adminEditProfile)

    
    const submitHandler = async(e)=>{
        e.preventDefault();
        const id = props.profileData._id
        try {
            dispatch(editProfile(id, firstname, lastname,phonenumber, email));
            props.setEdit(false)
        
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <>
                        {/* {error && <ErrorMessage message={error}>{error}</ErrorMessage>}
                        {loading && <Loading />} */}
                      <form className="mt-6" onSubmit={submitHandler}>
                         
                          <div className='flex flex-wrap'>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-800 undefined text-center" >
                                      First Name
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input type="text" value={firstname} name="firstname" placeholder={props.profileData.firstname} onChange={(e) => setFirstname(e.target.value)} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                                  </div>
                              </div>
                              <div className="w-full md:w-1/2 mb-6 md:mb-0">
                                  <label htmlFor="name" className="block text-sm font-medium text-gray-800 undefined text-center">
                                      Last Name
                                  </label>
                              
                                  <div className="flex flex-col items-start">
                                      <input
                                          type="text" name="lastname" value={lastname} placeholder={props.profileData.lastname} onChange={(e) => setLastname(e.target.value)} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                      />
                                  </div>
                              </div>
                          </div>
                          <div className="mt-4">
                              <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-800 undefined text-center" >
                                  Phone Number
                              </label>
                              <div className="flex flex-col items-start">
                                  <input
                                      type="number" name="phonenumber" value={phonenumber} placeholder={props.profileData.phonenumber} onChange={(e) => setPhonenumber(e.target.value)} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                  />
                              </div>
                          </div>
                          <div className="mt-4">
                              <label htmlFor="email" className="block text-sm font-medium text-gray-800 undefined text-center" >
                                  Email
                              </label>
                              <div className="flex flex-col items-start">
                                  <input type="email" name="email" value={email} placeholder={props.profileData.email} onChange={(e) => setEmail(e.target.value)} className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                              </div>
                          </div>
                         
                          <div className="flex items-center mt-4">
                              <button onClick={submitHandler} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
                                  Edit
                              </button>
                          </div>
                      </form>
                      
        </>
  )
}

export default EditProfile
