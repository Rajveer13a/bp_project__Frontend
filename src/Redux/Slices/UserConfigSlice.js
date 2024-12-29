import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";



const initialState = {
    cart:  localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[],

    favourite: localStorage.getItem('favourite') ?  JSON.parse(localStorage.getItem('favourite')) : [],

    total: 0

};

export const updateCart = createAsyncThunk('/userconfig/updatecart', async (data) => {

    try {

        const res = axiosInstance.get('/user/cart', { params: data[0] });

        toast.promise(res, {
            // success: (data) => data?.data.message,
            error: "failed to update cart"
        });

        return data[1];

    } catch (error) {
        toast.error(error.response.data.message)
    }

});

export const updateFavourite = createAsyncThunk("/userconfig/updateFavourite", async (data) => {
    try {

        const res = axiosInstance.get('/user/favourite', { params: data[0] });

        toast.promise(res, {
            // success: (data) => data?.data.message,
            error: "failed to update favourite"
        });

        return data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
})


export const getConfig = createAsyncThunk('/userconfig/getconfig', async () => {
    try {

        if(!JSON.parse(localStorage.getItem("isLoggedIn"))) return;

        const res = await axiosInstance.get('/user/userconfig');

        return res.data

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

const UserConfigSlice = createSlice({
    name: 'UserConfig',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getConfig.fulfilled, (state, action) => {
            if (action?.payload) {
                const data = action.payload.data;
                state.cart = data.cart;
                state.favourite = data.favourites;

                const total = data.cart.reduce((acc, curr)=> {
                     return acc + curr.price                    
                },0);
                
                
                state.total = total

                
                localStorage.setItem('cart', JSON.stringify(data.cart));

            }

        })

        .addCase(updateCart.fulfilled, (state, action)=>{
            if(action?.payload){
               
                state.cart.push(action.payload);
                
                state.total += action.payload?.price;

                localStorage.setItem('cart',JSON.stringify(state.cart))
                
            }
        })
        
        .addCase(updateFavourite.fulfilled, (state, action)=>{
            if(action?.payload){

                if(action?.payload[0]?.add){
                    state.favourite.push(action?.payload[1]);
                }else{

                    state.favourite = state.favourite.filter((value)=> value?._id != action?.payload[1]._id);

                }
               
                
                
                localStorage.setItem('favourite',JSON.stringify(state.favourite))
                
            }
        })
    }
})


export default UserConfigSlice.reducer;