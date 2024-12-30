import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";

const initialState = {
    searchTerm: "",
    result: [],
    total:null,
    limit:null,
    CollaborativeRecommendations: [],
    CategoryData: {}
}

export const termSuggestions = createAsyncThunk("/search/term-suggestions", async (data) => {
    try {

        const res = await axiosInstance.get("/search/term-suggestions", {
            params: data
        });

        return res.data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
});

export const searchCourses = createAsyncThunk("/search/searchCourses", async (data) => {
    try {

        const res = await axiosInstance.get("/search/", {
            params: data
        });

        return res.data;

    } catch (error) {
        // toast.error(error.response.data.message)
    }
});

export const CollaborativeRecommendations = createAsyncThunk("/search/CollaborativeRecommendations", async (data) => {
    try {

        const res = await axiosInstance.get("/search/CollaborativeRecommendations/", {
            params: data
        });

        return res.data;

    } catch (error) {
        // toast.error(error.response.data.message)
    }
});

export const TopicBasedRecommendations = createAsyncThunk("/search/TopicBasedRecommendations", async (data) => {
    try {

        const res = await axiosInstance.get("/search/TopicBasedRecommendations/", {
            params: data
        });

        return res.data;

    } catch (error) {
        // toast.error(error.response.data.message)
    }
});

export const coursesByCategory = createAsyncThunk("/search/coursesByCategory", async (data) =>{

    try {
        
        const res = await axiosInstance.get("/search", {
            params: data
        });

        return res.data;

    } catch (error) {
        // toast.error(error.response.data.message)
    }

});

const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchCourses.fulfilled, (state, action) => {
                state.result = action.payload.data.courses;
                state.searchTerm = action.payload.data.searchTerm;
                state.total = action.payload.data.total;
                state.limit = action.payload.data.limit;
            })

            .addCase(CollaborativeRecommendations.fulfilled, (state, action) => {
                state.CollaborativeRecommendations = action.payload.data;
            })

            .addCase(TopicBasedRecommendations.fulfilled, (state, action) =>{
                state.TopicBasedRecommendations = action.payload.data;
            })

            .addCase(coursesByCategory.fulfilled, (state, action) =>{
                const { searchTerm, courses} = action.payload.data;
                console.log(searchTerm ,"dfasfa", action.payload.data.searchTerm,action.payload.data);
                
                
                state.CategoryData[searchTerm] = courses;
            })
    }
})

export default searchSlice.reducer;