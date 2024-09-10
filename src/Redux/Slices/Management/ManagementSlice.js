import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";


const initialState = {
    feedback: {
        curr: null,
        landingpage: {},
        message: {},
        intended_learners: {},
        captions: {},

    }
}


export const reviewCourse = createAsyncThunk("/management/approveCourse", async(data)=>{

    try {
        
        const res =  axiosInstance.post("/manage/review", {
            course_id: data.course_id,
            flag: data.flag
        })

        toast.promise(res, {
            loading:"approving course",
            success:(data)=> data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message);
    }

})

export const feedbackLecture = createAsyncThunk("/management/approveLecture", async(data)=>{
    try {
        
        const res = axiosInstance.post("manage/review/lecture", {
            lecture_id : data.lecture_id,
            feedback : data?.feedback,
            flag : data.flag
        })

        toast.promise(res, {
            loading : "updating lecture status",
            success: (data)=> data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message);
    }
})


const manangeSlice = createSlice({
    name: "management",
    initialState,
    reducers: {

        addReviewData: (state,action)=>{

            const {data} = action.payload;

            state.feedback.curr = data.sections;

        },

        approveLecture: (state, action) => {

            const { section_indx, lecture_indx } = action.payload;

            state.feedback.curr[section_indx].lectures[lecture_indx].approved = true;
            state.feedback.curr[section_indx].lectures[lecture_indx].feedback = "";

            console.log(section_indx,"------------>>>>>",lecture_indx);
                       
        },


        disapproveLecture: (state, action) => {

            const { section_indx, lecture_indx , feedback } = action.payload;

            state.feedback.curr[section_indx].lectures[lecture_indx].approved = false;
            state.feedback.curr[section_indx].lectures[lecture_indx].feedback = feedback ;


        }



    },

})

export const { approveLecture ,addReviewData ,disapproveLecture} = manangeSlice.actions;

export default manangeSlice.reducer;

