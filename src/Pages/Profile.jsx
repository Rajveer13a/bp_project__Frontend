
import React, { useEffect, useRef, useState } from 'react'
import { MdFormatBold, MdFormatItalic, MdKeyboardArrowDown } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { FileUpload } from '@/Instructor/Pages/InstructorProfile/ProfilePicture'
import { getUser, updateUserDetails } from '@/Redux/Slices/AuthSlice'


const Input = ({ headline, placeholder = "", count = false, name, inputData, setInputData, setButtonDisabled, data }) => {

    const onUserInput = (e) => {

        const { name, value } = e.target;
        data?.[name] != value ? setButtonDisabled(false) : setButtonDisabled(true);

        setInputData((prev => ({
            ...prev,
            [name]: value
        })));

        isChanged(data, { ...inputData, [name]: value }) ? setButtonDisabled(false) : setButtonDisabled(true);

    }

    return (
        <div className='space-y-2'>
            <h2 className='font-bold text-sm'>{headline}</h2>

            <div className='relative flex items-center'>
                <input onChange={onUserInput} className='border border-black h-12 px-4 w-full placeholder:text-slate-500 placeholder:text-base' type="text" value={inputData?.[name]} name={name} placeholder={placeholder} maxLength={count ? 60 : ""} />
                {
                    count && (
                        <h3 className='absolute right-4 text-slate-500'>{60 - (inputData[name]?.length || 0)}</h3>
                    )
                }
            </div>

        </div>
    )
}

const SocialInput = ({ headline, placeholder = "", name, inputData, setInputData, leading, data, setButtonDisabled }) => {

    const onUserInput = (e) => {
        let { name, value } = e.target;

        if (value == "") value = undefined

        setInputData((prev => ({
            ...prev,
            social: {
                ...prev.social,
                [name]: value
            }

        })));

        isChanged(data, { ...inputData, social: { ...inputData.social, [name]: value } }) ? setButtonDisabled(false) : setButtonDisabled(true);

    }

    return (
        <div className='space-y-2'>
            <h2 className='font-bold text-sm'>{headline}</h2>

            <div className='relative flex items-center border border-black '>
                <h2 className='border-r border-black h-12 flex items-center px-4 bg-[#F7F9FA]'>{leading}</h2>
                <input onChange={onUserInput} className='h-12 px-4 w-full placeholder:text-slate-500 placeholder:text-base' type="text" value={inputData?.social?.[name]} name={name} placeholder={placeholder} />
            </div>

        </div>
    )
}

const isChanged = (data, inputData) => {

    let flag = false;

    const list1 = ["username", "headline", "bio", "language"];

    list1.forEach(val => {
        if (data[val] != inputData[val]) {
            flag = true;
            return;
        }
    });

    const list2 = ["facebook", "twitter", "youtube", "linkedIn"];

    list2.forEach(val => {

        if (data?.social?.[val] !== inputData?.social?.[val]) {
            flag = true;
            return;
        }
    });

    return flag;
}

function ProfilePicture() {

    const currImage = useSelector((state) => state?.auth?.data?.profileImage?.secure_url);

    return (
        <div className=''>
            <div className=' space-y-3 w-[46%]'>
                <h1 className='font-bold'>
                    Image preview
                </h1>

                <div className='border border-black flex flex-col items-center py-4 px-8 gap-2'>
                    <img className='size-60' src={currImage || "https://img-c.udemycdn.com/user/200_H/anonymous_3.png"} alt="" />
                    <h3 className='text-xs'>Your image should be at minimum 200x200 pixels and maximum 6000x6000 pixels.</h3>
                </div>

                <h1 className='font-bold'>
                    Add / Change Image
                </h1>

                <FileUpload type={"Image"} name={"avatar"} />

            </div>
        </div>
    )
}


