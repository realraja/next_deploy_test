'use client';

import { GlobalContext } from "@/context"
import React,{useContext} from 'react'

const page = () => {
  const {user} = useContext(GlobalContext)

  return (
    <div className="lg:flex min-h-[85vh] items-center">
      <div id="image" className="border-[2px] min-w-fit max-w-fit border-rose-500 m-auto my-16 rounded-full lg:mx-16 ">
        <img className="w-[50vw] h-[50vw] lg:h-[50vh] lg:w-[50vh] rounded-full " src={user?.photoURL} alt="rajesh" />
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
}

export default page
