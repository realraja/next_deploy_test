"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions, userNavigation } from "@/utiles";
import CommonModal from "../CommonModal";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import ComfirmButton from "../ComfirmButton";

// const user = {
//   name: 'Tom Cook',
//   email: 'tom@example.com',
//   imageUrl:
//     'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
// }

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function index({ children }) {
  const { user, isAuthUser, setUser, setIsAuthUser } =
    useContext(GlobalContext);

  const [comfirmData, setComfirmData] = useState(false);
  const [comfirmState, setComfirmState] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  // console.log(comfirmData,comfirmState);


  const handleLogout = () => {
    console.log("rajesh@gmail.com");
    setComfirmState(true);
  };
  if (comfirmData) {
    setIsAuthUser(false);
    setUser(null);
    Cookies.remove("token");
    localStorage.clear();
    setComfirmData(false);
    router.push("/");
  }

  let isAdminView;
  if (user?.role === "admin") {
    isAdminView = true;
  } else {
    isAdminView = false;
  }

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}
      <div className="min-h-full z-100">
        <Disclosure as="nav" className="bg-gray-800 min-w-full fixed top-0">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div
                      onClick={() =>
                        router.push(`${isAdminView ? "/home" : "/"}`)
                      }
                      className="flex-shrink-0 cursor-pointer"
                    >
                      {/* <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      /> */}
                      <span className="self-center text-violet-500 text-2xl font-semibold whitespace-nowrap">
                        Eहिसाब
                      </span>
                    </div>

                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {user?.role === "admin"
                          ? adminNavOptions.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  pathName === item.href
                                    ? "bg-gray-900 text-purple-300"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={
                                  pathName === item.href ? "page" : undefined
                                }
                              >
                                {item.name}
                              </Link>
                            ))
                          : navOptions.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                className={classNames(
                                  pathName === item.href
                                    ? "bg-gray-900 text-purple-300"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium"
                                )}
                                aria-current={
                                  pathName === item.href ? "page" : undefined
                                }
                              >
                                {item.name}
                              </Link>
                            ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button> */}

                      {/* Profile dropdown */}

                      {
                        isAuthUser ? (
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5" />
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user?.img}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="px-1 py-1 ">
                                  <Menu.Item
                                    onClick={() => router.push("/profile")}
                                  >
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        Your Profile
                                      </button>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item onClick={() => handleLogout()}>
                                    {({ active }) => (
                                      <button
                                        className={`${
                                          active
                                            ? "bg-violet-500 text-white"
                                            : "text-gray-900"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                      >
                                        Sign Out
                                      </button>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        ) : null
                        // <div className=" lg:flex lg:flex-1 lg:justify-end">
                        //   <Link href="/login" className="text-sm font-semibold leading-6 text-purple-500">
                        //     Log in <span aria-hidden="true">&rarr;</span>
                        //   </Link>
                        // </div>
                      }
                    </div>
                  </div>
                  {isAuthUser ? (
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>
                  ) : pathName === "/login" ? (
                    <div className=" lg:flex lg:flex-1 lg:justify-end ">
                      <Link
                        href="/register"
                        className="text-sm font-semibold leading-6 text-violet-500"
                      >
                        Sign Up <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  ) : (
                    <div className=" lg:flex lg:flex-1 lg:justify-end ">
                      <Link
                        href="/login"
                        className="text-sm font-semibold leading-6 text-violet-500"
                      >
                        Sign In <span aria-hidden="true">&rarr;</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {user?.role === "admin"
                    ? adminNavOptions.map((item) => (
                        <Link href={item.href}>
                          <Disclosure.Button
                            key={item.name}
                            className={classNames(
                              pathName === item.href
                                ? "bg-gray-900 text-purple-500 w-full"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white w-full",
                              "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                            aria-current={
                              pathName === item.href ? "page" : undefined
                            }
                          >
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                      ))
                    : navOptions.map((item) => (
                        <Link href={item.href}>
                          <Disclosure.Button
                            key={item.name}
                            as="Link"
                            href={item.href}
                            className={classNames(
                              pathName === item.href
                                ? "bg-gray-900 text-purple-500 w-full"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white w-full",
                              "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                            aria-current={
                              pathName === item.href ? "page" : undefined
                            }
                          >
                            {item.name}
                          </Disclosure.Button>
                        </Link>
                      ))}
                  {/* {navOptions} */}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user?.img}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    <Disclosure.Button
                      onClick={() => router.push("/profile")}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white w-full"
                    >
                      Your Profile
                    </Disclosure.Button>
                    <Disclosure.Button
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white w-full"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <header className="h-16">
          <div className="mx-auto">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto ">{children}</div>
        </main>
      </div>

      <ComfirmButton
        comfirmState={comfirmState}
        setComfirmState={setComfirmState}
        setComfirmData={setComfirmData}
        buttonText={'LogOut Now'}
      />
    </>
  );
}

{
  // 'use client';
  // import { GlobalContext } from '@/context';
  // import { adminNavOptions, navOptions, styles } from '@/utiles';
  // import React, { Fragment, useContext, useState } from 'react'
  // import CommonModal from '../CommonModal';
  // import { usePathname, useRouter } from 'next/navigation';
  // import Cookies from 'js-cookie';
  // import { UserCircleIcon } from '@heroicons/react/24/solid';
}

// const index = () => {

//   const {showNavModal,setShowNavModal,user,isAuthUser,setUser,setIsAuthUser} = useContext(GlobalContext);
//   const router = useRouter();

//   const handleLogout = () =>{
//     setIsAuthUser(false);
//     setUser(null);
//     Cookies.remove('token');
//     localStorage.clear();
//     router.push('/');
//   }

//   let isAdminView;
//   if(user?.role === 'admin'){
//     isAdminView = true;
//   }else{
//     isAdminView = false;
//   }

//   return (
//     <>
//       <nav className='bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200'>
//         <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
//           <div onClick={()=>router.push(`${isAdminView?'/home':'/'}`)} className="flex items-center cursor-pointer">
//                 {
//                   user ?(
//                     <div className='self-center text-black text-sm  whitespace-nowrap mr-3 items-center'>
//                   <img className='self-center mx-auto h-[45px] object-contain rounded-full' src={user?.img} alt="photo" />
//                   <span className='uppercase text-gray-900'>{user?.name}</span>
//                 </div>
//                   ) :<UserCircleIcon className="h-[45px] text-gray-300" aria-hidden="true" />
//                 }
//                 <span className="self-center text-black text-2xl font-semibold whitespace-nowrap">
//                     Eहिसाब
//                 </span>
//             </div>

//           <div className="flex md:order-2 gap-2">
//               {
//                 !isAdminView && isAuthUser ?(
//                 <Fragment>
//                   <button className={'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'}>Posts</button>
//                 </Fragment>
//                 ):null
//               }

//               {
//                 isAuthUser?<button onClick={handleLogout} className={'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'}>Log Out</button>:<button onClick={()=>router.push('/login')} className={'mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white'}>Log In</button>
//               }
//               <button
//               data-collapse-toggle="navbar-sticky"
//               type="button"
//               className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
//               aria-controls="navbar-sticky"
//               aria-expanded="false"
//               onClick={()=> setShowNavModal(true)}
//             >
//               <span className="sr-only">Open main menu</span>
//               <svg
//                 className="w-6 h-6"
//                 aria-hidden="true"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
//                   clip-rule="evenodd"
//                 ></path>
//               </svg>
//             </button>
//           </div>

//           <NavItems isAdminView={isAdminView} router={router} />

//         </div>
//       </nav>

//       <CommonModal showModalTitle={false} mainContent={<NavItems router={router} isModalView={true} isAdminView={isAdminView} />} show={showNavModal} setShow={setShowNavModal} />
//     </>
//   )
// }
// const NavItems =({isModalView = false,isAdminView,router})=>(
//   <div className={`items-center justify-between w-full md:flex md:w-auto ${isModalView?'':'hidden'}`} id='nav-items'>
//       <ul className={`flex flex-col p-4 md:p-0 mt-4 font-medium  rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-white ${
//           isModalView ? "border-none" : "border border-gray-100"
//         }`}>
//         {
//           isAdminView ? (
//             adminNavOptions.map((item) =>(
//               <li className='cursor-pointer py-2 block pl-3 pr-4 text-gray-900 rounded md:p-0' key={item.id} onClick={() => router.push(item.path)}>
//                 {item.label}
//               </li>
//             ))
//           ):(
//             navOptions.map((item) =>(
//               <li className='cursor-pointer py-2 block pl-3 pr-4 text-gray-900 rounded md:p-0' key={item.id} onClick={()=> router.push(item.path)}>
//                 {item.label}

//               </li>
//             ))
//           )
//         }
//       </ul>
//   </div>
// )

// export default index
