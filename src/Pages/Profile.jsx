import { Label } from '@radix-ui/react-label'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import HomeLayout from '@/Layouts/HomeLayout'
import { updateAvatar, updateUsername } from '@/Redux/Slices/AuthSlice'
import { ChangePassword } from '@/components/ChangePassword'


function Profile() {

    const image = useSelector((state) => state.auth.data.profileImage.secure_url) || "https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
    console.log("updated", image);
    const dispatch = useDispatch();

    const userdata = useSelector((state) => state.auth.data);
    
    const [previewImage, setPreviewImage] = useState(image);
    
    const [ButtonDisabled, setButtonDisabled] = useState(true);

    const [data, setData] = useState({
        username: userdata.username,
        email: userdata.email,
        avatar: ""
    })

        ;

    function handleUserInput(e) {
        const { name, value } = e.target;


        setData({
            ...data,
            [name]: value
        })


        setButtonDisabled(false);




    }

    function getImage(e) {

        const uploadImage = e.target.files[0];

        setData({
            ...data,
            avatar: uploadImage
        });

        const fileReader = new FileReader();

        fileReader.readAsDataURL(uploadImage);

        fileReader.addEventListener("load", function () {
            setPreviewImage(this.result)
        });

        setButtonDisabled(false)

    }



    async function onSave() {

        if ( data.username !== userdata.username) {
            const res = await dispatch(updateUsername(data.username));

            if (res.payload) {
                setButtonDisabled(true)
            }
        }

        if(data.avatar){
            const formData = new FormData;

            formData.append('avatar',data.avatar);

            const res = await dispatch( updateAvatar(formData) )

            if(res.payload){
                setPreviewImage(res.payload.data.profileImage.secure_url);

                setButtonDisabled(true)


            }
        }



    }



    return (

        <HomeLayout>

            <div className='flex items-center justify-center h-[84.6vh] text-xl'>
                <Card className="w-[650px]">
                    <CardHeader className="">
                        {/* <h1 className='font-semibold text-2xl'> Profile</h1> */}
                        <div className="avatar flex justify-center ">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <label htmlFor="image">
                                    <img className='w-[100px] h-[100px] ' src={previewImage} />
                                    <div className="badge badge-neutral w-[10%] h-[25%] absolute top-[90%] right-[45%]   hover:cursor-pointer">Edit</div>
                                </label>
                                <input accept=".jpg, .jpeg, .png" onChange={getImage} className='hidden' id='image' type="file" />


                            </div>



                        </div>


                    </CardHeader>
                    <CardContent>
                        <form >
                            <div className="grid w-[80%] items-center gap-4">

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">Email</Label>
                                    <Input name="email" type={"email"} className={"px-4 rounded-md  disabled:opacity-70"} id="email" value={data.email} disabled />
                                </div>

                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Username</Label>
                                    <Input name="username" type={"text"} className={"px-4 rounded-md"} id="name" value={data.username} onChange={handleUserInput} />
                                </div>



                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex space-x-[40%]">
                        <Button onClick={onSave} className={"w-[20%] ml-[10px] bg-slate-800 hover:bg-slate-700 disabled:bg-slate-600"} disabled={ButtonDisabled}>Save</Button>

                        <ChangePassword />
                    </CardFooter>
                </Card>
            </div>
        </HomeLayout>

    )
}

export default Profile
