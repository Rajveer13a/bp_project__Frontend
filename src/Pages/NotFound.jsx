import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className='flex flex-col items-center py-16'>

            <div className='h-[60vh] w-[60vh]'>
                <img className='h-full w-full' src="https://s.udemycdn.com/error_page/error-desktop-2x-v1.jpg" alt="" />
            </div>

            <h1 className='merriweather-bold text-2xl w-[30vw] text-center '>We can’t find the page you’re looking for <br /> <Link to={"/"} className='link-primary font-bold text-sm '>Homepage</Link></h1>

        </div>
    )
}

export default NotFound
