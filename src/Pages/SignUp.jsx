import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { isValidPassword } from '@/Helpers/regexMatcher'
import HomeLayout from '@/Layouts/HomeLayout'
import { createAccount, sendVerifytoken } from '@/Redux/Slices/AuthSlice'

function SignUp() {
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        confirmpassword: "",
        username:""
        
    })


    function handleUserInput(e){
        const {name, value} = e.target ;
        setData({...data, [name] : value });       
    }
    
    async function signUp(){
        const {email, password, confirmpassword, username } = data;

        if( !email || !password || !confirmpassword || !username){
            toast.error("all fields are required");
            return;
        } 

        if( username.length < 4  ){
            toast.error("Full Name should be of at least 4 characters");
            return;
        }

        if(! isValidPassword(password) ){
            toast.error(" Password does not met criteria");
            return;
        }

        if( password != confirmpassword ){
            toast.error("password and confirm password does not match");
            return;
        }

        const res = await dispatch( createAccount(data) );

        if(res?.payload?.success){
            
            await dispatch(sendVerifytoken());
            
             navigate("/verifyEmail")
        }
        




    }

    return (
        <HomeLayout>

            <div className='flex items-center justify-center h-[84.6vh]'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <h1 className='font-semibold text-2xl'> Create an account </h1>
                        
                    </CardHeader>
                    <CardContent>
                        <form >
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Username</Label>
                                    <Input name="username"  className={"px-4 rounded-md"} id="name" placeholder="" onChange={handleUserInput} value={data.username} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" type={"email"} className={"px-4 rounded-md"} id="email" placeholder="example@gmail.com" onChange={handleUserInput} value={data.email} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" type={"password"} className={"px-4 rounded-md"} id="password" placeholder="" onChange={handleUserInput} value={data.password} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="confirmpassword">Confirm Password</Label>
                                    <Input name="confirmpassword" type={"password"} className={"px-4 rounded-md"} id="confirmpassword" placeholder="" onChange={handleUserInput} value={data.confirmpassword} />
                                </div>
                                
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button onClick={signUp} className={"w-[100%]"}>Create account</Button>
                    </CardFooter>
                </Card>
            </div>

        </HomeLayout>
    )
}

export default SignUp
