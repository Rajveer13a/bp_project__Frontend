import axiosInstance from "@/Helpers/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = null;

export const createOrder = createAsyncThunk('/payment/createorder', async(data)=>{
    try{
        
        const res = await axiosInstance.post('/payment/createOrder',{
            course_ids : data
        });

        return res.data

    }catch(error){
        toast.error(error.response.data.message);
    }
});

export const verifyPayment = createAsyncThunk('/payment/verifypayment', async(data)=>{
    try {
        const res = axiosInstance.post('/payment/verify', data);

        toast.promise(res, {
            success: (data)=> data?.data.message
        })

        return (await res)?.data;

    } catch (error) {
        console.log(error.response.data.message);
    }
})

const PaymentSlice = createSlice({
    initialState,
    name: "payment",
    reducers: {},
    extraReducers : (builder)=>{
        builder 
    }
})

export default PaymentSlice.reducer;