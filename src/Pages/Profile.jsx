import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import HomeLayout from '@/Layouts/HomeLayout'
import { updateUsername } from '@/Redux/Slices/AuthSlice'

function Profile() {

    const dispatch = useDispatch();

    const userdata = useSelector((state)=> state.auth.data);

    const [ButtonDisabled , setButtonDisabled] = useState(true);

    const [data, setData] = useState({
        username: userdata.username,
        email: userdata.email
    })

    ;

    function handleUserInput(e){
        const {name, value } = e.target;
        

        setData({
            ...data,
            [name]:value
        })

        if(value!= userdata.username){
            setButtonDisabled(false);

        }else{
            setButtonDisabled(true);           
        }


    }

    async function onSave(){

        const res =  await dispatch(updateUsername(data.username));
        
        if(res.payload){
            setButtonDisabled(true)
        }
       
    }

  return (

    <HomeLayout>
        <div className='flex items-center justify-center h-[84.6vh] text-xl'>
                <Card className="w-[650px]">
                    <CardHeader>
                        <h1 className='font-semibold text-2xl'> Profile</h1>
                        
                    </CardHeader>
                    <CardContent>
                        <form >
                            <div className="grid w-[80%] items-center gap-4">
                                
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" type={"email"} className={"px-4 rounded-md  disabled:opacity-70"} id="email" value={data.email} disabled />
                                </div>
                                
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Username</Label>
                                    <Input name="username" type={"text"} className={"px-4 rounded-md"} id="name" value={data.username} onChange={handleUserInput}  />
                                </div>
                                
                                
                                
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex ">
                        <Button onClick={onSave} className={"w-[20%] ml-[10px] bg-slate-800 hover:bg-slate-700 disabled:bg-slate-600"} disabled={ButtonDisabled}>Save</Button>
                    </CardFooter>
                </Card>
            </div>
    </HomeLayout>

  )
}

export default Profile
