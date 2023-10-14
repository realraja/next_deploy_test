'use client'

import { GlobalContext } from '@/context';
import { UpdateUserStatus } from '@/services/users';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';


const page = () => {
    const [otp,setOtp] = useState('');
    const {user} = useContext(GlobalContext);
    const router = useRouter()

    const handleVerifyOtp = async() =>{
        if(otp === '804382'){
            const data = await UpdateUserStatus(user?._id);
            if(data.success){
                toast.success('You are Successfully Verified!', {
                    position: toast.POSITION.TOP_RIGHT,
                })
                router.push('/')
            }else{
                toast.error('Error while verifing!!', {
                position: toast.POSITION.TOP_RIGHT, 
                });
            }
        }else{
            toast.error('Your OTP is incorrect please enter right!!', {
                position: toast.POSITION.TOP_RIGHT, 
            });
        }
    }


  return (
    <div className='flex flex-col space-y-5 text-center min-h-[80vh] items-center justify-center'>
      <h1>Varification Account</h1>
      <p className='text-green-400'>if otp is not recived please check your email's spam section!!</p>

      <div className='flex flex-col space-y-8 justify-center items-center '>
        <input className='w-32 h-10 bg-gray-800' value={otp} onChange={(e)=> setOtp(e.target.value)} type="number" />
        <button className='bg-black p-4 px-6 text-lg' onClick={handleVerifyOtp}>Submit</button>
      </div>
    </div>
  )
}

export default page
