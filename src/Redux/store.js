import { configureStore } from "@reduxjs/toolkit"

import AuthSliceReducer from "./Slices/AuthSlice"
import CourseSliceReducer from "./Slices/CourseSlice"


export const store = configureStore({
    reducer: {
        auth:  AuthSliceReducer,
        course: CourseSliceReducer
    },
    devTools: true
})