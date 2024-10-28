import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import HomeLayout from '@/Layouts/HomeLayout'
import { accountState, sendVerifytoken, verifyAccount } from '@/Redux/Slices/AuthSlice'


function VerifyEmail() {
  const verifiedStatus = useSelector((state)=> state.auth.data.verifiedStatus);
  
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.auth.data);

  const [value, setValue] = React.useState("")

  if (value.length === 6) {

    (async () => {
      const res = await dispatch(verifyAccount(value));

      if (res?.payload?.success) {
        dispatch(accountState())
        
        navigate('/')

      }
    })()
  }


  const [countdown, setcountdown] = useState(localStorage.getItem('verificationCountdown'));
  console.log(countdown,"countdonwn")

  const [left, setLeft] = useState({
    days: '',
    hours: "",
    minutes: "",
    seconds: "",
    diff: 0

  });
  // console.log(left.days ,left.hours, left.minutes,left.seconds)
  const getVerifyToken = async () => {

    const res = await dispatch(sendVerifytoken());

    if (!res.payload.success) {
      setcountdown(res.payload.data.tokenexpiry);
      localStorage.setItem('verificationCountdown',res.payload.data.tokenexpiry)

    }

  }

  const clock = (intervalId) => {

    const to = new Date(countdown)

    const now = new Date();

    const diff = (to - now) / 1000;

    setLeft({
      ...countdown,
      days: Math.floor(diff / (60 * 60 * 24)),
      hours: Math.floor((diff / (60 * 60)) % 24),
      minutes: Math.floor((diff / 60) % 60),
      seconds: Math.floor(diff % 60),
      diff: diff
    });
    console.log(intervalId)

    if(diff <= 0 ){
      clearInterval(intervalId)
      localStorage.removeItem('verificationCountdown')
      setcountdown(0)
    }

  }

  

  useEffect(() => {

    if (countdown !== "") {
      const intervalId = setInterval(() => {
        clock(intervalId)
      }, 1000);

    }
    

  }, [countdown])



  


  return (
    <HomeLayout>
      <div className='h-[80vh] flex items-center justify-center'>

        {
          (countdown ==0 || !countdown )? (
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
                <Button onClick={getVerifyToken} variant="link" className="ml-[4px] p-0 text-blue-500 hover:text-blue-700 ">Resend</Button>

              </CardFooter>
            </Card>
          ) : (
            <Card className="w-[400px] h-[350px]">
              <CardHeader className={"text-center"}>
                <CardTitle className={"text-[26px] "}>Too many tries</CardTitle>
                <CardDescription className={"text-[17px]"}>verifiaction mail already send to <a className='text-blue-500 hover:underline'>{data?.email}</a>, if u still can't find it please try after </CardDescription>
              </CardHeader>
              <CardContent className={"flex justify-center"}>

                <div className="space-y-2 flex-col">
                <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": left.days }}></span>
                </span>
                days
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": left.hours }}></span>
                </span>
                hours
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": left.minutes }}></span>
                </span>
                min
              </div>
              <div className="flex flex-col">
                <span className="countdown font-mono text-5xl">
                  <span style={{ "--value": left.seconds }}></span>
                </span>
                sec
              </div>
            </div>
                </div>

              </CardContent>
              <CardFooter className="flex">
                

              </CardFooter>
            </Card>
            
          )
        }


      </div>
    </HomeLayout>
  )
}

export default VerifyEmail
