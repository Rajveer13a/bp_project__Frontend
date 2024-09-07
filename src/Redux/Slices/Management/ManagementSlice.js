import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    feedback: {
        curr: null,
        landingpage: {},
        message: {},
        intended_learners: {},
        captions: {},

    }
}


const manangeSlice = createSlice({
    name: "management",
    initialState,
    reducers: {
        addReviewData: (state,action)=>{

            const {data} = action.payload;

            state.feedback.curr = data.sections.map((section) => {
               
                section.approved = null;
        
                
                section.lectures = section.lectures.map((lecture) => {
                  lecture.approved = null; 
                  lecture.feedback = "";
                  return lecture;
                });
        
                return section;
              });

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

