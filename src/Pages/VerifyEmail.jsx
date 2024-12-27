import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

import HomeLayout from '@/Layouts/HomeLayout'
import { accountState, sendVerifytoken, verifyAccount } from '@/Redux/Slices/AuthSlice'


const OtpInput = ({ otp, setOpt }) => {

  const inputRefs = useRef([]);

  const onUserInput = (e) => {
    let { name, value } = e.target;
    name = parseInt(name);

    if (!/^\d*$/.test(value)) return;

    setOpt(prevOtp => {
      const newOtp = [...prevOtp];
      newOtp[name] = value

      return newOtp
    })

    if (value) name != otp.length - 1 ? inputRefs.current[name + 1].focus() : inputRefs.current[name].blur();

  }

  const onKeyDown = (e) => {
    const { name } = e.target;
    const index = parseInt(name);

    if (e.key === "Backspace" && otp[index] === "") {
      index !== 0 && inputRefs.current[index - 1].focus();
    }
  };



  return <div className='flex gap-4 font-normal text-lg'>

    {
      otp.map((val, indx) => <input onKeyDown={onKeyDown} ref={el => (inputRefs.current[indx] = el)} key={indx} onChange={onUserInput} type="text" maxLength={1} name={indx} value={otp[indx]} className='size-12 p-4 rounded-sm bg-[#EFF0F4]' />)
    }


  </div>

}

function VerifyEmail() {

  const verifiedStatus = useSelector((state) => state.auth.data.verifiedStatus);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const data = useSelector((state) => state.auth.data);

  const [otp, setOpt] = useState(new Array(6).fill(""));

  const [tokenexpiry, setTokenExpiry] = useState(null);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hr: 0,
    min: 0,
    sec: 0
  })

  const countDown = () => {
    const date = new Date(tokenexpiry);

    const curr = new Date();
    const diff = (date - curr) / 1000;

    if(diff <= 0 ) setTokenExpiry(null);

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
    const intervalId =  setInterval(() => {
      countDown()
    }, 1000)

    return () => clearInterval(intervalId);

  }, [tokenexpiry])



  const submitOtp = async () => {

    const reducedOtp = otp.reduce((acc, curr) => acc + curr, "");

    if(reducedOtp.length != 6) return;

    const res = await dispatch(verifyAccount(reducedOtp));

    if (res?.payload?.success) {
      dispatch(accountState())

      navigate('/')

    }

  }


  const getVerifyToken = async () => {

    const res = await dispatch(sendVerifytoken());

    if (!res.payload.success) {

      setTokenExpiry(res.payload.data.tokenexpiry);
      // localStorage.setItem('verificationCountdown', res.payload.data.tokenexpiry)

    }else{
      setOpt(new Array(6).fill(""));
    }

  }



  return (
    <div className='flex items-center justify-center py-14 bg-gray-50'>

      {
        !tokenexpiry ? (
          <div className='bg-white border shadow-2xl space-y-5 px-14 py-9 rounded-md select-none'>
            <h1 className='text-3xl font-bold text-center'>Email Verification</h1>
            <h3>We’ve sent a verification code to your email <Link className='link-primary underline'>{data?.email}</Link></h3>

            <div className='space-y-2 flex flex-col items-center'>
              <OtpInput otp={otp} setOpt={setOpt} />
              <h3 className='text-sm text-center'>Please enter your one-time password.</h3>
            </div>


            <div className='space-y-2'>
              <button onClick={submitOtp} className={`duration-200 font-bold text-white w-full py-3 text-lg ${otp.reduce((acc, curr) => acc + curr, "").length == 6 ? "bg-blue-700 hover:bg-blue-800 " : "bg-blue-700 opacity-60 cursor-not-allowed"}`}>Verify Email</button>

              <h2 className='text-sm text-center'>Haven't received the code? <button onClick={getVerifyToken} className='link-primary underline underline-offset-2'>Request a new one</button></h2>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center h-[50vh] ">

  <div className="bg-white border border-gray-300 w-[50vw] px-8 py-6 space-y-6 rounded-lg shadow-lg">

    <h1 className="text-4xl text-center font-semibold text-gray-800">Too Many Attempts</h1>

    <h3 className="text-sm text-center text-gray-600">
      A verification email has already been sent to{" "}
      <span className="link-primary underline font-semibold">{data?.email}</span>. 
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

</div>

        )
      }
    </div>

  )
}

export default VerifyEmail
