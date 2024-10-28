import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { changePassword } from "@/Redux/Slices/AuthSlice"

export function ChangePassword() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [data, setData] = useState({
        currentpassword:"",
        newpassword:""
    });
    
    function handleUserInput(e){
        
        const {name, value} =  e.target;

        setData({
            ...data,
            [name]:value
        })
    }

    async function onSave(){
        
      const res = await dispatch(changePassword({
        oldPassword: data.currentpassword,
        newPassword: data.newpassword
      }));

      if(res.payload){
        navigate("/")        
      }

    }


  return (
    <Dialog c>
      <DialogTrigger asChild>
        <Button variant="" onClick={ ()=> setData({currentpassword:"",
        newpassword:""})}>Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentpassword" className="text-right">
              Current Password
            </Label>
            <Input name="currentpassword" onChange={handleUserInput} id="currentpassword" value={data.currentpassword} className="col-span-3" type="password" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newpassword" className="text-right">
              New Password
            </Label>
            <Input name="newpassword" onChange={handleUserInput} id="newpassword" value={data.newpassword} className="col-span-3" type="" />
          </div>
          
        </div>
        <DialogFooter>
          <Button onClick={onSave} type="submit">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
