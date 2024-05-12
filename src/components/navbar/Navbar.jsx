import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Logo from '@/components/Logo'
import Cart from '@/components/navbar/Cart'
import DropMenu from '@/components/navbar/DropMenu'
import HoverCart from '@/components/navbar/HoverCart'
import HoverMenu from '@/components/navbar/HoverMenu'
import Search from '@/components/navbar/Search'
import { Button } from "@/components/ui/button"

import Favourite from './Favourite'
import ProfileButton from './ProfileButton'


const category = ["computer science", "business", "finance"];

// const teachonUdmey = ["Turn what you know into an opportunity and reach millions around the world."]

function Navbar() {

  const [searchToggle, setSearchToggle] = useState(false);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);



  return (
    <div className='flex w-[100%] h-[80px] items-center border-b border-black'>


      <div className='flex sm:hidden items-center w-[100%] justify-between'>

        <div className='flex items-center justify-between w-[56%]'>
          <DropMenu />

          <Logo className />
        </div>

        <div className='flex justify-around w-[120px] mr-[20px] '>
          <button onClick={() => setSearchToggle(true)} className="">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <Cart count={0} />
        </div>


      </div>

      {/* search */}
      {searchToggle && <div className=' flex  absolute  w-[100%] h-[] bg-white p-2 sm:hidden  '>
        <Search className={"w-[100%] "} />
        <button onClick={() => setSearchToggle(false)} className=' text-black font-semibold absolute right-5 top-4' >X</button>

        <div>

        </div>

      </div>
      }

      <div className='hidden pl-5 sm:flex w-[60%] gap-8 '>

        <Logo />

        <HoverMenu title={"Categories"} list={category} className={""} />

        <Search className={"hidden sm:flex w-[400px]"} />

      </div>


      <div className='hidden sm:flex w-[40%] justify-around '>
        <HoverMenu className={"mt-[7px]"} title={"Teach on BrainyPath "}>
          <li className='font-bold text-base'> Turn what you know into an opportunity and reach millions around the world. </li>
          <Button >Learn More</Button>
        </HoverMenu>

        {
          isLoggedIn && <HoverMenu className={"mt-[7px]"} title={"My learning"}>
            <li className='font-bold text-base '>
              No courses purchased </li>
            <Button >Go To My Learning</Button>
          </HoverMenu>
        }


        {
          isLoggedIn && <Favourite count={0} className={"mt-[10px]"} />
        }






        <HoverCart className={"mt-[8px]"} count={0} />

        {isLoggedIn ? <ProfileButton className={"mb-[4px]"} /> : <>
          <Button size="lg" variant="outline">Log in</Button>

          <Link to={"/signup"}>
            <Button size="lg" >Sign up</Button>
          </Link>
        </>}

      </div>









    </div>
  )
}

export default Navbar
