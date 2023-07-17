import React from 'react'
import NavbarPart from '../components/NavbarPart'
import Footer from '../components/footer'
import Sidebar from '../components/Sidebar'
import PlanTrip from '../components/PlanTrip'
import image from '../../../src/assets/images/pexels-lukas-rodriguez-3559235.jpg'

function PlannTrip() {
  return (
    <div className='bg-opacity-70' style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover'  }}>
      <NavbarPart />
         <Sidebar>
            <PlanTrip />
         </Sidebar>
        <Footer />
    </div>
  )
}

export default PlannTrip
