'use client'

import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { TrashIcon, UserMinusIcon , UserPlusIcon } from "@heroicons/react/24/outline"
import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "@/context"
import { useRouter } from "next/navigation";
import { UpdateUserStatus ,DeleteUserStatus} from "@/services/users"
import { toast } from "react-toastify"
import { PuffLoader } from "react-spinners"
import ComfirmButton from '@/components/ComfirmButton'
import axios from "axios"
  
  export default function Page() {
    const {user} = useContext(GlobalContext);
    
    const [loading,setLoading] = useState(true);
    const [usersData,setUsersData] = useState([]);
    const [comfirmData, setComfirmData] = useState(false);
     const [comfirmState, setComfirmState] = useState(false);
     const [deleteId, setDeleteId] = useState('');

    const router = useRouter();

    // console.log(usersData);

    const handleDeleteUser = async(id)=>{
      const data = await DeleteUserStatus(id);
      // console.log(data);
    if(data.success){
      setDeleteId('');
    }else{
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT, 
      });
    }
    }

    if(comfirmData){
      handleDeleteUser(deleteId);
      setComfirmData(false);
    }
    const handleDelete = async(id) =>{
      setComfirmState(true);   
      setDeleteId(id);   
    }
    const handleUpdate = async(id) =>{
      // console.log('clicked update',id);
      setDeleteId(id);
      const data = await UpdateUserStatus(id);
      if(data.success){
        setDeleteId('');
      }else{
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT, 
        });
      }
      
      
    }


    useEffect(()=>{

      const fetchUsers = async() =>{
        
        // const data =  await getAllUsers();
        const res =  await axios.get('/api/allusers',{
          // query URL without using browser cache
          headers: {
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        console.log(res?.data?.success);       

        if (res?.data?.success) {
          setUsersData(data.data);
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

    fetchUsers();
      

    },[deleteId]);
    return (
      loading ?<div className="h-[90vh] items-center text-center flex"><PuffLoader className="m-auto"  size={'240px'} color={"#9224f0"} /> </div> :
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
                      usersData.map((item,index)=>(
                          item?.email !== user?.email && !item?.hidden ?(<>
                            <UserTableBody index={index+1} key={index} img={item?.photoURL} name={item?.name} village={item?.village} email={item?.email} status={item?.activated} createdAt={item?.createdAt.split('T')[0].split('-')} handleDelete={()=>handleDelete(item?._id)}  handleUpdate={()=>handleUpdate(item?._id) } />
                            </> ):null

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
    )
  }
  

  const UserTableBody = ({img,name,village,email,status,createdAt,index,handleUpdate,handleDelete}) =>(
    
      <tr className="hover:bg-gray-900">
          
          <td className="p-4 hidden lg:table-cell w-4 whitespace-nowrap text-base font-medium text-gray-50">{index}.</td>

          <td className="p-2 md:p-4 flex items-center whitespace-nowrap md:space-x-6 md:mr-12 lg:mr-0">
            <img className="h-10 hidden md:table-cell w-10 rounded-full"
              src={img} alt={name} />
            <div className="text-sm font-normal text-gray-400 m-auto md:m-0">
              <div className="text-base font-semibold text-gray-50">{name}</div>
              <div className="text-sm font-normal text-gray-400 ">
                <span className="hidden md:block">[{email}]</span>
                <span className="md:hidden">[{village}]</span>
              </div>
            </div>
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