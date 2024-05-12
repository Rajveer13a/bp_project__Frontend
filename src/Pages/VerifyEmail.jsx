import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"
import HomeLayout from '@/Layouts/HomeLayout'
import { verifyAccount } from '@/Redux/Slices/AuthSlice'


function VerifyEmail() {

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const data = useSelector( (state)=> state.auth.data );
    
   const [value, setValue] = React.useState("")

    if( value.length ===6 ){
        console.log("here");
        (async()=>{
          const res = await dispatch(verifyAccount(value));

        if(res?.payload?.success){

          navigate('/')

        }
        })()
    }   


  return (
    <HomeLayout>
     <div className='h-[80vh] flex items-center justify-center'>
     <Card className="w-[400px] h-[350px]">
      <CardHeader className={"text-center"}>
        <CardTitle className={"text-[26px] "}>Email Verificaiton</CardTitle>
        <CardDescription className={"text-[17px]"}>We have sent a code to your email <a className='text-blue-500 hover:underline'>{data?.email}</a></CardDescription>
      </CardHeader>
      <CardContent>
       
      <div className="space-y-2 flex-col">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <InputOTPGroup className={"pl-[2.5%]"}>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-center text-sm">
        
         Enter your one-time password.
        
      </div>
    </div>

      </CardContent>
      <CardFooter className="flex">
      Didn't recieve code? 
        <Button variant="link" className="m-0 p-0 text-blue-500 hover:text-blue-700 ">Resend</Button>

      </CardFooter>
    </Card>
     </div>
    </HomeLayout>
  )
}

export default VerifyEmail
