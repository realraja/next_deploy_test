"use client";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { GlobalContext } from "@/context";
import { adminNavOptions, navOptions} from "@/utiles";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
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

    // console.log(user,isAuthUser, setUser, setIsAuthUser)
    // console.log(isAuthUser)
  

  const [comfirmData, setComfirmData] = useState(false);
  const [comfirmState, setComfirmState] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  // console.log(comfirmData,comfirmState);


  const handleLogout = () => {
    // console.log("rajesh@gmail.com");
    setComfirmState(true);
  };

  useEffect(() => {
    if (comfirmData) {
      setIsAuthUser(false);
      setUser(null);
      Cookies.remove("token");
      localStorage.clear();
      setComfirmData(false);
      router.push("/");
    }
  }, [comfirmData]);
  

  return (
    <>
     
      <div className="min-h-full ">
        <Disclosure as="nav" className="bg-gray-800 min-w-full fixed top-0 z-10">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div
                      onClick={() =>
                        router.push(`/`)
                      }
                      className="flex-shrink-0 cursor-pointer"
                    >
                      <span className="self-center text-violet-500 text-2xl font-semibold whitespace-nowrap">
                        Eहिसाब
                      </span>
                    </div>

                    <div className="max-sm:hidden sm:hidden  md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {user?.role === "admin"
                          ? adminNavOptions.map((item) => (
                              <p
                                key={item.name}
                                onClick={()=> router.push(item.href)}
                                className={classNames(
                                  pathName === item.href
                                    ? "bg-gray-900 text-purple-300"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                )}
                                aria-current={
                                  pathName === item.href ? "page" : undefined
                                }
                              >
                                {item.name}
                              </p>
                            ))
                          : navOptions.map((item) => (
                              <p
                                key={item.name}
                                onClick={()=> router.push(item.href)}
                                className={classNames(
                                  pathName === item.href
                                    ? "bg-gray-900 text-purple-300"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                  "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                )}
                                aria-current={
                                  pathName === item.href ? "page" : undefined
                                }
                              >
                                {item.name}
                              </p>
                            ))}
                      </div>
                    </div>
                  </div>
                  <div className="max-sm:hidden sm:hidden  md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      <button
                        type="button"
                        className={ `relative ${!isAuthUser?'hidden':null} rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800`}
                        onClick={()=>router.push('/notifications')}
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

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
                                  src={user?.photoURL}
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
                      <p
                        onClick={()=> router.push('register')}
                        className="text-sm font-semibold leading-6 text-violet-500"
                      >
                        Sign Up <span aria-hidden="true">&rarr;</span>
                      </p>
                    </div>
                  ) : (
                    <div className=" lg:flex lg:flex-1 lg:justify-end ">
                      <p
                        onClick={()=> router.push('login')}
                        className="text-sm font-semibold leading-6 text-violet-500"
                      >
                        Sign In <span aria-hidden="true">&rarr;</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {user?.role === "admin"
                    ? adminNavOptions.map((item) => (
                        <p onClick={()=> router.push(item.href)}>
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
                        </p>
                      ))
                    : navOptions.map((item) => (
                        <p key={item.name} onClick={()=> router.push(item.href)}>
                          <Disclosure.Button
                            
                           
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
                        </p>
                      ))}
                  {/* {navOptions} */}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 object-contain
                         rounded-full"
                        src={user?.photoURL}
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
                    <Disclosure.Button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      onClick={()=>router.push('/notifications')}
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </Disclosure.Button>
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


