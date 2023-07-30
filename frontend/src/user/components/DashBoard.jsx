import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Selection from './Selection'
import { getBanners, getDestination, getDestinationNames, getDestinationProperties } from '../../api/UserAPI';
import TokenExpireModal from './TokenExpireModal';
import { elements } from 'chart.js';
import { ImSearch } from "react-icons/im"
import ImageSlider from './ImageSlider';



function DashBoard() {
  const navigate = useNavigate();
  const [bannerData, setBannerData] = useState([])
  const [destinations,setDestinations] = useState([])
  const [filterDestination,setFilterDestination] = useState('')
  const [fileterError, setFilterError] = useState('')
  const userInfo = localStorage.getItem('userInfo')
  const [errorCatch, setErrorCatch]= useState('')
  const [destNames, setDestNames] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [focusOn, setFocusOn] = useState(false)
  const [searchError, setSearchError] = useState('')

  useEffect(()=>{
    async function getBanner(){
      try {
        const userInfo = localStorage.getItem('userInfo')
        if(userInfo){
          const banners = await getBanners
          if(banners){
              setBannerData(banners.data.bannerdata)
          }
        }
      } catch (error) {
          if(error?.response?.data?.message === 'jwt expired'){
            localStorage.removeItem('userInfo')
            setErrorCatch(error.response.data.message)
          }
      }
     }
      getBanner()
      async function getDestinations(){
        const userInfo = localStorage.getItem('userInfo')
        if(userInfo){
          const {data} = await getDestination()
          if(data){
              setDestinations(data.destinationdata)
          }
        }
      }
    getDestinations()
  },[userInfo])

  const getDestNames = async ()=>{
    try {
        const { data} = await getDestinationNames()
        if(data){
            setDestNames(data.nameArray)
        }
    } catch (error) {
        if(error.response.data.message === 'jwt expired'){
            localStorage.removeItem('userInfo')
            setErrorCatch(error.response.data.message)
        }
    }
 }
 getDestNames()
  
  const exploreSubmit = async(destination)=>{
    if(destination === ''){
      setFilterError("Select a destination")
    }else if(!destNames.includes(destination)){
       setSearchError('No Such Destination Exists')
    }else{
      try {
        const {data} = await getDestinationProperties(destination)
        if(data){
          navigate('/showdestinationproperties',{state:data.combinedArray})
        }
      } catch (error) {
        if(error.response.data.message === 'jwt expired'){
          localStorage.removeItem('userInfo')
          setErrorCatch(error.response.data.message)
        }
      }
    }
}

const handleInputFocus = () => {
  setFocusOn(true);
};
const handleInputBlur = () => {
  // Delay hiding the suggestions to allow selecting a suggestion
  setTimeout(() => {
    setFocusOn(false);
  }, 200);
};

const handleSuggestionClick = async(value) => {
   setSearchTerm(value);
  setFocusOn(false);
};


  const slides = [
    bannerData.map((element)=>(
        {url:element.image, heading:element.heading, description: element.description}
    ))
  ]
const containerStyle = {
    width: 'full',
    height:'500px',
    margin: '0 auto'
}
  return (
    <>  
        
        <header className='w-screen h-96 relative'>
              
              <div className='absolute top-0 left-0 w-full h-full '></div>
              <div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center text-center mt-20 mb-32'>
                <h1 className='text-[#ffffff] font-bold text-lg' >First Class Travel</h1>
                <h2 className='text-[#ffffff] font-semibold mb-4 '>Top 1% Locations Worldwide</h2>
                <form
                  className='flex border p-1 rounded-md font-bold text-[#1e1b4b] bg-gray-100/90 max-w-[700px] w-[80%] mx-auto'
                >
                  <input
                    type='text'
                    placeholder='Search Destinations'
                    className='grow bg-transparent outline-none p-2'
                    onChange={(e)=>setSearchTerm(e.target.value)}
                    value={searchTerm}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                  />
                  {searchTerm === '' ?
                     <ImSearch size={25} onClick={()=>exploreSubmit(searchTerm)} className='my-auto mr-2'/>
                   :
                      <ImSearch size={25} color='red' onClick={()=>exploreSubmit(searchTerm)} className='my-auto mr-2'/>
                  }
                </form>
                  {focusOn && 
                  <>
                    {destNames.filter((val)=>{
                       if(searchTerm === ''){
                          return val
                       }else if(val.toLowerCase().includes(searchTerm.toLocaleLowerCase())){
                          return val
                       }
                    }).map((element,index)=>(
                        <div key={index} className='flex border p-1 rounded-sm font-semibold text-[#1e1b4b] hover:bg-blue-950 hover:text-white bg-gray-100/90 max-w-[700px] w-[80%] mx-auto' onClick={() => handleSuggestionClick(element)}>
                          <p className='ml-2 ' onClick={() => handleSuggestionClick(element)}>{element}</p> <br/>
                        </div>
                    ))}
                  </>
                  }
                  {searchError &&
                      <p className='text-red-600 text-lg font-semibold'>{searchError}</p>
                  }
              </div>
            </header>
            
            <div className='flex justify-center'>
                <section className='container lg:px-40  text-center px-4 my-20 grid gap-2 sm:grid-cols-3 sm:grid-rows-2'>
                      {destinations.map((element,index)=>(
                         <Selection key={index} image={element.image} caption={element.destination} />
                      ))}
                </section>
              </div>

              <section className='container  lg:px-40  px-4 pt-14 my-20 mx-auto' style={{ ...containerStyle, marginTop: '40px' }}>
                  <ImageSlider slides={slides[0]}/> 
              </section>

              <section className='container  lg:px-40  px-4 pt-14 my-20 mx-auto grid gap-8 md:grid-cols-3'>
                <div className='md:col-span-2'>
                  <h3 className='uppercase font-extrabold mb-4 text-white'>
                    luxury included vacations for tow people
                  </h3>
                  <p className='mb-10  text-justify text-white'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut assumenda
                    soluta eum, voluptatem dolorem nostrum vitae. Vitae veniam ad, ipsam,
                    itaque consectetur nemo quis quasi libero quam in harum sed aut ex
                    doloremque consequuntur? Sed optio consectetur placeat non tempore.
                    Placeat omnis molestias perferendis magni ipsum eveniet ad esse dicta
                    accusamus pariatur adipisci, culpa soluta veniam repellendus
                    consequuntur cum debitis!
                  </p>
                  <div className='flex flex-col sm:flex-row'>
                    <div className='text-center'>
                      <h4 className='uppercase font-extrabold mb-2 text-white'>leading service</h4>
                      <p className='uppercase  text-white'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                    <div className='text-center'>
                      <h4 className='uppercase font-extrabold mb-2 text-white'>automated booking</h4>
                      <p className='uppercase  text-white'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='border-2 px-4 py-4 uppercase text-center text-white'>
                    <p className='py-2'>get an additional 10% off</p>
                    <p className='py-2'>12 hours left</p>
                    <p className='py-2 text-white bg-black cursor-pointer'>
                      book now and save
                    </p>
                  </div>
                  <form action='' className=''>
                    <div className='my-4'>
                      <label htmlFor='destination' className=' text-white'>Destination</label>
                      <select
                        name='destinations'
                        id='destination'
                        className='block w-full p-2 border rounded'
                        onChange={(e)=>setFilterDestination(e.target.value)}
                      >    
                          <option value='' >Select One destination</option>
                       {destinations.map((element,index)=>(
                           <option value={element.destination} key={index}>{element.destination}</option>
                       ))}
                        
                        
                      </select>
                    </div>
                    <div className="my-4">
                         {fileterError &&
                            <p className='text-red-500'>{fileterError}</p>
                         }
                        <p onClick={()=>exploreSubmit(filterDestination)} className='py-2 text-white text-center p-7 bg-black hover:bg-gray-700 cursor-pointer'>
                          book now and save
                        </p>
                    </div>
                    
                  </form>
                </div>
              </section>
              
            




        {errorCatch !== '' &&
          <TokenExpireModal message={errorCatch} />
        }
        
    </>
  )
}

export default DashBoard
