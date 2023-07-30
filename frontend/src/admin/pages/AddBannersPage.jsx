import React from 'react'
import image from '../../assets/images/boat-lake-scene.jpg'
import OwnerHeader from '../components/OwnerHeader'
import OwnerFooter from '../components/OwnerFooter'
import AddBannerForm from '../components/AddBannerForm'


function AddBannersPage() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' , backdropFilter: 'opacity(0.5)' }}>
      <OwnerHeader />
         <AddBannerForm />
      <OwnerFooter />
    </div>
  )
}

export default AddBannersPage
