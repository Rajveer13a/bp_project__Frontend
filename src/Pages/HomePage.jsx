import React, { useState } from 'react'

import HoverCart from '@/components/HoverCart'
import DropMenu from '@/components/DropMenu'
import HoverMenu from '@/components/HoverMenu'
import Logo from '@/components/Logo'
import Search from '@/components/Search'
import { Button } from "@/components/ui/button"
import Cart from '@/components/Cart'
import { Input } from '@/components/ui/input'

const category = ["computer science", "business", "finance"];

const teachonUdmey = ["Turn what you know into an opportunity and reach millions around the world."]

function HomePage() {

   const [searchToggle, setSearchToggle ] = useState("false");


  return (
    <div className='flex w-[100%] h-[80px] items-center'>


      <div className='flex sm:hidden items-center w-[100%] justify-between'>

        <div className='flex items-center justify-between w-[56%]'>
          <DropMenu />

          <Logo className />
        </div>

        <div className='flex justify-around w-[120px] mr-[20px] '>
          <button onClick={()=> setSearchToggle(true)} className="">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <Cart count={0} />
        </div>


      </div>

    {/* search */}
    {searchToggle && <div className=' flex  absolute  w-[100%] h-[] bg-white p-2 '>
      <Search className={"w-[100%] "}/>
      <button  onClick={()=> setSearchToggle(false)} className=' text-black font-semibold absolute right-5 top-4' >X</button>

      <div>

      </div>

    </div>}

      <div className='hidden pl-5 sm:flex w-[60%] gap-8 '>

        <Logo />

        <HoverMenu title={"Categories"} list={category} className={""} />

        <Search className={"hidden sm:flex w-[400px]"} />

      </div>


      <div className='hidden sm:flex w-[40%] justify-around gap-'>
        <HoverMenu className={""} title={"Teach on BrainyPath "}>
          <li className='font-bold text-base'> Turn what you know into an opportunity and reach millions around the world. </li>
          <Button >Learn More</Button>
        </HoverMenu>

        <HoverCart className={""} count={0} />


        <Button size="lg" variant="outline">Log in</Button>

        <Button size="lg" >Sign up</Button>
      </div>









    </div>
  )
}

export default HomePage
