import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";

const initialState = {
    data: [],
    content: {},
    mylearning: [],
    learn: null
}

export const getAllCourses = createAsyncThunk('/course/getAllCourses', async () => {


    const res = await axiosInstance.get('/student/courses');

    return res.data;

});

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
});

export const mylearning = createAsyncThunk('/course/mylearning', async () => {

    try {

        if (!JSON.parse(localStorage.getItem("isLoggedIn"))) return;

        const res = axiosInstance.get("/student/mylearning");

        toast.promise(res, {
            error: "failed to load your purchased courses"
        })

        return (await res).data

    } catch (error) {

        toast.error(error.response.data.message)
    }
})

export const getlectures = createAsyncThunk('/course/getlectures', async (data) => {
    try {
        const res = axiosInstance.get('/student/learnLecture', { params: data });

        toast.promise(res, {
            error: "failed to get lectures"
        });

        return (await res).data

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const deleteRating = createAsyncThunk("/course/deleteRating", async (data) => {
    try {

        const res = axiosInstance.delete(`/student/deleteRating/${data?.course_id}`, data);

        toast.promise(res, {
            error: "failed to delete Rating"
        });

        return (await res).data

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const rateCourse = createAsyncThunk("/course/rateCourse", async (data) => {
    try {

        const res = axiosInstance.post('/student/rateCourse', data);

        toast.promise(res, {
            error: "failed to rate course"
        });

        return (await res).data

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const createProgressConfig = createAsyncThunk("/course/createProgressConfig", async (data) => {
    try {

        const res = axiosInstance.post('/student/createProgressConfig', data);

        toast.promise(res, {
            error: "failed to create createProgressConfig"
        });

        return (await res).data

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const markLecture = createAsyncThunk("/course/markLecture", async (data) => {
    try {

        const res = axiosInstance.post('/student/markLecture', data);

        toast.promise(res, {
            error: "failed to markLecture"
        });

        return data

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const lastViewed = createAsyncThunk("/course/lastViewed", async (data) => {
    try {

        const res = axiosInstance.post('/student/setLastViewed', data);

        toast.promise(res, {
            error: "failed to set last viewed"
        });

        return data

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const courseRatings = createAsyncThunk("/course/courseRatings", async (course_id) => {
    try {

        const res = axiosInstance.get(`/student/courseRatings/${course_id}`);

        toast.promise(res, {
            error: "failed to get ratings"
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
            .addCase(mylearning.fulfilled, (state, action) => {

                state.mylearning = action?.payload.data;
            })
            .addCase(getlectures.fulfilled, (state, action) => {

                state.learn = action?.payload?.data

            })

            .addCase(markLecture.fulfilled, (state, action) => {

                const { location, flag } = action.payload;

                state.learn.progress.completed[location[0]][location[1]] = flag;
            })

            .addCase(courseRatings.fulfilled, (state, action) => {

                const ratings = action.payload.data;

                if (state.learn != null) state.learn.ratings = ratings;

                const totalRating = ratings.reduce( (acc, curr) => acc + curr.rating , 0 );




                state.content.ratings = ratings;
                state.content.averageRating = totalRating / ratings.length;

            })

        //    .addCase(lastViewed.fulfilled, (state, action) => {

        //         const { section_no, lecture_no } = action.payload;

        //         state.learn.progress.lastViewed = { section_no, lecture_no }
        //    })

    }
});

export default courseSlice.reducer;