import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "@/Helpers/axiosInstance";

const initialState = {
    searchTerm: "",
    result: [],
    total:null,
    limit:null
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
        toast.error(error.response.data.message)
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
    }
})

export default searchSlice.reducer;