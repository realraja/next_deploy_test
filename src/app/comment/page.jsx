"use client";
import ComponentLevelLoader from "@/components/Loader/componentlevel";
import { GlobalContext } from "@/context";
import { addNewComment } from "@/services/comment";
import { updateAMessage } from "@/services/message";
import { ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "react-toastify";

const page = () => {

    const [loading,setLoading] = useState(true);
    const [MessageData,setMessageData] = useState([]);
    const [comment,setComment] = useState('');

  const { user,componentLevelLoader,setComponentLevelLoader } = useContext(GlobalContext);

  const router = useRouter();

  const fetchUsers = async() =>{
      
    // const data =  await getAllUsers();
    const {data} =  await axios.get('/api/comment', { cache: false });

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
      return router.push('/')
    }
        
        
}

  const handleOnClick = async() =>{
    if(!user){
        toast.error('Login to send message', {
            position: toast.POSITION.TOP_RIGHT, 
        });
        setComponentLevelLoader({ loading: false, id: "" });
        router.push('/login');
        return;
    }
    setComponentLevelLoader({ loading: true, id: "" });
    
    const res = await addNewComment(comment,user?.email);

    console.log(res);

    if (res.success) {
      
    toast.success(res.message, {
        position: toast.POSITION.TOP_RIGHT, 
    });
    setComment('');
    fetchUsers();
    setComponentLevelLoader({ loading: false, id: "" });
    } else {
    toast.error(res.message, {
        position: toast.POSITION.TOP_RIGHT,
    });
    setComponentLevelLoader({ loading: false, id: "" });
    }
}
// console.log(MessageData)
  useEffect(()=>{



  fetchUsers();
    

  },[]);

  return (!user?.hidden?
    (loading ?<div className="h-[90vh] items-center text-center flex"><PuffLoader className="m-auto"  size={'240px'} color={"#9224f0"} /> </div> :<>
  <div className="flex justify-center space-x-5">

  <section className= "bg-gray-900 w-[85%] md:w-[70%]">
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center  text-white">Comment Us</h2>
            
                <div className="space-y-8">
                
                <div className="sm:col-span-2">
                    <label for="comment" className="block mb-2 text-sm font-medium  text-gray-400">Your comment</label>
                    <textarea id="comment" value={comment} onChange={(e)=>setComment(e.target.value)} rows="6" className="block p-2.5 w-full text-sm  rounded-lg shadow-sm border  focus:ring-primary-500 focus:border-primary-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                </div>
                <button type='submit'  onClick={handleOnClick} className="disabled:opacity-50 py-3 px-5 text-sm font-medium text-center bg-black text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800" disabled={comment === '' || comment.trim() === ""}>
                    {componentLevelLoader && componentLevelLoader.loading ? (
                    <ComponentLevelLoader
                      text={"Sending"}
                      color={"#ffffff"}
                      loading={
                        componentLevelLoader && componentLevelLoader.loading
                      }
                    />
                  ) : (
                    "Send message"
                  )}</button>
                </div>
        </div>
      </section>

   
  </div>
  <div className="flex justify-center space-x-5">
  <button  className={`flex bg-violet-500  rounded-lg p-2 m-2 space-x-2 items-center`}>
        <ChatBubbleBottomCenterIcon className="w-8"/>
        <span>Comments</span>
    </button>
  </div>

    <div>
        {
            MessageData.map((item)=>(
                <AdminMessages user={item}  key={item._id}  />
          
              
                  
          ))
        }
    </div>
    </>):(
      <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-rose-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-rose-100 sm:text-5xl">Your Account is Blocked</h1>
        <p className="mt-6 text-base leading-7 text-rose-400">Please contact to admin to Unblock your account!!</p>
        
      </div>
    </main>
    )
  );
};

const AdminMessages = ({ user }) => (
  <div className="flex flex-col m-8">
    <div className="md:min-h-[70px] max-sm:hidden sm:hidden md:flex  m-1 w-full  border-2 border-violet-500 rounded-md">
      <div className="flex-initial flex justify-center items-center  flex-col md:min-w-[130px] md:max-w-[130px] text-center m-auto md:p-2 md:mx-2   border-r-2 border-gray-400">
      <Link href={`/profile/${user?.user}`}>
        <img
          src={user?.img}
          className="w-[45px] h-[45px]  md:m-auto rounded-full flex-initial "
          alt={user?.name}
        />
        </Link>
        <div className="m-auto">

        <span className="font-light hidden md:block md:text-sm uppercase break-words break-all">{user?.name} </span>
        
        </div>
      </div>

      <div className="w-full text-start break-all  p-2 flex-initial ">
        <div className="flex justify-between">
        <p className="text-gray-500 text-sm italic">{user.email}</p>
        <span className="text-gray-500 ">
        {user?.createDate[3]}:{user?.createDate[4]}[{user?.createDate[0]}-{user?.createDate[1]}-{user?.createDate[2]}]
      </span>
        </div>
        <p className="font-extralight break-words break-all text-xl  ">
          {user?.comment}
        </p>
      </div>

      
    </div>


    <div className="flex flex-col md:hidden m-1 w-full  border-2 border-violet-500 rounded-md">
      <div className="flex-initial flex justify-start ">
      
      <Link href={`/profile/${user?.user}`}>
        <img
          src={user?.img}
          className="w-[45px] h-[45px] m-3  rounded-full  "
          alt={user?.name}
        />
       </Link>
        
        <div className="px-3 my-auto border-l-2">
          <p className="uppercase">{user?.name}
          <span className="text-gray-500">
        [{user?.createDate[0]}-{user?.createDate[1]}-{user?.createDate[2]}]
      </span></p>
          <p className="text-gray-500 ">[{user?.email}]</p>
        </div>
        
      </div>

      <div className="w-full text-start break-all  p-2 flex-initial ">
        <p className="font-extralight break-words break-all text-xl  ">
          {user?.comment}
        </p>
      </div>

      
    </div>
  </div>
);

export default page;
