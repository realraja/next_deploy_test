"use client";
import { GlobalContext } from "@/context";
import { updateAMessage } from "@/services/message";
import { EnvelopeIcon,EnvelopeOpenIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";


export const ExportMessage = () =>{
    const {user} = useContext(GlobalContext);

    return(

        user?.activated ? 
        (
            user?.role === 'admin'?(
                <AdminMessage />
            ):(
                <EmployeeMessage />
            )
        ):(
            <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-rose-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-rose-100 sm:text-5xl">You are not verified</h1>
        <p className="mt-6 text-base leading-7 text-rose-400">Please contact to admin to verify your account!!</p>
        
      </div>
    </main>
        )
    )
}



const AdminMessage = () => {

    const [loading,setLoading] = useState(true);
    const [MessageData,setMessageData] = useState([]);
    const [unreaderMessage,setUnreaderMessage] = useState(true);
    const [id,setId] = useState('');

  const handleClickOnCheck = async (id) =>{
    setId(id);
    const data = await updateAMessage(id);

    if(data.success){
        setId('');
      }else{
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT, 
        });
      }
  }
  useEffect(()=>{

    const fetchUsers = async() =>{
      
      const {data} =  await axios.get('/api/message', {
        // query URL without using browser cache
        headers: {
          "Cache-Control": "no-cache",
          cache: "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });

      console.log(data);       

      if (data?.success) {
        setMessageData(data.data);
        setLoading(false);
      } else {
        // console.log(data)
        setLoading(false);
        toast.error('Please check your internet connection!!!', {
          position: toast.POSITION.TOP_RIGHT, 
        });
      }
          
          
  }

  fetchUsers();
    

  },[id]);

  return (loading ?<div className="h-[90vh] items-center text-center flex"><PuffLoader className="m-auto"  size={'240px'} color={"#9224f0"} /> </div> :<>
  <div className="flex justify-center space-x-5">
    <button onClick={()=>setUnreaderMessage(true)} className={`flex ${!unreaderMessage?"bg-violet-800 text-gray-400 hover:bg-violet-500 ":'bg-violet-500 '} rounded-lg p-2 m-2 space-x-2 items-center`}>
        <EnvelopeIcon className="w-8"/>
        <span>Messages</span>
    </button>
    <button onClick={()=>setUnreaderMessage(false)} className={`flex ${unreaderMessage?"bg-violet-800 text-gray-400 hover:bg-violet-500":'bg-violet-500'} rounded-lg p-2 m-2 space-x-2 items-center`}>
        <EnvelopeOpenIcon className="w-8"/>
        <span>Readed Messages</span>
    </button>
  </div>

    <div>
        {
                MessageData.map((item)=>(
                    item.role !== "admin"? (
                        unreaderMessage?(
                            !item.ischeck?(
                                <AdminMessages user={item} key={item._id} handleClickOnCheck={()=>handleClickOnCheck(item?._id)} />
                            ):null
                        
                            ):(
                                item.ischeck?(
                                    <AdminMessages user={item} hidden={true} key={item._id} handleClickOnCheck={()=>handleClickOnCheck(item?._id)} />
                                ):null
                
                            )
                    ):null
                ))
        }
    </div>
    </>);
};



const EmployeeMessage = () => {

    const [loading,setLoading] = useState(true);
    const [MessageData,setMessageData] = useState([]);
  useEffect(()=>{

    const fetchUsers = async() =>{
      
      const {data} =  await axios.get('/api/message', {
        headers: {
          "Cache-Control": "no-cache",
          cache: "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });      

      if (data?.success) {
        setMessageData(data.data);
        setLoading(false);
      } else {
        // console.log(data)
        setLoading(false);
        toast.error('Please check your internet connection!!!', {
          position: toast.POSITION.TOP_RIGHT, 
        });
      }
          
          
  }

  fetchUsers();
    

  },[]);

  return (loading ?<div className="h-[90vh] items-center text-center flex"><PuffLoader className="m-auto"  size={'240px'} color={"#9224f0"} /> </div> :<>
  <div className="flex justify-center space-x-5">
    <button className={`flex bg-violet-500  rounded-lg p-2 m-2 space-x-2 items-center`}>
        <EnvelopeIcon className="w-8"/>
        <span>Messages</span>
    </button>
  </div>

    <div>
        {
                MessageData.map((item)=>(
                    item?.role === "admin"?(
                        <AdminMessages user={item} hidden={true} key={item._id} />
                    ):null
                
                        
                ))
     
        }
    </div>
    </>);
};



const AdminMessages = ({ user,handleClickOnCheck,hidden }) => (
    <div className="flex flex-col m-8">
      <div className="min-h-[70px] md:flex  m-1 w-full  border-2 border-violet-500 rounded-md">
        <div className="flex-initial flex justify-center items-center space-x-4 md:space-x-0 md:flex-col md:min-w-[130px] md:max-w-[130px] text-center m-auto p-2 mx-2 border-b-2 md:border-b-0 md:border-r-2 border-gray-400">
          <Link href={`/profile/${user.user}`}>
          <img
            src={user?.img}
            className="w-[45px] h-[45px] mx-5  md:m-auto rounded-full flex-initial "
            alt={user?.name}
          />
          </Link>
          <div className="">
  
          <span className="font-light md:text-sm uppercase break-words break-all">{user?.name} </span>
          <span className="text-gray-300 break-words md:hidden">[{user?.email}]</span>
          </div>
          
        </div>
  
        <div className="w-full text-center md:text-start break-all p-2 flex-initial">
          <div className="md:flex border-b-2 md:border-b-0">
          <h1>{user.subject}</h1>
          <span className="font-extralight text-end ml-auto md:text-sm uppercase break-words break-all">[{user?.createdAt}] </span>

          </div>
          <p className="font-light break-words break-all text-sm ">
            {user?.message}
          </p>
        </div>
  
        <div className={`${hidden?'hidden':null} flex-initial flex md:flex-col justify-center md:justify-end max-w-lg  text-start p-5 m-auto md:border-l-2 border-gray-400`}>
          <button className="bg-violet-500 flex space-x-2  hover:bg-green-500 rounded-md p-3" onClick={handleClickOnCheck}>
              <CheckIcon className="w-6" />
              <span className="md:hidden">Readed</span>
           </button>
        </div>
      </div>
    </div>
  );

