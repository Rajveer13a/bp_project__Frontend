import React from 'react'

function HoverMenu({title, list, children}) {
  return (
    <div className='text-[14.5px]'>
      
      <div className="dropdown dropdown-hover">
  <div tabIndex={0} role="button" className="m-1 hover:text-blue-600"> {title || "menu"} </div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 ">

    {list && list.map(
      (value,indx)=> <li key={indx}> <a> {value} </a>  </li>
    )}

    {children}

  </ul>
  
</div>

    </div>
  )
}

export default HoverMenu

  
