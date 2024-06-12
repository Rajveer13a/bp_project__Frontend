import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";



const initialState = {
    cart:  localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[],

    favourite: localStorage.getItem('favourite') !=undefined ?  JSON.parse(localStorage.getItem('favourite')) : [],
    total: 0

};

export const updateCart = createAsyncThunk(' userconfig/updatecart', async (data) => {

    try {

        const res = axiosInstance.get('/user/cart', { params: data[0] });

        toast.promise(res, {
            success: (data) => data?.data.message,
            error: "failed to update cart"
        });

        return data[1];

    } catch (error) {
        toast.error(error.response.data.message)
    }

});


export const getConfig = createAsyncThunk('userconfig/getconfig', async () => {
    try {

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
                state.favourite = data.favourite;

                const total = data.cart.reduce((acc, curr)=> {
                     return acc + curr.price                    
                },0);
                
                
                state.total = total

                
                localStorage.setItem('cart', JSON.stringify(data.cart));

            }

        })

        .addCase(updateCart.fulfilled, (state, action)=>{
            if(action?.payload){
               
                state.cart.push(action.payload)

                localStorage.setItem('cart',JSON.stringify(state.cart))
                
            }
        })
    }
})


export default UserConfigSlice.reducer;