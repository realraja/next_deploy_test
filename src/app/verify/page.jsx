'use client'

import ComponentLevelLoader from '@/components/Loader/componentlevel';
import { GlobalContext } from '@/context';
import { UpdateUserStatus } from '@/services/users';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';


const page = () => {
    const [otp,setOtp] = useState('');
    const [componentLevelLoader2, setComponentLevelLoader2] = useState({
      loading: false,
      id: "",
  });


    const {user,setComponentLevelLoader,componentLevelLoader,fetchAuthUserData} = useContext(GlobalContext);
    const router = useRouter()

    if(user?.activated) {
      router.push('/')
    }

    if(otp.length > 6){
      setOtp(otp.slice(0,6))
    }


    const handleVerifyOtp = async() =>{
      setComponentLevelLoader2({ loading: true, id: "" })

      const{data} = await axios.post('/api/sendmail/checkotp', {
        email: user?.email,
        otp,
      })
      
      if(data.success){
        const data2 = await UpdateUserStatus(user?._id);
        if(data2.success){
          setComponentLevelLoader2({ loading: false, id: "" })
            toast.success('You are Successfully Verified!', {
                position: toast.POSITION.TOP_RIGHT,
            })
            fetchAuthUserData();
            router.push('/')
        }else{
           setComponentLevelLoader2({ loading: false, id: "" })
            toast.error('Error while verifing!!', {
            position: toast.POSITION.TOP_RIGHT, 
            });
        }
      }else{
        setComponentLevelLoader2({ loading: false, id: "" })
          toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT, 
          });
      }
  }
    // console.log(otp.length);

    // const checkLenght = () =>{
    //   if(otp.length === 6){
    //     setBtnDisable(false);
    //     // handleVerifyOtp();
    //   }else{
    //     setBtnDisable(true);
    //   }
    // }

    function isValidForm() {
      return otp &&
        otp.length === 6 
        ? true
        : false;
    }

    const handalSendOtp =async ()=>{
      setComponentLevelLoader({ loading: true, id: "" });
      const{data} = await axios.post('/api/sendmail', {
        email: user?.email,
      })
      console.log(data)
      if (data?.success) {
        toast.success(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
        setComponentLevelLoader({ loading: false, id: "" });
      } else {
        // console.log(data)
        setcomponentLevelLoader({ loading: false, id: "" });
        toast.error(data?.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }


    

  
   

  return (
    <div className="h-screen py-20 px-3">
    <div className="container mx-auto">
        <div className="max-w-sm mx-auto md:max-w-lg">
            <div className="w-full">
                <div className="bg-gray-700 h-80 py-3 rounded text-center">
                      <h1 className="text-2xl font-bold text-green-500">OTP Verification</h1>
                      <div className="flex flex-col mt-4">
                          <span >Enter the OTP you received at</span>
                          <span className="font-bold">{user?.email.slice(0,3)}*****{user?.email.slice(-12)}</span>
                      </div>
                      
                      <div  className="flex flex-row justify-center text-center px-2 mt-5">
                          <input className="tracking-wider m-2 text-xl border bg-gray-700 h-10 w-44 text-center form-control rounded" type="number" maxLength={'6'} value={otp} onChange={(e)=>{setOtp(e.target.value); }}  /> 
                      </div>
                      
                      <div className="flex justify-center text-center mt-5">
                      <button
                onClick={handleVerifyOtp}
                className=" disabled:opacity-50 flex space-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={!isValidForm()}
              >
                {componentLevelLoader2 && componentLevelLoader2.loading ? (
                <ComponentLevelLoader
                  text={"Verifying"}
                  color={"#ffffff"}
                  loading={componentLevelLoader2 && componentLevelLoader2.loading}
                />
              ) : (
                'Submit'
              )}
                
              </button>
                      </div>

                      <div className="flex justify-center text-center mt-5">
                          <button onClick={handalSendOtp} className="flex items-center text-rose-600 hover:text-rose-900 cursor-pointer"><span className="font-bold">
                          {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  text={"Resending"}
                  color={"	#FF0000"}
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : (
                'Resend OTP'
              )}
                            </span></button>
                      </div>
                </div>
            </div>
        </div>
    </div>
</div>
    // <div className='flex flex-col space-y-5 text-center min-h-[80vh] items-center justify-center'>
    //   <h1>Varification Account</h1>
    //   <p className='text-green-400'>if otp is not recived please check your email's spam section!!</p>

    //   <div className='flex flex-col space-y-8 justify-center items-center '>
    //     <input className='w-32 h-10 bg-gray-800' value={otp} onChange={(e)=> setOtp(e.target.value)} type="number" />
    //     <button className='bg-black p-4 px-6 text-lg' onClick={handleVerifyOtp}>Submit</button>
    //   </div>
    // </div>
  )
}

export default page
