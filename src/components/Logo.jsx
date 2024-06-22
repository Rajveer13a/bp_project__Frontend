import React from 'react'
import { BsBing } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function Logo() {
  return (
    <Link to={"/"}>
      <div className='text-2xl font-semibold flex items-center'>
      <BsBing className=' text-blue-600 ' />
        rainyPath
      </div>
    </Link>
  )
}

export default Logo
