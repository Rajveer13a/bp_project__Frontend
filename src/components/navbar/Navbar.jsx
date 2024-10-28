import React, { useState } from 'react'
import { IoIosArrowForward } from 'react-icons/io'

import Iprofile from '@/Instructor/components/Iprofile';

import Logo from '../Logo'
import  { BusinessButton, CartButton, InstructorButton, MyLearningButton,  NotifyButton } from './HoverElement';
import SearchBar from './SearchBar';


function ListHover({ count = 1, categories }) {

    const [enable, setEnable] = useState(false);

    console.log(categories);


    return (
        <ul className='bg-white border w-64 absolute text-sm left-full top-0'>

            {categories.map((value) => {
                return (
                    <>
                        {
                            count == 3 && (
                                <h3 className='px-3 py-1 font-bold text-[#767A7E]'>
                                    Popular Topics
                                </h3>
                            )
                        }
                        <li onMouseLeave={() => setEnable(false)} onMouseEnter={() => count < 3 && setEnable(true)} className='px-3 flex bg-orange-500 py-1 hover:text-[#5022C3]'>


                            <h4>{value?.title}</h4>
                            {
                                count < 3 && (
                                    <IoIosArrowForward className='my-auto ml-auto size-3' />
                                )
                            }
                            {
                                enable && <ListHover categories={value.sub} count={count + 1} />
                            }
                        </li>
                    </>
                )
            })}

        </ul>
    )
}

function HoverTab() {

    const categories = [
        {
            title: "Development",
            sub: [
                {
                    title: "Web Development",
                    sub: [
                        {
                            title: "Javascript"
                        },
                        {
                            title: "React Js"
                        },
                        {
                            title: "Angular"
                        },
                        {
                            title: "CSS"
                        },
                        {
                            title: "HTML"
                        },
                        {
                            title: "Next.js"
                        },
                        {
                            title: "Next.js"
                        },
                        {
                            title: "Next.js"
                        },
                    ]
                }
            ]
        },
        {
            title: "Development",
            sub: [
                {
                    title: "Web Development",
                    sub: [
                        {
                            title: "Javascript"
                        },
                        {
                            title: "React Js"
                        },
                        {
                            title: "Angular"
                        },
                        {
                            title: "CSS"
                        },
                        {
                            title: "HTML"
                        },
                        {
                            title: "Next.js"
                        },
                        {
                            title: "Next.js"
                        },
                        {
                            title: "Next.js"
                        },
                    ]
                }
            ]
        },

    ]

    return (
        <div className='relative cursor-pointer'>
            <h1 className='py-5  px-3'>
                Categories
            </h1>

            <div className='relative '>
                {/* <ListHover categories={categories} /> */}
            </div>

        </div>
    )
}

function Navbar() {

    const lists = [
        [{ text: "My learning", link: "" }],
        [{ text: "My cart", link: "" },{ text: "Instructor dashboard", link: "" }],
        [{ text: "Account Settings", link: "" }],
        [{ text: "Public profile", link: "" }, { text: "Edit profile", link: "/profile" }],
        [{ text: "Help", link: "" }, { text: "Logout", link: "" }]
    
    ]


    return (
        <div className='w-[100vw] flex items-center border border-black px-4 space-x-1'>
            <Logo />

            <HoverTab />

            <SearchBar/>

            <BusinessButton/>

            <InstructorButton/> 

            <MyLearningButton/>

            <CartButton/>

            <NotifyButton/>

            <Iprofile lists={lists}  />
        </div>
    )
}

export default Navbar
