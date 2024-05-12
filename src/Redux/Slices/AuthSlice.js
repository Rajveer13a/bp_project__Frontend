import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";




const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || 'USER',
    data: localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : {}

};


export const createAccount = createAsyncThunk('/auth/signup', async (payload) => {

    try {

        const res = axiosInstance.post('/user/register', payload);

        toast.promise(res, {
            loading: "creating account",
            success: (data)=>{
                return data?.data.message ;
            },
            error: "Oops ! failed to create account"
        });    

        return (await res).data

    } catch (err) {
        
        toast.error(err.response.data.message);
               
    }

});


export const verifyAccount = createAsyncThunk('/auth/verify', async (otp)=>{
    try{

        const res = axiosInstance.post('/user/verifyUser',{
            token: otp
        });

        toast.promise(res,{
            loading: "verifying account",
            success: (data)=>{
                return data.data.message
            },
            error: "failed to verify"
        });

        return (await res).data

    }catch(err){
        toast.error(err.response.data.message)
    }
})


export const sendVerifytoken = createAsyncThunk('auht/generateToken', async ()=>{

    try{

        const res =  axiosInstance.get('/user/generate/verifytoken');

        toast.promise(res,{
            loading: "sending otp..",
            success: (data)=>{
                return data.data.message
            },
            error: (data)=>{
                return data.data.messsage
            }
        })

        return (await res)?.data

    }catch(err){
        toast.error(err.response.data.message)
    }
})







const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase( createAccount.fulfilled , (state, action)=>{
            if(action.payload){
                const {data} = action.payload;
                

                localStorage.setItem('data', JSON.stringify(data));

                localStorage.setItem('role', data.role );

                localStorage.setItem('isLoggedIn', true );

                state.data = data;
                state.isLoggedIn = true;
                state.role = data.role;
            }
        })
        
    }
})


export default authSlice.reducer;