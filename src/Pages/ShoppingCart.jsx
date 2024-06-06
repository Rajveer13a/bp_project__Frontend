import React from 'react'

import Rating from '@/components/Rating'
import HomeLayout from '@/Layouts/HomeLayout'
import { Button } from '@/components/ui/button'

const dot = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
</svg>

const tag = <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-tag-fill mt-1" viewBox="0 0 16 16">
    <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
</svg>

function ShoppingCart() {



    return (
        <HomeLayout>

            <div className='pt-8 pl-12'>

                <h1 className='text-4xl font-bold'>
                    Shopping Cart
                </h1>

                <div className='flex '>

                    <div className='py-8 flex w-[70%]'>
                        <img className='h-20' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtA4W-HNaYtjVqDaaQOm68HTM4dJap2GxM4w&s" alt="" />

                        <div className='px-10 font-bold text-lg w-[55vw] '>
                            Complete Web Application Hacking & Penetration Testing
                            <br />
                            <h5 className='text-sm font-medium'>
                                By Tyson
                            </h5>
                            <h5 className='flex items-center text-sm font-medium'>
                                4.5 <Rating className={'w-20'} />
                                (1,122 ratings)
                            </h5>
                            <h5 className='flex items-center text-sm font-medium'>
                                9 total hours
                                {dot}
                                93 lectures
                                {dot}
                                All Levels
                            </h5>



                        </div>

                        <div className='text-blue-600  '>
                            <ul className='space-y-2 text-nowrap cursor-pointer '>
                                <li className='hover:text-blue-950'>Remove</li>
                                <li className='hover:text-blue-950'>Save for Later</li>
                                <li className='hover:text-blue-950'>Move to Whislist</li>
                            </ul>
                        </div>

                        <div className='text-blue-600 text-xl font-bold flex item space-x-2'>
                            <p>₹3,099 </p> {tag}
                        </div>

                    </div>

                    <div className='w-[30%] pl-10 flex flex-col space-y-2'>
                        <h1 className='text-xl font-bold text-[#6A6F73]'> Total: </h1>

                        <h1 className='text-3xl font-bold'> ₹3,099 </h1>

                        <Button className='w-[80%] bg-blue-600 rounded-none hover:bg-blue-700  text-lg h-10' >Checkout</Button>

                    </div>

                </div>

            </div>

        </HomeLayout>
    )
}

export default ShoppingCart
