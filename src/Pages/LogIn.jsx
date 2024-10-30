import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import { isValidPassword } from '@/Helpers/regexMatcher'
import HomeLayout from '@/Layouts/HomeLayout'
import { createAccount, login, sendVerifytoken } from '@/Redux/Slices/AuthSlice'


export function InputField({ value, name, onChange, title }) {

    const [visible, setVisible] = useState(name == "password" ? false : true);

    const inputRef  =useRef(null);

    const foucusInput = ()=>{
        inputRef.current.focus();
    }

    return (
        <div onClick={foucusInput} className='border border-black pt-5 px-5 relative group cursor-text'>
            <input ref={inputRef} onChange={onChange} value={value} name={name} className=' placeholder:text-slate-800 py-2 w-full outline-none ' type={visible ? "text" : "password"} />

            <h3 className={`absolute text-sm font-bold top-5 left-4 group-focus-within:-translate-y-4 group-focus-within:scale-90 transition-all group-focus-within:text-slate-700 duration-150 ${value && "-translate-y-4 scale-90 text-slate-700"}`}>{title}</h3>

            {
                (!visible && name == "password" && value) && <IoEye onClick={() => setVisible(true)} className='absolute top-7 right-4 size-5 cursor-pointer' />
            }

            {
                (visible && name == "password" && value) && <IoEyeOff onClick={() => setVisible(false)} className='absolute top-7 right-4 size-5 cursor-pointer' />
            }

        </div>
    )
}

function LogIn() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    })


    function handleUserInput(e) {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    async function onLogin() {
        const { email, password } = data;

        if (!email || !password) {
            toast.error("all fields are required");
            return;
        }



        const res = await dispatch(login(data));

        if (res?.payload?.success) {


            navigate("/")
        }





    }

    return (
        <HomeLayout>

            <div className='flex  p-10 max-w-[100vw] overflow-hidden'>

                
                    <img className='size-[50%] ' src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-2-x2.webp" alt="" />

                <div className='w-[50vw] flex items-center justify-center h-[70vh] '>

                    <div className='w-[65%] space-y-2 mt-16'>
                        <h1 className='text-3xl font-bold text-center py-4'>Log in to your Brainy <br /> account</h1>
                        
                        <InputField name={"email"} onChange={handleUserInput} value={data.email} title={"Email"} />

                        <InputField name={"password"} onChange={handleUserInput} value={data.password} title={"Password"} />

                        <div className='space-y-4'>
                            <button onClick={onLogin} className='w-full text-white bg-blue-600 hover:bg-blue-700 duration-150 py-3 font-bold mt-2'>Log in</button>

                            <h3 className='text-center'>or <Link className='link-primary font-bold underline'>Forget Password</Link></h3>

                            <div className='flex items-center text-sm text-slate-600 '><hr className='w-[30%] h-[1.5px] bg-slate-300' /><h1>Other log in options</h1><hr className='w-[30%] h-[1.5px] bg-slate-300' /></div>

                            <h2 className='text-center'>Don't have an account? <Link to={"/signup"} className='link-primary font-bold underline'>Sign up</Link> </h2>

                        </div>



                    </div>


                </div>

            </div>

        </HomeLayout>
    )
}



export default LogIn
