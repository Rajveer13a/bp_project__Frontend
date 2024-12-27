import React, { useState } from 'react'
import { IoIosAlert, IoIosArrowForward, IoMdAlert } from 'react-icons/io'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Iprofile from '@/Instructor/components/Iprofile';

import Logo from '../Logo'
import { BusinessButton, CartButton, FavouriteButton, InstructorButton, MyLearningButton, NotifyButton } from './HoverElement';
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
        [{ text: "My cart", link: "/shoppingCart" }, { text: "Instructor dashboard", link: "/instructor/courses" }],
        [{ text: "Account Settings", link: "" }],
        [{ text: "Public profile", link: "" }, { text: "Edit profile", link: "/profile" }],
        [{ text: "Help", link: "" }, { text: "Logout", link: "" }]

    ]

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const { verifiedStatus, role } = useSelector((state) => state.auth.data);




    return (
        <div className='w-[100vw] flex items-center border bg-white border-black px-4 space-x-1 relative z-30'>

            {
                (!verifiedStatus && isLoggedIn) && <Link
                    to="/verifyEmail"
                    className="absolute top-16 right-0 bg-red-500 text-white p-4 rounded-lg shadow-lg text-lg font-bold z-10 translate-x-[85%] hover:-translate-x-0 duration-700 hover:bg-red-600 border-2 border-red-700 opacity-90 flex gap-5 items-center justify-center pr-10"
                >
                    <div className='relative flex items-center justify-center'>
                        <IoMdAlert className='size-7 text-black' />
                        <div className='absolute rounded-full bg-white size-[70%] -z-10'></div>
                    </div>
                    Please verify your account to access all features!
                </Link>
            }

            <Logo />

            <HoverTab />

            <SearchBar />

            {/* <BusinessButton /> */}

            <div className='flex items-center justify-evenly flex-grow'>
                {
                    role == "INSTRUCTOR" ? <InstructorButton /> : <Link to={"/instructor/teach"} className='hover:text-blue-600 py-5 px-3'>Teach on Brainy</Link>
                }

                <Link to={"/my-courses/learning"}> <MyLearningButton /> </Link>

                {isLoggedIn && <>
                    <Link to={"/my-courses/wishlist"}><FavouriteButton /></Link>

                    <Link to={"/shoppingcart"}> <CartButton /> </Link>

                    <NotifyButton />



                    <Iprofile lists={lists} />
                </>}
            </div>

            {!isLoggedIn && (
                <div className='space-x-2'>
                    <Link to={"/login"}>
                        <button className='border border-black font-bold px-4 py-2 hover:bg-[#E3E7EA] duration-100 text-sm'>Log in</button>
                    </Link>

                    <Link to={"/signup"}>
                        <button className='bg-slate-800 font-bold px-4 py-2 text-sm hover:bg-slate-700 text-white duration-100 '>Sign up</button>
                    </Link>
                </div>
            )
            }


        </div>
    )
}

export default Navbar
