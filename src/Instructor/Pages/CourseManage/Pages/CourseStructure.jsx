import React from 'react'
import { Link } from 'react-router-dom'

import ManageLayout from '../../../Layout/ManageLayout'

function CourseStructure() {

    const requirements = [
        <>See the <Link className='link link-primary'>complete list</Link> of course quality requirements</>,
        <>Your course must have at least five lectures</>,
        <>All lectures must add up to at least 30+ minutes of total video</>,
        <>Your course is composed of valuable educational content and free of promotional or distracting materials</>
    ];

    const tips = [
        {
            title: "Start with your goals.",
            content: <>Setting goals for what learners will accomplish in your course (also known as <Link className='link link-primary'>learning objectives</Link>) at the beginning will help you determine what content to include in your course and how you will teach the content to help your learners achieve the goals.</>
        },
        {
            title: "Create an outline.",
            content: <>Decide what skills you’ll teach and how you’ll teach them. Group related lectures into sections. Each section should have at least 3 lectures, and include at least one assignment or practical activity. <Link className='link link-primary'>Learn more.</Link></>
        },
        {
            title: "Introduce yourself and create momentum.",
            content: `People online want to start learning quickly. Make an introduction section that gives learners something to be excited about in the first 10 minutes.`
        },
        {
            title: "Sections have a clear learning objective.",
            content: <>Introduce each section by describing the section's <Link className='link link-primary'>goal and why it’s important</Link>. Give lectures and sections titles that reflect their content and have a logical flow.</>
        },
        {
            title: "Lectures cover one concept.",
            content: <>A good lecture length is 2-7 minutes to keep students interested and help them study in short bursts. Cover a single topic in each lecture so learners can easily find and re-watch them later.</>
        },
        {
            title: "Mix and match your lecture types.",
            content: <>Alternate between filming yourself, your screen, and slides or other visuals. Showing yourself can help learners feel connected.</>
        },
        {
            title: "Practice activities create hands-on learning.",
            content: <>Help learners <Link className='link link-primary'>apply your lessons</Link> to their real world with projects, assignments, coding exercises, or worksheets.</>
        },
    ];

    const resources = [
        {heading:"Brainy Trust & Safety", para:"Our policies for instructors and students" },

        {heading:"Join the instructor community", para:"A place to connect with other instructors" },

        {heading:"Official Brainy Course: How to Create an Online Course", para:"Learn about course creation from the Brainy Instructor Team and experienced instructors" },
    ]

    return (
        <ManageLayout 
        requirements={requirements} 
        tips={tips}
        title={"Course structure"}
        card={{
            left: {
                heading: "There's a course in you. Plan it out.",
                para: "Planning your course carefully will create a clear learning path for students and help you once you film. Think down to the details of each lecture including the skill you’ll teach, estimated video length, practical activities to include, and how you’ll create introductions and summaries."
            },
            right: {
                image: "https://s.udemycdn.com/instructor/manage/library-help-2x.jpg",
                heading:"Our library of resources",
                para: "Tips and guides to structuring a course students love",
                button: "Teaching Center"
            }
        }}
        resources={resources}
        />
    )
}

export default CourseStructure