function Profile() {

    const dispatch = useDispatch();

    const data = useSelector((state) => state.auth.data);

    const [inputData, setInputData] = useState({
        username: "",
        email: "",
        avatar: "",
        headline: "",
        bio: "",
        social: {
            twitter: "",
            linkedIn: "",
            facebook: "",
            youtube: "",
        },
        language: "en"
    })

    const [tab, setTab] = useState(0);

    const [ButtonDisabled, setButtonDisabled] = useState(true);

    const textRef = useRef(null);

    const handleUserInput = (e) => {

        const { name, value } = e.target;

        setInputData({
            ...inputData,
            [name]: value
        });

        isChanged(data, { ...inputData, [name]: value }) ? setButtonDisabled(false) : setButtonDisabled(true);
    }

    const onSave = () => {

        if (ButtonDisabled) return;

        const fields = { ...inputData };

        for (const key in fields) {
            if (data[key] === inputData[key]) delete fields[key];
        }

        dispatch(updateUserDetails(fields));

        setButtonDisabled(true);

    }

    useEffect(() => {
        dispatch(getUser());
    }, []);


    useEffect(() => {

        setInputData({
            username: data?.username || "",
            email: data?.email || "",
            avatar: "",
            bio: data?.bio,
            headline: data?.headline,
            social: {
                twitter: data?.social?.twitter,
                linkedIn: data?.social?.linkedIn,
                facebook: data?.social?.facebook,
                youtube: data?.social?.youtube,
            },
            language: data?.language
        });

    }, [data]);

    useEffect(() => {
        if (tab == 0 && data.role === "INSTRUCTOR") {

            textRef.current.style.height = "auto";
            textRef.current.style.height = `${textRef.current.scrollHeight}px`;
        }

    }, [data, tab])

    return (

        <>

            <div className='py-12 px-16 text-[#2D2F31]'>

                <h1 className='text-4xl merriweather-bold'>
                    Profile
                </h1>

                {/* tabs */}

                <div className='flex  font-bold  mt-4 items-center gap-5 border-b text-slate-900'>

                    <button onClick={() => setTab(0)} className={`h-14 flex items-center relative ${tab == 0 ? "select-tab" : "text-slate-500 hover:text-slate-900 duration-100"}`}>Brainy Profile</button>

                    <button onClick={() => setTab(1)} className={`h-14 flex items-center relative ${tab == 1 ? "select-tab" : "text-slate-500 hover:text-slate-900 duration-100"}`}>Profile Picture</button>

                </div>


                {
                    tab == 0 && <>
                        <div className='mt-4 flex gap-8'>

                            <div className='w-1/2 space-y-6 '>
                                <Input headline={"Name"} name={"username"} inputData={inputData} setInputData={setInputData} data={data} setButtonDisabled={setButtonDisabled} />

                                {data?.role == "INSTRUCTOR" && (<>
                                    <Input headline={"headline"} name={"headline"} inputData={inputData} count={true} setInputData={setInputData} placeholder='Instructor at Brainy' data={data} setButtonDisabled={setButtonDisabled} />

                                    {/* bio */}
                                    <div className='space-y-2 w-full '>
                                        <h2 className='font-bold text-sm'>Biography</h2>

                                        <div className='relative  border border-black'>
                                            <div className='space-x-4 text-xl px-3 border-b border-black'>
                                                <button className='p-2 '><MdFormatBold /></button>
                                                <button className='p-2 '><MdFormatItalic /></button>
                                            </div>

                                            <textarea ref={textRef} onInput={(e) => {
                                                e.target.style.height = "auto";
                                                e.target.style.height = `${e.target.scrollHeight}px`;
                                            }} onChange={handleUserInput} className='w-full resize-none p-4' name="bio" value={inputData?.bio} id=""></textarea>

                                        </div>

                                        <p className='text-xs'>To help learners learn more about you, your bio should reflect your Credibility, Empathy, Passion, and Personality. Your biography should have at least 50 words, links and coupon codes are not permitted.</p>

                                    </div>

                                    {/* language */}

                                    <div className='space-y-2'>
                                        <h2 className='font-bold text-sm'>Language</h2>

                                        <div className='relative  border border-black flex items-center'>

                                            <select onChange={handleUserInput} value={inputData.language} className='w-full appearance-none px-4 py-3' name="language" id="">
                                                <option value="" disabled>Select language</option>
                                                <option value="id">Bahasa Indonesia</option>
                                                <option value="de">Deutsch</option>
                                                <option value="en">English (US)</option>
                                                <option value="es">Español (España)</option>
                                                <option value="fr">Français (France)</option>
                                                <option value="it">Italiano</option>
                                                <option value="nl">Nederlands</option>
                                                <option value="pl">Polski</option>
                                                <option value="pt-br">Português (Brasil)</option>
                                                <option value="ro">Română</option>
                                                <option value="vi">Tiếng Việt</option>
                                                <option value="tr">Türkçe</option>
                                                <option value="ru">Русский</option>
                                                <option value="th">ภาษาไทย</option>
                                                <option value="zh">中文 (繁體)</option>
                                            </select>

                                            <MdKeyboardArrowDown className='absolute right-3 size-5 pointer-events-none ' />

                                        </div>

                                    </div>
                                </>)}
                            </div>

                            {
                                data?.role == "INSTRUCTOR" && (<>
                                    <div className='w-1/2 space-y-6 '>
                                        <SocialInput headline={"X"} name={"twitter"} inputData={inputData} placeholder='Username' setInputData={setInputData} leading={"http://www.x.com/"} data={data} setButtonDisabled={setButtonDisabled} />

                                        <SocialInput headline={"Facebook"} name={"facebook"} inputData={inputData} setInputData={setInputData} leading={"http://www.facebook.com/"} placeholder='Username' data={data} setButtonDisabled={setButtonDisabled} />

                                        <SocialInput headline={"LinkedIn"} name={"linkedIn"} inputData={inputData} setInputData={setInputData} leading={"http://www.linkedin.com/"} placeholder='Resource ID' data={data} setButtonDisabled={setButtonDisabled} />

                                        <SocialInput headline={"Youtube"} name={"youtube"} inputData={inputData} setInputData={setInputData} leading={"http://www.youtube.com/"} placeholder='Username' data={data} setButtonDisabled={setButtonDisabled} />
                                    </div>
                                </>)
                            }


                        </div>

                        <button onClick={onSave} disabled={ButtonDisabled} className={`text-white font-bold px-6 py-3 duration-150 mt-5 ${ButtonDisabled ? "cursor-not-allowed bg-slate-700" : "bg-slate-800 hover:bg-slate-700 "}`}>
                            Save
                        </button>
                    </>
                }

                {
                    tab == 1 && <div className='mt-5 space-y-4'>
                        <ProfilePicture />
                    </div>
                }

            </div>

        </>

    )
}

export default Profile
