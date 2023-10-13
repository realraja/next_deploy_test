'use client';

import { GlobalContext } from "@/context"
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import React,{useContext, useEffect, useState} from 'react'
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

const page = ({params}) => {

    const [userData,setUserData] = useState(null)
    const [loading,setLoading] = useState(true)
    
  const {user,isAuthUser} = useContext(GlobalContext)
  const {id} = params;



  const fetchUserProfile = async() =>{
      
    const {data} =  await axios.get(`/api/allusers/${id}`, {
      headers: {
        "Cache-Control": "no-cache",
        cache: "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });      

    if (data?.success) {
      setUserData(data?.user);
      setLoading(false);
    } else {
      setLoading(false);
      setUserData(user);
      toast.error('Please check your internet connection!!!', {
        position: toast.POSITION.TOP_RIGHT, 
      });
    }
        
        
}


  useEffect(()=>{
    fetchUserProfile();
  },[]);

  return (
    loading?(
        <div className="h-[90vh] items-center text-center flex"><PuffLoader className="m-auto"  size={'240px'} color={"#9224f0"} /> </div> 
    ):
    isAuthUser?(
        
            <ProfileData user={userData} />
    
    ):(
        <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-indigo-100 sm:text-5xl">You are not Logged In!</h1>
        <p className="mt-6 text-base leading-7 text-indigo-400">Please LogIn to view this page!</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="flex space-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In Now <ArrowRightIcon className="w-5" />
              </Link>
            </div>
        
      </div>
    </main>
    )
  )
}

const ProfileData = ({user}) =>(
    <div className="lg:flex min-h-[85vh] items-center">
      <div id="image" className="border-[2px] min-w-fit max-w-fit border-rose-500 m-auto my-16 rounded-full lg:mx-16 ">
        <img className="w-[50vw] h-[50vw] lg:h-[50vh] lg:w-[50vh] m-1 rounded-full " src={user?.photoURL} alt="rajesh" />
      </div>
      <div className="w-full my-5 text-center">
        <h1 className="text-3xl text-rose-500 bg-violet-500 w-fit m-auto p-4 rounded-xl">Namaste User</h1>

        <div className="flex justify-around m-auto my-4 p-5 text-3xl text-center bg-rose-400 w-[90%] md:w-[70%] rounded-md items-center ">
          <p className="font-bold">Name </p> <p>:</p> <p className="uppercase text-gray-100 font-extralight">{user?.name}</p>
        </div>

        <div className="flex justify-around m-auto my-4 p-5 text-3xl text-center bg-violet-500 w-[90%] md:w-[70%] rounded-md items-center ">
          <p className="font-bold">Email </p> <p>:</p> <p className=" text-gray-100 font-extralight">{user?.email}</p>
        </div>

        <div className="flex justify-around m-auto my-4 p-5 text-3xl text-center bg-rose-400 w-[90%] md:w-[70%] rounded-md items-center ">
          <p className="font-bold">Village </p> <p>:</p> <p className="uppercase text-gray-100 font-extralight">{user?.village}</p>
        </div>

        <div className="flex justify-around m-auto my-4 p-5 text-3xl text-center bg-violet-500  w-[90%] md:w-[70%] rounded-md items-center ">
          <p className="font-bold">Role </p> <p>:</p> <p className="uppercase text-gray-100 font-extralight">{user?.role}</p>
        </div>

        <div className="flex justify-around m-auto my-4 p-5 text-3xl text-center bg-rose-400  w-[90%] md:w-[70%] rounded-md items-center ">
          <p className="font-bold">Account Status </p> <p>:</p> <p className="uppercase text-gray-100 font-extralight">{user?.activated ? 'Verified': 'Unverified'}</p>
        </div>

        <div className="flex justify-around m-auto my-4 p-5 text-3xl text-center bg-violet-500 w-[90%] md:w-[70%] rounded-md items-center ">
          <p className="font-bold">Created Account </p> <p>:</p> <p className="uppercase text-gray-100 font-extralight">{user?.createdAt?.split('T')[0]} {user?.createdAt?.split('T')[1]?.split('.')[0]}</p>
        </div>
      </div>
    </div>
)

export default page
