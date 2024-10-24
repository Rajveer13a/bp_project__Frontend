import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import axiosInstance from "@/Helpers/axiosInstance";

const initialState = {
    data: localStorage.getItem('instructor_data') ? JSON.parse(localStorage.getItem('instructor_data')) : "",

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

export const submitForApproval = createAsyncThunk("/instructor/submitforapproval", async (data) => {

    try {

        const res = axiosInstance.post("/course/submit", {
            course_id: data.course_id
        });

        toast.promise(res, {
            loading: "submitting for approval",
            success: (data) => data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const deleteCourse = createAsyncThunk("/instuctor/deleteCourse", async (data) => {
    try {
        const res = axiosInstance.delete(`course/${data.course_id}`);

        toast.promise(res, {
            loading: "deleting course",
            success: (data) => data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const updateCourseDetails = createAsyncThunk("/instructor/updateCourse/details", async (data) => {

    try {

        const res = axiosInstance.patch(`/course/${data.course_id}`, data);

        toast.promise(res, {
            loading: "updating course details",
            success: (data) => data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message);
    }

})


export const updatethumbnail_promo = createAsyncThunk("/instructor/updateCourse/media", async (data) => {

    try {

        console.log("here inside", data);

        const res = axiosInstance.patch(`/course/${data.course_id}/media`, data.file, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                data.setUploadProgress((prevstate) => ({
                    ...prevstate, progress: percentCompleted, status: "uploading"
                }))


            },
            signal: data.signal
        });

        // toast.promise(res, {
        //     loading:"updating course",
        //     success: (data)=> data.data.message
        // })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message);
        data.setUploadProgress({
            error: error.response.data.message, progress: 0, status: "failed"
        })
    }
})

export const updateInstructorDetails = createAsyncThunk("/instructor/updateInstructorDetails", async (data) => {

    try {
        const res = axiosInstance.patch("/instructor/details", data);

        toast.promise(res, {
            loading: "updating details",
            success: (data) => data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
})


export const connectBankAccount = createAsyncThunk("/instructor/payouts/link-bank", async (data) => {
    try {

        const res = axiosInstance.post("/payouts/link-bank", data);

        toast.promise(res, {
            loading: "adding new account",
            success: (data) => data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const getAccount = createAsyncThunk("/instructor/payouts/getAccount", async () => {
    try {

        const res = axiosInstance.get("/payouts/account");

        toast.promise(res, {
            loading: "fetching account",
            success: (data) => data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const updatePrice = createAsyncThunk("/instructor/course/updatePrice", async (data) => {
    try {

        const res = axiosInstance.patch(`/course/${data.course_id}/price`, data);

        toast.promise(res, {
            loading: "updating course",
            success: (data) => data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const updateGoals = createAsyncThunk("/instructor/course/goals", async (data) => {
    try {
        console.log(data.course_id);

        const res = axiosInstance.patch(`/course/${data.course_id}/goals`, data);

        toast.promise(res, {
            loading: "updating course",
            success: (data) => data.data.message
        })

        return (await res).data;

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

export const getCourseReview = createAsyncThunk("/instructor/course/approvalStatus", async ({course_id}) => {
    try {
        
        const res =  axiosInstance.get(`/course/${course_id}/approvalStatus`);

        toast.promise(res, {
            loading: "fetching approval status",
            success: (data)=>data.data.message
        })

        return (await res).data;
        

    } catch (error) {
        toast.error(error.response.data.message)
    }
})

const ManageCourseSlice = createSlice({
    name: "instructor",
    initialState,
    reducers: {
        // setAlert(state,action){
        //     state.alertState= action.payload;
        // }
        saveAndContinue(state) {
            console.log("herreee");

            state.data.profileCompleted.step = state.data.profileCompleted.step + 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(instructorDetails.fulfilled, (state, action) => {
            if (action?.payload) {
                let courselist = action.payload.data.data.instructor.courses;
        
                const updatedCourses = courselist?.map((course) => {
                    // let contentDuration = 0;
                    let totalSections = course?.sections?.length;
                    console.log(totalSections,"toatlsections");
                    
        
                    // course?.sections?.forEach((section) => {
                    //     section?.lectures?.forEach((lecture) => {
                    //         contentDuration += lecture?.resource?.duration || 0;
                    //         if (lecture?.resource?.duration) totalLectures++;
                    //     });
                    // });
        
                    // contentDuration = contentDuration / 60;
                    // contentDuration = Math.round(contentDuration * 10) / 10;
        
                    let intendLearners = false;
                    let curr = false;
                    let lanPage = false;
        
                    let goals = course.goals;
                    let flag = goals?.objectives.filter(Boolean)?.length >= 4;
                    flag = flag && goals?.prerequisites.filter(Boolean)?.length >= 1;
                    flag = flag && goals?.intended_learners.filter(Boolean)?.length >= 1;
                    intendLearners = flag;
        
                
                    curr = totalSections >= 1;
        
                    lanPage = course?.trailerVideo && course?.thumbnail && course?.subtitle && course?.language && course?.description;
        
                    let percentageCompleted = 0;

                    if (lanPage) percentageCompleted += 1;
                    if (intendLearners) percentageCompleted += 1;
                    if (curr) percentageCompleted += 1;  
                    if (course.price != undefined) percentageCompleted += 1;
                    console.log(lanPage, intendLearners, curr, course.price!=undefined);
                    
                    percentageCompleted = (percentageCompleted/4)*100;
        
                    return { ...course, percentageCompleted };
                });
        
                state.data = { ...action.payload.data.data.instructor, courses: updatedCourses };
                localStorage.setItem("instructor_data", JSON.stringify(state.data));
            }
        });
        

        builder.addCase(courseDetails.fulfilled, (state, action) => {
            if (action?.payload) {
                state.edit = action.payload.data;


            }
        })

        builder.addCase(addSection.fulfilled, (state, action) => {
            // if (action?.payload) {
            //     state.edit.sections.push(action.payload.data)
            // }
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

        builder.addCase(updateInstructorDetails.fulfilled, (state, action) => {
            if (action?.payload) {
                state.data.profileCompleted = {
                    step: 2,
                }
            }
        })


    }
})

export const { saveAndContinue } = ManageCourseSlice.actions;

export default ManageCourseSlice.reducer;