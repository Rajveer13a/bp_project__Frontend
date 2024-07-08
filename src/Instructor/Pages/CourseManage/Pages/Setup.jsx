import React from 'react'
import { Link } from 'react-router-dom';

import ManageLayout from '@/Instructor/Layout/ManageLayout';

function Setup() {

    const tips = [
        {
            title: "Equipment can be easy.",
            content: <>You don’t need to buy fancy equipment. Most smartphone cameras can capture video in HD, and you can record audio on another phone or external microphone.</>
        },
        {
            title: "Students need to hear you.",
            content: <>A good microphone is the most important piece of equipment you will choose. There are lot of affordable options.. Make sure it’s correctly plugged in and 6-12 inches (15-30 cm) from you.</>
        },
        {
            title: "Make a studio.",
            content: `Clean up your background and arrange props. Almost any small space can be transformed with a backdrop made of colored paper or an ironed bed sheet.`
        },
        {
            title: "Light the scene and your face.",
            content: <>Turn off overhead lights. Experiment with three point lighting by placing two lamps in front of you and one behind aimed on the background.</>
        },
        {
            title: "Reduce noise and echo.",
            content: <>Turn off fans or air vents, and record at a time when it’s quiet. Place acoustic foam or blankets on the walls, and bring in rugs or furniture to dampen echo.</>
        },
        {
            title: "Be creative.",
            content: <>Students won’t see behind the scenes. No one will know if you’re surrounded by pillows for soundproofing...unless you tell other instructors in the community!</>
        },
    ];

    const requirements = [
        <>Film and export in HD to create videos of at least 720p, or 1080p if possible</>,
        <>Audio should come out of both the left and right channels and be synced to your video</>,
        <>Audio should be free of echo and background noise so as not to be distracting to students</>
    ];

    const resources = [
        {heading:"Teaching Center: Guide to equipment", para:"Make a home studio on a budget" },

        {heading:"Udemy Trust & Safety", para:"Our policies for instructors and students" },

        {heading:"Join the community", para:"A place to talk with other instructors" },
    ]

    return (
        <ManageLayout 
        requirements={requirements} 
        tips={tips}
        title={"Setup & test video"}
        card={{
            left: {
                heading: "Arrange your ideal studio and get early feedback",
                para: "It's important to get your audio and video set up correctly now, because it's much more difficult to fix your videos after you’ve recorded. There are many creative ways to use what you have to create professional looking video."
            },
            right: {
                image: "https://s.udemycdn.com/instructor/manage/video-help-2x.jpg",
                heading:"Free expert video help",
                para: "Get personalized advice on your audio and video",
                button: "Create a test video"
            }
        }}
        resources={resources}       
       />
    )
}

export default Setup
