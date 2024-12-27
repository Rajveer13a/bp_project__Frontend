import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { isValidPassword } from '@/Helpers/regexMatcher'
import { createAccount, sendVerifytoken } from '@/Redux/Slices/AuthSlice'

import { InputField } from './LogIn'

function SignUp() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        // confirmpassword: "",
        username: ""

    })


    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    async function signUp() {
        const { email, password, confirmpassword, username } = data;

        if (!email || !password || !username) {
            toast.error("all fields are required");
            return;
        }

        if (username.length < 4) {
            toast.error("Full Name should be of at least 4 characters");
            return;
        }

        if (!isValidPassword(password)) {
            toast.error(" Password does not met criteria");
            return;
        }

        // if (password != confirmpassword) {
        //     toast.error("password and confirm password does not match");
        //     return;
        // }

        const res = await dispatch(createAccount(data));

        if (res?.payload?.success) {

            await dispatch(sendVerifytoken());

            navigate("/verifyEmail")
        }





    }

    return (
        <>

            <div className='flex  p-10 max-w-[100vw] overflow-hidden'>


                <img className='size-[50%] ' src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x2.webp" alt="" />

                <div className='w-[50vw] flex items-center justify-center h-[70vh] '>

                    <div className='w-[65%] space-y-2 mt-16'>
                        <h1 className='text-3xl font-bold text-center py-4'>Sign up and start learning</h1>

                        <InputField name={"username"} onChange={handleUserInput} value={data.username} title={"Full name"} />

                        <InputField name={"email"} onChange={handleUserInput} value={data.email} title={"Email"} />

                        <InputField name={"password"} onChange={handleUserInput} value={data.password} title={"Password"} />

                        <p className="text-xs text-gray-600 mt-2"> Your password must be at least <span className="font-bold">8 characters</span> long and include at least <span className="font-bold"> one uppercase letter</span>, <span className="font-bold"> one lowercase letter</span>, <span className="font-bold"> one number</span>, and <span className="font-bold"> one special character</span> (e.g., <span className="text-red-600">#</span>, <span className="text-red-600">?</span>, <span className="text-red-600">!</span>, <span className="text-red-600">@</span>, <span className="text-red-600">$</span>, <span className="text-red-600">%</span>, <span className="text-red-600">^</span>, <span className="text-red-600">&</span>, <span className="text-red-600">*</span>, or <span className="text-red-600">-</span>). </p>
                    
                        <div className='space-y-4'>
                            <button onClick={signUp} className='w-full text-white bg-blue-600 hover:bg-blue-700 duration-150 py-3 font-bold mt-2'>Sign up</button>

                            <h3 className='text-xs text-center'>By signing up, you agree to our <Link className='link-primary underline'>Terms of Use</Link > and <Link className='link-primary underline'>Privacy Policy.</Link></h3>



                            <h2 className='text-center'>Already have an account? <Link to={"/login"} className='link-primary font-bold underline'>Log in</Link> </h2>

                        </div>



                    </div>


                </div>

            </div>

        </>
    )
}

export default SignUp
