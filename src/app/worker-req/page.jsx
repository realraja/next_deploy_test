'use client'

import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { TrashIcon, UserMinusIcon , UserPlusIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import { UpdateUserStatus ,DeleteUserStatus} from "@/services/users"
import { toast } from "react-toastify"
import { PuffLoader } from "react-spinners"
import ComfirmButton from '@/components/ComfirmButton'
import axios from "axios"
import Link from "next/link"
  
  export default function Page() {
    const {user} = useContext(GlobalContext);
    
    const [loading,setLoading] = useState(true);
    const [comfirmData, setComfirmData] = useState(false);
     const [comfirmState, setComfirmState] = useState(false);
     const [deleteId, setDeleteId] = useState('');
     const [allEmployees, setAllEmployees] = useState(null);

    const fetchUsers = async() =>{
      const {data} =  await axios.get('/api/register', {
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
        setLoading(false);
        setAllEmployees(data?.data);
      } else {
        // console.log(data)
        setLoading(false);
        toast.error('Please check your internet connection!!!', {
          position: toast.POSITION.TOP_RIGHT, 
        });
      }
          
          
    }


    const handleDeleteUser = async()=>{
      const data = await DeleteUserStatus(deleteId);
      if(data.success){
        setDeleteId('');
        fetchUsers();
      }else{
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT, 
        });
    }
    }

    if(comfirmData){
      handleDeleteUser();
      setComfirmData(false);
    }

    const handleUpdate = async(id) =>{
      const data = await UpdateUserStatus(id);
      if(data.success){
        fetchUsers();
      }else{
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT, 
        });
      }
      
      
    }


    useEffect(()=>{


    fetchUsers();
      

    },[]);
    return (
      loading ?<div className="h-[90vh] items-center text-center flex"><PuffLoader className="m-auto"  size={'240px'} color={"#9224f0"} /> </div> :(
        user?.role === 'admin'?(
      <main>        
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="align-middle inline-block min-w-full">
              <div className="shadow overflow-hidden">
                <table className="table-fixed min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-900">
                    <tr>
                      {/* <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <label className="sr-only">#</label>
                        </div>
                      </th> */}
                      <th scope="col" className="p-4 hidden lg:table-cell text-left text-xs font-medium text-gray-400 uppercase">
                        S.N.
                      </th>
                      <th scope="col" className="p-4 md:text-left text-xs font-medium text-gray-400 uppercase">
                        Name
                      </th>
                      <th scope="col" className="p-4 hidden md:table-cell text-left text-xs font-medium text-gray-400 uppercase">
                        Village
                      </th>
                      <th scope="col" className="p-4 hidden lg:table-cell text-left text-xs font-medium text-gray-400 uppercase">
                        Created
                      </th>
                      <th scope="col" className="p-4 md:text-left text-xs font-medium text-gray-400 uppercase">
                        Status
                      </th>
                      <th scope="col" className="p-4">Edit
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-700 text-white divide-y divide-gray-200">

                    {
                      allEmployees.map((item,index)=>(
                         item?.hidden ?(<UserTableBody index={index+1} key={index} id={item?._id} img={item?.photoURL} name={item?.name} village={item?.village} email={item?.email} status={item?.activated} createdAt={item?.createdAt.split('T')[0].split('-')} handleDelete={()=>{  setDeleteId(item?._id); setComfirmState(true);}}  handleUpdate={()=>handleUpdate(item?._id) } />
                            ):null

                      ))
                    }
                  
                     {/* <UserTableBody img={user?.img} name={'rajesh'} village={'mohanpura'} email={'rajesh@gmail.com'} status={false} /> */}
                  </tbody>
                </table>

                <div className="min-h-20 p-5 my-5 bg-gray-700 flex text-center items-center justify-center">
                  <p className="text-3xl font-extralight text-red-500 ">Note:If you want any account's backup please contact to developer!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ComfirmButton
        comfirmState={comfirmState}
        setComfirmState={setComfirmState}
        setComfirmData={setComfirmData}
        buttonText='Delete Now'
      />
        
      </main>
        ):(
          <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-50 sm:text-5xl">You are not admin</h1>
          <p className="mt-6 text-base leading-7 text-gray-400">Sorry, Only admin can view this page!!</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
        )
      )
    )
  }
  

  const UserTableBody = ({img,id,name,village,email,status,createdAt,index,handleUpdate,handleDelete}) =>(
    
      <tr className="hover:bg-gray-900">
          
          <td className="p-4 hidden lg:table-cell w-4 whitespace-nowrap text-base font-medium text-gray-50">{index}.</td>

          <td className="p-2 md:p-4 flex items-center whitespace-nowrap md:space-x-6 md:mr-12 lg:mr-0">
           <Link href={`/profile/${id}`}>
            <img className="h-10 hidden md:table-cell w-10 rounded-full"
              src={img} alt={name} />
            <div className="text-sm font-normal text-gray-400 m-auto md:m-0">
              <div className="text-base font-semibold text-gray-50">{name}</div>
              <div className="text-sm font-normal text-gray-400 ">
                <span className="hidden md:block">[{email}]</span>
                <span className="md:hidden">[{village}]</span>
              </div>
            </div>
            </Link>
          </td>
          <td className="p-4 hidden md:table-cell whitespace-nowrap text-base font-medium text-gray-50">{village}</td>
          <td className="p-4 hidden lg:table-cell whitespace-nowrap text-base font-medium text-gray-50">{createdAt[2]*1}-{createdAt[1]*1}-{createdAt[0]}</td>
          <td className="p-2 md:p-4  whitespace-nowrap text-base font-normal text-gray-50">
           {
            status ?(
              <div className="flex items-center">
                <CheckBadgeIcon className="h-6 w-6 rounded-full text-green-400 m-auto md:m-0" />
                <span className="hidden md:table-cell">Active</span>
              </div>
            ):(
              <div className="flex items-center">
                <XCircleIcon className="h-6 w-6 rounded-full  bg-red-500 m-auto md:m-0 md:mr-2" />
                <span className="hidden md:table-cell">Deactive</span>
              </div>
            )
           } 
          </td>
          <td className="p-4 whitespace-nowrap ">
            <div className="flex justify-around">
              {
                !status?(
                  <button type="button" onClick={handleUpdate} data-modal-toggle="user-modal"
                    className="text-white m-1 bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center ">
                    <UserPlusIcon className="h-5 w-5 mx-2" />
                    <span className="hidden md:block">Activate</span>
                    
                  </button>
                ):(
                  <button type="button" onClick={handleUpdate} data-modal-toggle="user-modal"
                    className="text-white m-1 bg-violet-600 hover:bg-violet-800 focus:ring-4 focus:ring-violet-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center ">
                    <UserMinusIcon className="h-5 w-5 mx-2" />
                    <span className="hidden md:block">Deactivate</span>
                    
                  </button>
                )
              }

              <button type="button" onClick={handleDelete} data-modal-toggle="delete-user-modal"
              className="text-white m-1 bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center ">
              <TrashIcon className="h-5 w-5 mx-2"/>
              <span className="hidden md:block">Delete user</span>
            </button>
            </div>
          </td>
        </tr>
  )