import React from 'react'
import { Link } from 'react-router-dom'

function OwnerErrorComponent() {
  return (
    <div className="gradient text-white min-h-screen flex items-center">
            <div className="container mx-auto p-4 flex flex-wrap items-center">
                <div className="w-full md:w-5/12 flex lg:justify-end md:justify-center p-4">
                <img width={400} height={330} src="http://res.cloudinary.com/dp7ydtvg8/image/upload/v1690605263/xoo3b7gpboxavxjffhxb.png" alt="Not Found" />
                </div>
                <div className="w-full md:w-7/12 text-center md:text-left p-4">
                <div className="text-6xl font-medium">404</div>
                <div className="text-xl md:text-3xl font-medium mb-4">
                    Oops. This page has gone missing.
                </div>
                <div className="text-lg mb-8">
                    You may have mistyped the address or the page may have moved.
                </div>
                <Link to='/owner' className='border font-semibold border-white rounded p-4 hover:bg-white hover:text-black' >Go Home</Link>
                </div>
            </div>
    </div>
  )
}

export default OwnerErrorComponent
