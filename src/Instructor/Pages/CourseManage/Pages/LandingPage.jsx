import React, { useState } from 'react'
import { FaItalic } from 'react-icons/fa'
import { MdFormatBold, MdFormatItalic, MdFormatListBulleted, MdFormatListNumbered, MdList } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Input = ({ onChange, value, name, count }) => {



    return (
        <div className='relative'>
            <input name={name} onChange={onChange} className='border border-black w-[100%] h-[45px] outline-none pl-4 pr-20 placeholder:text-slate-600' placeholder={`Insert your course ${name}`} value={value}></input>

            <h1 className='absolute top-3 right-5'>{count - value.length}</h1>

        </div>
    )

}

function LandingPage() {

    const [data, setData] = useState({
        title: "",
        subtitle: "",
        description: "",
        basic: {
            language: "",
            level: "",
            category: "",
            subcategory: ""
        }
    })

    const onUserInput = (e) => {
        const { value, name } = e.target;

        setData({
            ...data,
            [name]: value
        })
    }

    return (
        <div className='w-[96%]'>

            <h1 className='font-semibold text-2xl border-b  pb-6 px-12'>
                Course landing page
            </h1>

            <div className='px-12 space-y-6 py-8'>

                <p className=''>
                    Your course landing page is crucial to your success on Udemy. If it’s done right, it can also help you gain visibility in search engines like Google. As you complete this section, think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course. Learn more about <Link className='link-primary underline'>creating your course landing page</Link> and <Link className='link-primary underline'>course title standards.</Link>
                </p>

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course title</h1>
                    <Input onChange={onUserInput} name={"title"} value={data.title} count={60} />
                    <p className='text-xs'>Your title should be a mix of attention-grabbing, informative, and optimized for search</p>
                </div>

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course subtitle</h1>
                    <Input onChange={onUserInput} name={"subtitle"} value={data.subtitle} count={120} />
                    <p className='text-xs'>Use 1 or 2 related keywords, and mention 3-4 of the most important areas that you've covered during your course.</p>
                </div>

                {/* description */}

                <div className='space-y-2'>
                    <h1 className='font-semibold text-lg'>Course description</h1>

                    <div>
                        <div className='w-[100%] border-x border-t border-black flex items-center text-xl px-2 py-2 gap-4'>
                            <button>
                            <MdFormatBold />
                            </button>

                            <button>
                            <MdFormatItalic />
                            </button>

                            <button>
                            <MdFormatListNumbered />
                            </button>
                            
                            <button>
                            <MdFormatListBulleted />
                            </button>
                        </div>

                        <textarea
                            name="description"
                            onChange={onUserInput}
                            className='border border-black w-[100%]  outline-none pl-4 pr-20 placeholder:text-slate-600 overflow-hidden resize-none h-auto py-2'
                            placeholder={`Insert your course description`}
                            value={data.description}
                            onInput={(e) => {
                                e.target.style.height = 'auto';
                                e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                        ></textarea>
                        <p className='text-xs'>Description should have minimum 200 words.</p>
                    </div>

                    
                </div>



            </div>


        </div>
    )
}

export default LandingPage
