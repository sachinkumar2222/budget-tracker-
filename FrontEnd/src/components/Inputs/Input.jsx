import React, { useState } from 'react'
import {FaRegEye,FaRegEyeSlash} from "react-icons/fa"

const Input = ({value, label, onChange, type, placeholder}) => {
    const [showPass,setShowPass] = useState(false);
    
    const toggleShowPass = () => {
        setShowPass(!showPass);
    }

  return (
    <div>
        <label className='text-[13px] text-slate-800'>{label}</label>
        <div className='input-box'>
            <input 
              type={type === 'password'? showPass ? 'text' : 'password' : type} 
              placeholder={placeholder}
              value={value}
              onChange={(e)=> onChange(e)}
              className='w-full bg-transparent outline-none'
            />
            {type==='password' && (
                <>
                {showPass ? (
                   <FaRegEye
                   size={22}
                   onClick={()=> toggleShowPass() }
                   className="cursor-pointer text-primary"/>   
                ):(
                   <FaRegEyeSlash
                   size={22}
                   onClick={()=> toggleShowPass() }
                   className="cursor-pointer text-slate-400"/>  
                )}
                </> 
            )}
        </div>
    </div>
  )
}

export default Input