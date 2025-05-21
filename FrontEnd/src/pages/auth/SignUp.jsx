import React, { useState } from 'react'
import AuthLayout from "../../components/layout/AuthLayout"
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'


const SignUp = () =>{
    const [profilPic,setProfilePic] = useState(null);
    const [fullName,setFullName] = useState("");
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");

    const [error,setError] = useState(null)

    const nevigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();

        let profilImageUrl = "";
        if(!fullName){
            setError("enter your full name.")
            return
        }

        if(!validateEmail(email)){
            setError("Please enter a valid email address")
            return;
        }
        
        if(!password){
           setError("Please enter the assword")
           return;
        }
        
        setError("")
    }


    return (
        <AuthLayout>
           <div className='lg:w-[100%] h-auto md:h-full mt-10 md:mt-10 flex flex-col justify-center'>
            <h3 className='text-xl font-semibold text-black'>Create an account</h3>
            <p className='text-xs text-shadow-neutral-700 mt-[5px] mb-6'>join us today by entering your details below.</p>
          
            <form onSubmit={handleSignUp}>
                 
                <ProfilePhotoSelector image={profilPic} setImage={setProfilePic}/>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Input 
                    type="text"
                    value={fullName}
                    placeholder="sachin"
                    onChange={({target})=> setFullName(target.value)}
                    label="Full Name"
                    />

                    <Input 
                    type="text"
                    value={email}
                    onChange={({target})=> setEmail(target.value) } 
                    label= "Email Address"
                    placeholder='sachin@gmail.com'
                    />
                    <div className='col-span-2'>
                        <Input 
                        type="password"
                        value={password}
                        onChange={({target})=> setPassword(target.value) } 
                        label= "Password"
                        placeholder='min 8 character'
                        />
                    </div> 
                </div>

                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                <button type='submit' className='btn-primary'>
                    SIGNUP
                </button>

                <p className='text-[13px] text-slate-800 mt-3'>
                 Already have an account?{" "}
                  <Link className='font-medium text-primary underline' to="/login">
                    Login
                  </Link>
                </p>
            </form>
           </div>
        </AuthLayout>
    )
}

export default SignUp;