import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";

const initialState = {
    data: []
}

export const getAllCourses = createAsyncThunk('/course/getAllCourses', async()=>{

    
        const res = await axiosInstance.get('/student/courses');

        return res.data;

})


const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase( getAllCourses.rejected, (state, action)=>{
            toast.error(action.payload.data.message)
        })
        .addCase( getAllCourses.fulfilled, (state, action)=>{

            state.data = action.payload.data;
        })

    }
});

export default courseSlice.reducer;