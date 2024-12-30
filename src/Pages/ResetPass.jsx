import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';

import { isValidPassword } from '@/Helpers/regexMatcher';
import { resetPassword } from '@/Redux/Slices/AuthSlice';

import { InputField } from './LogIn'

function ResetPass() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { token } = useParams();

    const [data, setData] = useState({
        password: "",
        confirmPassword: "",
    })

    const handleUserInput = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    }

    const onResetPassword = async (e) => {

        e.preventDefault();

        if (data.password !== data.confirmPassword) {
            toast.error("password aand confirm password does not match");
            return;
        }

        if (!isValidPassword(data.password)) {
            toast.error(" Password does not met criteria");
            return;
        }

        const res = await dispatch(resetPassword({ token, newPassword: data.password }));

        if (res.payload) {
            toast.success("password reset successfully")
            navigate("/login");
        }

    }

    return (
        <div>


            <div className='flex  p-10 max-w-[100vw] overflow-hidden'>


                <img className='size-[50%] ' src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x2.webp" alt="" />

                <form onSubmit={onResetPassword} className='w-[50vw] flex items-center justify-center h-[70vh]  '>

                    <div className='space-y-4 w-[70%]'>

                        <h1 className='text-3xl font-bold text-center py-4'>Reset Password</h1>

                        <InputField name={"password"} onChange={handleUserInput} value={data.password} title={"Password"} />

                        <div>
                            <InputField value={data.confirmPassword} name={"password"} onChange={(e) => {
                                const { value } = e.target;
                                setData({ ...data, "confirmPassword": value });
                            }} title={"Confirm Password"} />

                            <p className="text-xs text-gray-600 mt-2"> Your password must be at least <span className="font-bold">8 characters</span> long and include at least <span className="font-bold"> one uppercase letter</span>, <span className="font-bold"> one lowercase letter</span>, <span className="font-bold"> one number</span>, and <span className="font-bold"> one special character</span> (e.g., <span className="text-red-600">#</span>, <span className="text-red-600">?</span>, <span className="text-red-600">!</span>, <span className="text-red-600">@</span>, <span className="text-red-600">$</span>, <span className="text-red-600">%</span>, <span className="text-red-600">^</span>, <span className="text-red-600">&</span>, <span className="text-red-600">*</span>, or <span className="text-red-600">-</span>). </p>
                        </div>

                        <button className='w-[20%] rounded-md text-white bg-slate-900 hover:bg-slate-800 duration-150 py-3 font-bold mt-2'>Submit</button>


                    </div>

                </form>

            </div>


        </div>
    )
}

export default ResetPass
