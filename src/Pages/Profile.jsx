
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import HomeLayout from '@/Layouts/HomeLayout'
import { updateAvatar, updateUsername } from '@/Redux/Slices/AuthSlice'


function Profile() {

    const image = useSelector((state) => state.auth.data?.profileImage?.secure_url) || "https://cdn-icons-png.flaticon.com/128/1326/1326377.png"
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

            
        </HomeLayout>

    )
}

export default Profile
