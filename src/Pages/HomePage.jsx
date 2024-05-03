import React from 'react'

import HoverMenu from '@/components/HoverMenu'
import Logo from '@/components/Logo'
import Search from '@/components/Search'
import { Button } from "@/components/ui/button"

const category = ["computer science", "business", "finance"];

const teachonUdmey = ["Turn what you know into an opportunity and reach millions around the world."]

function HomePage() {
  return (
    <div className='flex items-center h-[65px] justify-between border-b '>

      <div className='flex w-[60%] justify-around'>
        <Logo />

        <HoverMenu title={"Categories"} list={category} />

        <Search />
      </div>


      <div className='flex justify-around w-[40%]'>

        <HoverMenu title={"Teach on BrainyPath "}>
          <li className='font-bold text-base'> Turn what you know into an opportunity and reach millions around the world. </li>
          <Button >Learn More</Button>
        </HoverMenu>

        <Button variant="outline">LogIn In</Button>

        <Button >Sign up</Button>

      </div>


    </div>
  )
}

export default HomePage
