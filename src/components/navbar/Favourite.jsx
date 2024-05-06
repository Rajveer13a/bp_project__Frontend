import React from 'react'

import HoverMenu from './HoverMenu';

function Favourite({className,count}) {

    const heart = <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-heart w-[50px]" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
    </svg>;

const empty = <div className='text-center'>
<li className='font-bold text-base'> Your list is empty.</li>
<div className='w-full '>keep Exploring</div>
</div>;

return (
        
    <HoverMenu title={heart} type={"dropdown-end"} className={className}>

        {
            count == 0 ? empty : ""
        }

    </HoverMenu>

)
}

export default Favourite



