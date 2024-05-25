import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";

const initialState = {
    data: [],
    content: {}
}

export const getAllCourses = createAsyncThunk('/course/getAllCourses', async () => {


    const res = await axiosInstance.get('/student/courses');

    return res.data;

})

export const courseDetail = createAsyncThunk('/course/courseDetail', async (data) => {
    try {
        const res = axiosInstance.get('/student/courseDetail', { params: data });

        toast.promise(res, {
            error: "failed to fetch course detail"
        });

        return (await res).data
    } catch (error) {
        toast.error(error.response.data.message)
    }
})


const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCourses.rejected, (state, action) => {
                toast.error(action.payload.data.message)
            })
            .addCase(getAllCourses.fulfilled, (state, action) => {

                state.data = action.payload.data;
            })
            .addCase(courseDetail.fulfilled, (state, action) => {

                state.content = action.payload.data;
            })

    }
});

export default courseSlice.reducer;