import React from 'react'

function HoverMenu({title, list, children, className, type}) {
  
  return (
    <div className={` ${className} `}>
      
      <div className={`dropdown ${type} dropdown-hover h-[100%] `}>
  <div tabIndex={0} role="button" className="m-1 whitespace-nowrap hover:text-blue-600 h-[180%]"> {title || "menu"} </div>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 top-[65px] ">

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

  
