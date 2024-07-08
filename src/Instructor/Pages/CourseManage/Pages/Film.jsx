import React from 'react'

import ManageLayout from '@/Instructor/Layout/ManageLayout';

function Film() {

    const tips = [
        {
            title: "Take breaks and review frequently.",
            content: <>Check often for any changes such as new noises. Be aware of your own energy levels--filming can tire you out and that translates to the screen.</>
        },
        {
            title: "Build rapport.",
            content: <>Students want to know who’s teaching them. Even for a course that is mostly screencasts, film yourself for your introduction. Or go the extra mile and film yourself introducing each section!</>
        },
        {
            title: "Being on camera takes practice.",
            content: `Make eye contact with the camera and speak clearly. Do as many retakes as you need to get it right.`
        },
        {
            title: "Set yourself up for editing success.",
            content: <>You can edit out long pauses, mistakes, and ums or ahs. Film a few extra activities or images that you can add in later to cover those cuts.</>
        },
        {
            title: "Create audio marks.",
            content: <>Clap when you start each take to easily locate the audio spike during editing. Use our guides to manage your recording day efficiently.</>
        },
        {
            title: "For screencasts, clean up.",
            content: <>Move unrelated files and folders off your desktop and open any tabs in advance. Make on-screen text at least 24pt and use zooming to highlight.</>
        },
    ];

    const requirements = [
        <>Film and export in HD to create videos of at least 720p, or 1080p if possible</>,
        <>Audio should come out of both the left and right channels and be synced to your video</>,
        <>Audio should be free of echo and background noise so as not to be distracting to students</>
    ];

    const resources = [
        {heading:"Create a test video", para:"Get feedback before filming your whole course" },

        {heading:"Teaching Center: Guide to quality A/V", para:"Film and edit with confidence" },

        {heading:"Udemy trust & safety", para:"Our policies for instructors and students" },
    ]

    return (
        <ManageLayout 
        requirements={requirements} 
        tips={tips}
        title={"Film & edit"}
        card={{
            left: {
                heading: "You’re ready to share your knowledge.",
                para: "This is your moment! If you’ve structured your course and used our guides, you're well prepared for the actual shoot. Pace yourself, take time to make it just right, and fine-tune when you edit."
            },
            right: {
                image: "https://s.udemycdn.com/instructor/manage/video-help-2x.jpg",
                heading:"You’re in good company",
                para: "Chat and get production help with other Udemy instructors",
                button: "Join the community"
            }
        }}
        resources={resources}       
       />
    )
}

export default Film
