import React from 'react'

function SuperAdminFooter() {
  return (
    <div>
      <footer class="bg-black shadow w-full bottom-0">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <h1 className="bg-black py-2 rounded-lg w-48 font-LobsterTwo text-3xl text-center text-white">
                        <span className='font-Squada font-bold text-red-500'>E</span>xplore<span className='font-Squada font-bold text-red-500'>K</span>erala
                    </h1>
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                        </li>
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" class="hover:underline">ExploreKerala™</a>. All Rights Reserved.</span>
            </div>
        </footer>
    </div>
  )
}

export default SuperAdminFooter
