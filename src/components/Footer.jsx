import React from 'react'

import Logo from './Logo'

function Footer() {
  return (
    <footer className="footer w-[100%] bg-[#2D2F31] text-white items-center bg-neutral text-neutral-content z-50 relative ">

      <div className='flex border-b border-slate-600 px-12 py-5 gap-9'>
        <h1 className='w-[45%] text-lg font-bold '>Top companies choose <span className='text-[#C0C4FC]'>Brainy Path</span> to build in-demand career skills.</h1>
        <div className='w-[50%] flex justify-between items-center h-10'>
          <img src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg" alt="" />
          <img src="https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg" alt="" />
          <img src="https://s.udemycdn.com/partner-logos/v4/box-light.svg" alt="" />
          <img src="https://s.udemycdn.com/partner-logos/v4/netapp-light.svg" alt="" />
          <img src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg" alt="" />
        </div>
      </div>

      <div className='px-12 py-8'>

        <div className='flex gap-32 pb-16 text-sm'>
          <ul className='space-y-1'>
            <li>Make Brainy Business</li>
            <li>Teach on Brainy</li>
            <li>Get the app</li>
            <li>About us</li>
            <li>Contact us</li>
          </ul>

          <ul className='space-y-1'>
            <li>Careers</li>
            <li>Blog</li>
            <li>Help and Support</li>
            <li>Affiliate</li>
            <li>Investors</li>
          </ul>

          <ul className='space-y-1'>
            <li>Terms</li>
            <li>Privacy policy</li>
            <li>Cookie Setting</li>
            <li>Sitemap</li>
            <li>Accessibility statement</li>
          </ul>

          <h1 className='text-left  h-[100%] mt-20 ml-36'>© 2024 Brainy Path, Inc.</h1>

        </div>

        <Logo />

      </div>


    </footer>
  )
}

export default Footer
