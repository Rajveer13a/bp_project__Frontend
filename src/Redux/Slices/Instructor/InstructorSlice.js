import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";

const initialState = {
    data : ""
}


export const createCourse = createAsyncThunk("/instructor/createCourse", async(data)=>{

    try{

        const res = axiosInstance.post('/course', data);

        toast.promise(res,{
            loading: "creating course..",
            success : (data) =>data.data.message
        })

        return (await res).data

    }catch(error){
        toast.error(error.response.data.message)
    }

});

export const instructorDetails = createAsyncThunk("/instructor/instructorDetails", async()=>{

    try {
        
        const res = await axiosInstance.get("/instructor/instructorDetails");

        return res;

    } catch (error) {
        toast.error(error.response.data.message);
    }
});


const ManageCourseSlice = createSlice({
    name: "instructor",
    initialState,
    reducers : {},
    extraReducers: (builder)=>{
        builder .addCase(instructorDetails.fulfilled, (state, action)=>{
            if(action?.payload){
                state.data = action.payload.data.data.instructor;
            }
        })
    }
})

export default ManageCourseSlice.reducer ;