import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { GoDotFill } from 'react-icons/go'
import { HiMiniTag } from "react-icons/hi2";
import { RxCross1 } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import Rating from '@/components/Rating'
import { getUser } from '@/Redux/Slices/AuthSlice'
import { createOrder, verifyPayment } from '@/Redux/Slices/PaymentSlice'
import { getConfig, updateCart, updateFavourite } from '@/Redux/Slices/UserConfigSlice'

const Card = ({ data, removeFromCart, moveToWhislist }) => {
    return (
        <Link to={`/course/${data?._id}`} className='flex gap-4 border-t py-4 border-slate-300'>

            <div className='h-[72px] w-32 '>
                <img className='object-cover h-full w-full' src={data?.thumbnail?.secure_url} alt="" />
            </div>

            <div className='w-[50%] space-y-1'>
                <h2 className='font-bold'>{data?.title}</h2>
                <h5 className='text-xs'>By {data?.instructor?.username}</h5>
                <div className='flex text-sm gap-1 items-center font-bold'> 4.7 <Rating total={4.7} flag={false} /> <span className='text-xs text-slate-600 font-normal'>(2,051 ratings)</span></div>
                <div className='text-xs text-slate-600 flex items-center gap-[2px]'>19.5 total hours <GoDotFill /> 263 lectures <GoDotFill /> {data?.level} levels</div>
            </div>

            <div className='duration-150 text-sm space-y-3 py-2 text-[#A435F0] font-medium '>
                <button onClick={(e) =>{ e.preventDefault(); e.stopPropagation(); removeFromCart(data?._id)}} className='block hover:text-blue-900 ml-auto'>Remove</button>
                <button className='block hover:text-[blue-900] ml-auto'>Save for Later</button>
                <button onClick={(e)=> { e.preventDefault(); e.stopPropagation(); moveToWhislist(data) }} className='block hover:text-blue-900 ml-auto'>Move to Whislist</button>
            </div>

            <div className='ml-auto mr-2'>
                <h3 className='font-bold text-[#A435F0] text-lg flex gap-1 items-center'>₹{data?.price} <HiMiniTag /> </h3>
                <h3 className='line-through text-[#6A6F73]'>₹{(data?.price * 100) / 20}</h3>
            </div>


        </Link>
    )
}

function ShoppingCart() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { cart, total } = useSelector((state) => state.config);

    const userdata = useSelector((state) => state.auth.data)

    const cartLength = cart?.length;

    const onVerifySuccess = async(response) => {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature)

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        const res = await dispatch(verifyPayment({
            payment_id: razorpay_payment_id,
            order_id: razorpay_order_id,
            signature: razorpay_signature
        }));

        if (res.payload.success) {
            await dispatch(getConfig())
            await dispatch(getUser());
            navigate('/mylearning')
        }
    }

    const onFailure = async(response) =>{
        toast.error(response.error.description)
    }

    const onCheckout = async() => {
        const courses = cart?.map((value) => value?._id);

        const res = await dispatch(createOrder(courses));

        if (res?.payload?.success) {

            const { order_id, razorpay_key_id } = res.payload.data;

            console.log(order_id, razorpay_key_id);

            var options = {
                "key": razorpay_key_id, // Enter the Key ID generated from the Dashboard
                "amount": total * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": "BrainyPath", //your business name
                "description": "Course Purchase",
                "image": "https://cdn.dribbble.com/users/6681099/screenshots/15273252/media/fbde0121e08b8a60b88302f0590e015b.jpg?resize=1200x900&vertical=center",
                "order_id": order_id,
                "handler": onVerifySuccess,
                "prefill": {
                    "name": userdata.username,
                    "email": userdata.email,
                    "contact": ""
                },
                "notes": {
                    "address": "Razorpay Corporate Office"
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            var rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', onFailure);
            rzp1.open();
        }


    }

    const removeFromCart = async(id) => {
        await dispatch(updateCart([
            {
                remove: id
            }
        ]));
        dispatch(getConfig())
    }

    const moveToWhislist = async(data) => {

        await dispatch(updateFavourite([
            {
              add: data?._id
            },
            data
          ]))

        await removeFromCart(data?._id)
        
        
    }




    useEffect(() => {
        dispatch(getConfig())
    }, [])




    return (
        <>

            <div className={`px-14 py-10 space-y-8 mb-10`}>

                <h1 className='text-4xl font-bold'>Shopping Cart</h1>


                {
                    !cartLength == 0 ? (<div className='flex gap-12'>
                        <div className='w-[70%] space-y-2'>
                            <h3 className='font-bold'>{cartLength} courses in Cart</h3>

                            {
                                cart?.map((value, indx) => <Card key={indx} data={value} removeFromCart={removeFromCart} moveToWhislist={moveToWhislist} />)
                            }

                        </div>

                        <div className='flex-grow border-b '>

                            <h3 className='text-lg font-bold text-[#6A6F73]'>Total:</h3>
                            <h2 className='text-3xl font-bold mt-2'>₹{total}</h2>
                            <h3 className='line-through text-[#6A6F73]'>₹{(total * 100) / 20}</h3>
                            <h3 className=''>80% off</h3>
                            <button onClick={onCheckout} className='bg-blue-600 text-white w-full py-3 font-bold hover:bg-blue-700 duration-100 mt-3'>Checkout</button>

                            <div className='h-[0.5px] bg-slate-400 my-4'></div>

                            <h3 className='font-bold'>Promotions</h3>

                            <div className='border border-slate-300 text-[#6A6F73] p-2 text-xs flex justify-between items-center'>
                                <h4>
                                    <span className='font-bold text-sm'>BFCPSALE24</span> is applied <br />
                                    Udemy coupon
                                </h4>
                                <RxCross1 className='size-4 text-black cursor-not-allowed' />
                            </div>

                            <div className=' mt-4 h-8 flex itam-center'>
                                <input placeholder='Enter Coupon' type="text" className='w-[70%] h-full border-y border-l border-black px-3 py-1 placeholder:text-slate-500 text-sm' />
                                <button className='bg-blue-600 hover:bg-blue-700 duration-100 text-white w-[30%] h-full font-bold text-sm'>
                                    Apply
                                </button>
                            </div>

                        </div>
                    </div>) : (
                        <div>
                            <h3 className='font-bold'>{cartLength} courses in Cart</h3>

                            <div className='flex flex-col items-center justify-center w-full border-[1.5px] space-y-5 py-6 mt-2'>

                                <img className='h-48' src="https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2-2x.jpg" alt="" />

                                <h2 >Your cart is empty. Keep shopping to find a course!</h2>

                                <Link to={"/"}>
                                    <button className='bg-blue-600 text-white font-bold px-3 py-3 hover:bg-blue-800 duration-100 mt-3'>Keep shopping</button>
                                </Link>

                            </div>
                        </div>

                    )
                }


            </div>

        </>
    )
}

export default ShoppingCart
