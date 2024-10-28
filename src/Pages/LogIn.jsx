import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { isValidPassword } from '@/Helpers/regexMatcher'
import HomeLayout from '@/Layouts/HomeLayout'
import { createAccount, login, sendVerifytoken } from '@/Redux/Slices/AuthSlice'

function LogIn() {
    
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",        
    })


    function handleUserInput(e){
        const {name, value} = e.target ;
        setData({...data, [name] : value });       
    }
    
    async function signUp(){
        const {email, password} = data;

        if( !email || !password ){
            toast.error("all fields are required");
            return;
        } 

        

        const res = await dispatch( login(data) );

        if(res?.payload?.success){
            
            
             navigate("/")
        }
        




    }

    return (
        <HomeLayout>

            <div className='flex items-center justify-center h-[84.6vh]'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <h1 className='font-semibold text-2xl'> Log in to your account </h1>
                        
                    </CardHeader>
                    <CardContent>
                        <form >
                            <div className="grid w-full items-center gap-4">
                                
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" type={"email"} className={"px-4 rounded-md"} id="email" placeholder="" onChange={handleUserInput} value={data.email} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Password</Label>
                                    <Input name="password" type={"password"} className={"px-4 rounded-md"} id="password" placeholder="" onChange={handleUserInput} value={data.password} />
                                </div>
                                
                                
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button onClick={signUp} className={"w-[100%] bg-blue-500 hover:bg-blue-700"}>LogIn</Button>
                    </CardFooter>
                </Card>
            </div>

        </HomeLayout>
    )
}

export default LogIn
