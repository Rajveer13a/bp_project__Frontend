import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircle } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { forgotPassword } from '@/Redux/Slices/AuthSlice';

import { InputField } from './LogIn'

function ForgotPass() {

    const dispatch = useDispatch();

    const [email, setEmail] = useState();

    const [flag, setFlag] = useState(false);

    const [tokenexpiry, setTokenExpiry] = useState(null);
    console.log(tokenexpiry);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hr: 0,
        min: 0,
        sec: 0
    })

    const onResetPassword = async () => {

        const res = await dispatch(forgotPassword({ email }));

        if (res?.payload.success) {
            setFlag(true)
        } else {
            console.log("inside");
            setTokenExpiry(res.payload.data.tokenexpiry);
        }

    }

    const countDown = () => {
        const date = new Date(tokenexpiry);

        const curr = new Date();
        const diff = (date - curr) / 1000;

        if (diff <= 0) setTokenExpiry(null);

        const days = diff / (24 * 60 * 60);
        const hr = (diff / (60 * 60)) % 24;
        const min = (diff / 60) % 60;
        const sec = (diff % 60);

        setTimeLeft(prev => ({
            ...prev,
            days: Math.floor(days),
            hr: Math.floor(hr),
            min: Math.floor(min),
            sec: Math.floor(sec)
        }))
    }

    useEffect(() => {
        if (!tokenexpiry) return;
        countDown();
        const intervalId = setInterval(() => {
            countDown()
        }, 1000)

        return () => clearInterval(intervalId);

    }, [tokenexpiry])



    return (
        <div>


            <div className='flex  p-10 max-w-[100vw] overflow-hidden'>


                <img className='size-[50%] ' src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x2.webp" alt="" />

                <div className='w-[50vw] flex items-center justify-center h-[70vh]  '>

                    {
                        tokenexpiry && <div className='w-[35vw] space-y-4'>
                            <h1 className="text-4xl text-center font-semibold text-gray-800">Too Many Attempts</h1>

                            <h3 className="text-sm text-center text-gray-600">
                                A verification email has already been sent to{" "}
                                <span className="link-primary underline font-semibold">{email}</span>.
                                If you still can't find it, please try again after:
                            </h3>

                            <div className="flex text-2xl font-bold gap-7 justify-center text-gray-700">
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl">{timeLeft.days}</span>
                                    <span className="text-sm">Days</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl">{timeLeft.hr}</span>
                                    <span className="text-sm">Hours</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl">{timeLeft.min}</span>
                                    <span className="text-sm">Minutes</span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-3xl">{timeLeft.sec}</span>
                                    <span className="text-sm">Seconds</span>
                                </div>
                            </div>

                        </div>
                    }

                    {
                        !flag && !tokenexpiry && (
                            <div className='w-[65%] mt-16 text-[#2D2F31]'>

                                <h1 className='text-3xl font-bold text-center py-4'>Forgot Password</h1>

                                <div className='space-y-4'>
                                    <h3>We’ll email you a link so you can reset your password.</h3>

                                    <InputField name={"email"} onChange={(e) => setEmail(e.target.value)} value={email} title={"Email"} />

                                    <button onClick={onResetPassword} className='w-full text-white bg-blue-600 hover:bg-blue-700 duration-150 py-3 font-bold mt-2 rounded-sm'>Reset Password</button>
                                </div>


                                <div className='bg-[#F7F9FA] w-full py-4 mt-10 text-center'>
                                    or  <Link className='link-primary underline font-bold' to={"/login"}>Log in</Link>
                                </div>

                            </div>
                        )
                    }

                    {
                        flag && !tokenexpiry && (
                            <div className='bg-[#ACD2CC] flex gap-3 p-4 rounded-2xl w-[30vw] relative bottom-14 border left-5'>

                                <IoMdCheckmarkCircle className='size-8 flex-shrink-0' />

                                <div>
                                    <h1 className='font-bold'>Reset password email sent</h1>
                                    <p className='text-sm'>You should soon receive an email allowing you to reset your password. Please make sure to check your spam and trash if you can't find the email.</p>
                                </div>
                            </div>
                        )
                    }





                </div>

            </div>


        </div>
    )
}

export default ForgotPass
