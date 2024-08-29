import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";
import { useDispatch } from "react-redux";

const initialState = {
    data: "",
    edit: "",

}


export const createCourse = createAsyncThunk("/instructor/createCourse", async (data) => {

    try {

        const res = axiosInstance.post('/course', data);

        toast.promise(res, {
            loading: "creating course..",
            success: (data) => data.data.message
        })

        return (await res).data

    } catch (error) {
        toast.error(error.response.data.message)
    }

});

export const instructorDetails = createAsyncThunk("/instructor/instructorDetails", async () => {

    try {

        const res = await axiosInstance.get("/instructor/instructorDetails");

        return res;

    } catch (error) {
        toast.error(error.response.data.message);
    }
});

export const courseDetails = createAsyncThunk("/instructor/courseDetials", async (id) => {
    try {

        const res = await axiosInstance.get(`/course/${id}`);

        return res.data;

    } catch (err) {
        toast.error(err.response.data.message);
    }
})

export const addSection = createAsyncThunk("/instructor/addSection", async (data) => {
    try {
        console.log(data)
        const res = await axiosInstance.post(`/course/section/${data.id}`, {
            title: data.title
        });

        return res.data;

    } catch (err) {
        toast.error(err.response.data.message);
    }
})

export const deleteSection = createAsyncThunk("/instuctor/deleteSection", async (id) => {

    try {
        const res = await axiosInstance.delete(`/course/section/${id}`);
        return res.data;

    } catch (err) {
        toast.error(err.response.data.message);
    }
});

export const updateSection = createAsyncThunk("/instuctor/updateSection", async (data) => {

    try {

        const res = await axiosInstance.patch(`/course/section/${data._id}`, data.payload)

        return res.data;

    } catch (error) {
        toast.error(error.response.data.message);
    }
})

export const addLecture = createAsyncThunk("/instructor/addLecture", async (data) => {
    try {

        const res = await axiosInstance.post(`/course/lecture/${data.course_id}/${data.section_id}`, {
            title: data.title
        });

        return res.data;

    } catch (error) {
        toast.error(error.response.data.message);
    }
})

export const deleteLecture = createAsyncThunk("/instructor/deleteLecture", async (lecture_id) => {
    try {

        const res = await axiosInstance.delete(`/course/lecture/${lecture_id}`);

        return res.data;


    } catch (error) {
        toast.error(error.response.data.message);
    }
})


const ManageCourseSlice = createSlice({
    name: "instructor",
    initialState,
    reducers: {
        // setAlert(state,action){
        //     state.alertState= action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder.addCase(instructorDetails.fulfilled, (state, action) => {
            if (action?.payload) {
                state.data = action.payload.data.data.instructor;
            }
        })

        builder.addCase(courseDetails.fulfilled, (state, action) => {
            if (action?.payload) {
                state.edit = action.payload.data;


            }
        })

        builder.addCase(addSection.fulfilled, (state, action) => {
            if (action?.payload) {
                state.edit.sections.push(action.payload.data)
            }
        })
        builder.addCase(deleteSection.fulfilled, (state, action) => {
            console.log(action.payload.data._id, "hereeeeeeeeeee")
            if (action?.payload) {
                state.edit.sections = state.edit.sections.filter((value) => value._id != action.payload.data._id);

            }
        })
        builder.addCase(updateSection.fulfilled, (state, action) => {
            if (action?.payload) {
                const idx = state.edit.sections.findIndex(
                    (value) => value._id === action.payload.data._id
                );

                if (idx !== -1) {
                    state.edit.sections[idx].title = action.payload.data.title;
                }


            }
        })


    }
})

// export const  {setAlert} = ManageCourseSlice.actions;

export default ManageCourseSlice.reducer;