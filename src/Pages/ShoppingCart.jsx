import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import Rating from '@/components/Rating'
import { Button } from '@/components/ui/button'
import HomeLayout from '@/Layouts/HomeLayout'
import { getConfig, updateCart } from '@/Redux/Slices/UserConfigSlice'

const dot = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dot" viewBox="0 0 16 16">
    <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
</svg>

const tag = <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-tag-fill mt-1" viewBox="0 0 16 16">
    <path d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
</svg>

function ShoppingCart() {

    const dispatch = useDispatch();

    const {cart , total} = useSelector( (state)=> state.config );

    const cartLength = cart?.length;

    async function removeFromCart(id){
        await dispatch(updateCart([
            {
                remove: id
            }
        ]));
        dispatch(getConfig())
    }
    

    
    useEffect(()=>{
        dispatch(getConfig())
    }, [])

    


    return (
        <HomeLayout>

            <div className='pt-8 pl-12 min-h-[85vh]'>

                <div>
                <h1 className='text-4xl font-bold mb-6'>
                    Shopping Cart
                </h1>
                <h5 className='text-lg font-bold border-b-2 pb-3 w-[70%]'> {cartLength} Course in Cart </h5>
                </div>

                <div className=''>

                    {
                        cart ? cart.map( (item,indx)=>{
                            
                            return(
                                <div key={indx} className='pt-8 flex w-[70%] border-b-2 h-[190px]'>
                        <img className='h-20' src={item.thumbnail.secure_url} alt="" />

                        <div className='px-10 font-bold text-lg w-[55vw]'>
                            {item.title}
                            <br />
                            <h5 className='text-sm font-medium'>
                                {item.instructor.username}
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
                                <li onClick={()=>removeFromCart(item._id)} className='hover:text-blue-950'>Remove</li>
                                <li className='hover:text-blue-950'>Save for Later</li>
                                <li className='hover:text-blue-950'>Move to Whislist</li>
                            </ul>
                        </div>

                        <div className='text-blue-600 text-xl font-bold flex item space-x-2'>
                            <p>₹{item.price} </p> {tag}
                        </div>

                    </div>
                            )
                        } ) : ""
                    }

                    <div className='w-[26%] pl-10 absolute top-48 right-7'>
                        
                        <div className='flex flex-col space-y-2  border-b-2 pb-4'>
                            <h1 className='text-xl font-bold text-[#6A6F73]'> Total: </h1>

                        <h1 className='text-3xl font-bold'> ₹{total || total} </h1>

                        <Button className=' bg-blue-600 rounded-none hover:bg-blue-700  text-lg h-10' >Checkout</Button>
                        </div>
                        
                        <h5 className='font-bold mt-4 mb-4'>Promotions</h5>

                        <div className='flex'>
                        <input className='border-[1px] placeholder-slate-500 border-black h-8 pl-3 focus:outline-none ' type="text" placeholder='Enter Coupon' />
                        
                        <Button className='bg-blue-600 rounded-none hover:bg-blue-700  text-lg h-8'>Apply</Button>
                        </div>
                        

                    </div>

                </div>

            </div>

        </HomeLayout>
    )
}

export default ShoppingCart
