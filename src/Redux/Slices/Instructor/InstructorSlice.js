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

})


const ManageCourseSlice = createSlice({
    name: "instructor",
    initialState,
    reducers : {},
    extraReducers: (builder)=>{
        builder .addCase
    }
})

export default ManageCourseSlice.reducer ;