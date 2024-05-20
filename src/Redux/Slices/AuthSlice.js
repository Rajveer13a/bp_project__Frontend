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
});


export const sendVerifytoken = createAsyncThunk('/auht/generateToken', async ()=>{

    try{

        const res =  axiosInstance.get('/user/generate/verifytoken');

        toast.promise(res,{
            loading: "sending otp..",
            success: (data)=>{
                return data.data.message
            },
            error: "failed to send otp"
        })

        return (await res)?.data

    }catch(err){
        toast.error(err.response.data.message)
        return err.response.data
    }
});


export const logout = createAsyncThunk('/auth/logout', async ()=>{

    try{

        const res = axiosInstance.get('/user/logout');

        toast.promise(res, {
            loading:" logging out",
            success: (data)=>{
                return data.data.message
            },
            error: "failed to logout"
        })

        return (await res).data;

    }catch(err){
        toast.error(err.response.data.message)
        
    }
});


export const login = createAsyncThunk('/auth/login', async (data)=>{

    try{

        const res = axiosInstance.post('/user/login',data);

        toast.promise(res, {
            loading: "getting you logged in",
            success: (data)=>{
                return data.data.message
            },
            error: "failed to log in"

        } );

        return (await res).data

    }catch(err){
        toast.error(err.response.data.message)
    }

});


export const  getUser = createAsyncThunk('/auth/getUser', async ()=>{

    try {
        
        const res = axiosInstance.get('/user/me');

        toast.promise(res, {
            loading:"fething user data",
            success:(data)=> data.data.message,
            error: "failed to fetch user data",
        })

        return (await res).data;


    } catch (error) {
        toast.error(error.response.data.message)
    }
});

export const updateUsername = createAsyncThunk('/auth/updateUsername', async (username)=>{

    try{

        const res = axiosInstance.post('/user/updateUserDetails', { username });

        toast.promise(res, {
            loading: "updating username",
            success: (data)=> data.data.message,
            error: "failed to update username"
        });

        return (await res).data;

    }catch(err){
        toast.error(err.response.data.message);
    }
})




const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        accountState(state){
            state.data.verifiedStatus = true;
            localStorage.setItem('data', JSON.stringify(state.data))
        },
    },
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

        .addCase( logout.fulfilled, (state, action)=>{

            if(action.payload){
                localStorage.setItem('data', "");

                localStorage.setItem('role', "" );

                localStorage.setItem('isLoggedIn', "" );

                state.data = {};
                state.isLoggedIn = false;
                state.role = "USER";
            }
        })

        .addCase( login.fulfilled, (state, action)=>{
            if(action.payload){
                const {data} = action.payload;
                

                localStorage.setItem('data', JSON.stringify(data));

                localStorage.setItem('role', data.role );

                localStorage.setItem('isLoggedIn', true );

                state.data = data;
                state.isLoggedIn = true;
                state.role = data.role;
            }
        } )

        .addCase( getUser.fulfilled, (state, action)=>{

            if(action.payload){
                const {data} = action.payload;
                

                localStorage.setItem('data', JSON.stringify(data));


                state.data = data;

            }
        })

        .addCase( updateUsername.fulfilled, (state, action)=>{
            if(action.payload){                
                localStorage.setItem('data', JSON.stringify(action.payload.data));

                state.data = action.payload.data;
            }
        })
        
        
    }
})

export const {accountState} = authSlice.actions;

export default authSlice.reducer;