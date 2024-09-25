import React, { useEffect, useState } from 'react'
import { BiLinkExternal } from "react-icons/bi";
import { MdInfo } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

import { connectBankAccount, getAccount, instructorDetails } from '@/Redux/Slices/Instructor/InstructorSlice';

function Payouts() {

    const [connected, setConnected] = useState(false);


    const dispatch = useDispatch();

    const [data, setData] = useState({
        account_number: "",
        ifsc: "",
        name: ""
    })

    console.log(data);


    const onUserInput = (e) => {
        let { value, name } = e.target;
        if (name == "name") {
            value = value.replace(/[^a-zA-Z]/g, '');
        }

        setData({
            ...data,
            [name]: value
        })
    }

    const onConnect = (e) => {
        e.preventDefault();
        dispatch(connectBankAccount(data)).then((res)=>{
            if(res?.payload){
                setConnected(true);
            }
        });


    }

    useEffect(() => {
        dispatch(getAccount()).then((res) => {
            if (res.payload) {
                setData(res.payload.data);
                setConnected(true)
            }
        });

    }, [connected])

    return (
        <div className='space-y-6'>

            <div className='space-y-4'>
                <h1 className='text-xl font-semibold'>
                    Payout Methods
                </h1>

                <div className='flex border-2 p-4 gap-4 '>
                    <MdInfo className='size-7 mt-2' />
                    <div>
                        <h3 className='font-semibold text-lg'>Choose your payout method below.</h3>
                        <p className='text-sm w-[77%]'>Connecting to a new payout method may take a few days. You won’t receive payments to the new linked account until its status is approved. <Link className='link-primary underline'>Learn more about payout methods.</Link></p>
                    </div>

                </div>
            </div>

            <h1 className='font-semibold text-lg'>{connected ? "Account Details":"Add Bank Account"}</h1>

            {connected && (
                <div>

                    <table className="min-w-[80%] table-auto border-collapse border border-gray-300 shadow-lg">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="px-6 py-3 border border-gray-300 text-left">Account Holder Name</th>
                                <th className="px-6 py-3 border border-gray-300 text-left">Account Number</th>
                                <th className="px-6 py-3 border border-gray-300 text-left">IFSC</th>
                                <th className="px-6 py-3 border border-gray-300 text-left">Bank</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr className="bg-white hover:bg-gray-100">
                                <td className="px-6 py-4 border border-gray-300">{data.name}</td>
                                <td className="px-6 py-4 border border-gray-300">{data.account_number}</td>
                                <td className="px-6 py-4 border border-gray-300">{data.ifsc}</td>
                                <td className="px-6 py-4 border border-gray-300">{data.bank_name}</td>
                            </tr>

                        </tbody>
                    </table>

                </div>
            )}

            {!connected && <form onSubmit={onConnect} className='space-x-10 flex flex-row ' action="">

                <div className='flex gap-4'>
                    <input
                        disabled={connected}
                        value={data.account_number}
                        name='account_number'
                        onChange={onUserInput}
                        required
                        onInput={(e) => {
                            e.target.value = e.target.value.replace(/[^0-9]/g, '');  // Allow only numbers
                        }}
                        maxLength="18"
                        className='border border-black placeholder:text-slate-600 px-4 w-[220px] py-1 outline-none'
                        type="text"
                        inputMode="numeric"
                        placeholder='Account number' />

                    <input
                        disabled={connected}
                        value={data.ifsc}
                        name="ifsc"
                        onChange={onUserInput}
                        required
                        maxLength="11"
                        className='border border-black placeholder:text-slate-600 px-4 w-[220px] py-1 outline-none'
                        type="text"
                        placeholder='IFSC Code' />

                    <input
                        disabled={connected}
                        value={data.name}
                        name='name'
                        onChange={onUserInput}
                        required
                        maxLength="25"
                        className='border border-black placeholder:text-slate-600 px-4 w-[220px] py-1 outline-none'
                        type="text"
                        placeholder='Account holder name' />
                </div>



                <div className='flex justify-end w-full'>
                    <button className='border border-black font-bold px-8 py-1 text-sm hover:bg-[#E3E7EA] mr-12'>Connect</button>
                </div>

            </form>}

            <div className='space-y-4'>
                <h1 className='text-xl font-semibold'>
                    Withholding Tax Status
                </h1>

                <div className='flex border-2 p-4 gap-4 '>
                    <MdInfo className='size-7 mt-2' />
                    <div>
                        <h3 className='font-semibold text-lg'>To become a premium instructor, you need to connect a payout method.</h3>
                        <p className='text-sm '>When you earn revenue on Udemy, you’ll be prompted to submit tax documentation. <Link className='link-primary underline'>Learn more about tax withholding.</Link></p>
                    </div>

                </div>
            </div>

            <div className='space-y-4'>
                <h1 className='text-xl font-semibold'>
                    Tax Form E-Delivery
                </h1>
                <div className='flex justify-between text-sm border-2 p-4'>
                    <h1>Go green and get your year-end tax forms electronically (Brainy won’t send a copy by mail).
                    </h1>
                    <h3>Paper Delivery Selected</h3>
                </div>
                <p className='text-xs ml-4 text-slate-600'>By opting in to e-delivery, you acknowledge that you’ve read and agree to <Link className='link-primary underline'>the Electronic Delivery Agreement.</Link></p>
                <div className='flex justify-end w-full pr-4'>
                    <button className='border border-black font-bold px-4 py-1 text-sm hover:bg-[#E3E7EA] '>I prefer e-delivery</button>
                </div>
            </div>

            <div className='space-y-4'>
                <h1 className='text-xl font-semibold'>
                    Tax Documents
                </h1>

                <h3>
                    No documents available
                </h3>

                <Link className='flex gap-2 link-primary items-center'>Manage Promotional Agreements <BiLinkExternal className='size-5' /></Link>

            </div>


        </div>
    )
}

export default Payouts
