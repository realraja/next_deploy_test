"use client";

import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, {  useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { optionPeople } from "@/utiles";
import Link from "next/link";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const EmployeesPostData = () => {

  const [selected, setSelected] = useState({all: true,photoURL:'https://firebasestorage.googleapis.com/v0/b/ecommerce-raja.appspot.com/o/onlyme%2Ffree-user-group-icon-296-thumb.png?alt=media&token=1523cda7-3eb3-4b49-998e-5090d35b28da','name':'All users'});
  const [people, setPeople] = useState(optionPeople);

  const [loading, setLoading] = useState(true);
  const [usersPost, setUsersPost] = useState([]);


  const fetchPosts = async () => {

    const { data } = await axios.get(`/api/post`, {

      headers: {
        "Cache-Control": "no-cache",
        cache: "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
    console.log(data);

    if (data?.success) {
      setUsersPost(data?.post);
      setLoading(false);
    } else {
      // console.log(data)
      setLoading(false);
      toast.error("Please check your internet connection!!!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const fetchUsers = async() =>{
        
    // const data =  await getAllUsers();
    const {data} =  await axios.get('/api/allusers',{
      // query URL without using browser cache
      headers: {
        'Cache-Control': 'no-cache',
        cache:'no-cache',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
    // console.log(data);       

    if (data?.success) {
      setPeople(data?.data)
    } else {
      toast.error('Please check your internet connection!!!', {
        position: toast.POSITION.TOP_RIGHT, 
      });
    }
        
        
  }

  // console.log(formData);

  const handleUpdate = async (id) => {
    // console.log('clicked update',id);
    try {
      const res = await fetch(`/api/post/${id}`, {
        method: "PUT",
      });
      const data = await res.json();

      // return data;
      console.log(data);

      if (data.success) {
        fetchPosts();
      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.log("error in put", error);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);
  return (
    <>
      <div className=" w-[50%] mx-auto my-5 text-center items-center">
        <Listbox value={selected} onChange={setSelected}>
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">
                Assigned to
              </Listbox.Label>
              <div className="relative mt-2">
                <Listbox.Button className="relative w-full cursor-default rounded-md bg-gray-800 py-1.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 sm:text-sm sm:leading-6">
                  <span className="flex items-center">
                    <img
                      src={selected.photoURL}
                      alt=""
                      className="h-5 w-5 flex-shrink-0 rounded-full"
                    />
                    <span className="ml-3 block truncate">{selected.name}</span>
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-50"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>

                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  <Listbox.Option
                        key={'person._id'}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600"
                              : "text-gray-100",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={{'all':true,'photoURL':'https://firebasestorage.googleapis.com/v0/b/ecommerce-raja.appspot.com/o/onlyme%2Ffree-user-group-icon-296-thumb.png?alt=media&token=1523cda7-3eb3-4b49-998e-5090d35b28da','name':'All users'}}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                            <img
                                src={'https://firebasestorage.googleapis.com/v0/b/ecommerce-raja.appspot.com/o/onlyme%2Ffree-user-group-icon-296-thumb.png?alt=media&token=1523cda7-3eb3-4b49-998e-5090d35b28da'}
                                alt=""
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {'All Users'}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    {people.map((person) => (
                      <Listbox.Option
                        key={person._id}
                        className={({ active }) =>
                          classNames(
                            active
                              ? "bg-indigo-600"
                              : "text-gray-100",
                            "relative cursor-default select-none py-2 pl-3 pr-9"
                          )
                        }
                        value={person}
                      >
                        {({ selected, active }) => (
                          <>
                            <div className="flex items-center">
                              <img
                                src={person?.photoURL}
                                alt=""
                                className="h-5 w-5 flex-shrink-0 rounded-full"
                              />
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "ml-3 block truncate"
                                )}
                              >
                                {person?.name}
                              </span>
                            </div>

                            {selected ? (
                              <span
                                className={classNames(
                                  active ? "text-white" : "text-indigo-600",
                                  "absolute inset-y-0 right-0 flex items-center pr-4"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>

        {/* <UsersList people={optionPeople} selected={selected} setSelected={setSelected}  /> */}

        {/* <h1 className="text-violet-500 p-3 text-xl border-b-2 w-fit border-rose-500 m-auto">
        Post Your Today's Work Now!
      </h1>

      <div class="mt-2 p-5  bg-gray-800 rounded-lg border-2 border-gray-200 ">
        <p
          htmlFor="time"
          className="pt-0 pr-2 absolute pb-0 pl-2 -mt-8 mr-0 mb-0 -ml-3 font-medium text-gray-50 bg-gray-800 "
        >
          Select Machines:
        </p>
        <div class="flex justify-between">
          <select
            value={todayMachines}
            onChange={(e) => setTodayMachines(e.target.value)}
            name="hours"
            class="scrollEditclass px-5 bg-gray-800 text-3xl  appearance-none outline-none"
          >
            {optionMachine.map((item) => (
              <option className="" value={item.id} key={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            name="ampm"
            class="bg-gray-800 text-3xl appearance-none outline-none"
          >
            <option value="am">Machines</option>
          </select>
        </div>
      </div> */}
      </div>

      {loading ? (
        <div className=" items-center text-center flex">
          <PuffLoader className="m-auto" size={"240px"} color={"#9224f0"} />{" "}
        </div>
      ) : (
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
                        <th
                          scope="col"
                          className="p-4 hidden lg:table-cell text-base font-medium text-gray-400 uppercase"
                        >
                          S.N.
                        </th>
                        <th
                          scope="col"
                          className="p-4  md:text-base font-medium text-gray-400 uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="p-4 hidden md:table-cell text-base font-medium text-gray-400 uppercase"
                        >
                          Village
                        </th>
                        <th
                          scope="col"
                          className="p-4  text-base font-medium text-gray-400 uppercase"
                        >
                          Post At
                        </th>
                        <th
                          scope="col"
                          className="p-4  text-base font-medium text-gray-400 uppercase"
                        >
                          M.No.
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-base font-medium text-gray-400 uppercase"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="p-4 hidden md:table-cell  text-base font-medium text-gray-400 uppercase"
                        >
                          checked
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-base font-medium text-gray-400 uppercase"
                        >
                          Edit
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-700 text-white divide-y divide-gray-200">
                      {usersPost.map((item, index) =>

                      selected?.all?(
                        <UserTableBody
                            img={item?.imageUrl}
                            index={index + 1}
                            key={index}
                            name={item?.name}
                            village={item?.village}
                            email={item?.email}
                            status={true}
                            createdAt={item?.createDate}
                            machines={item?.machines}
                            hour={item?.timeh}
                            minuts={item?.timem}
                            isChecked={item?.ischeck}
                            handleUpdate={() => handleUpdate(item?._id)}
                            id={item.id}
                          />
                      ):(
                        selected?.email === item?.email ? (
                          <UserTableBody
                            id={item.id}
                            img={item?.imageUrl}
                            index={index + 1}
                            key={index}
                            name={item?.name}
                            village={item?.village}
                            email={item?.email}
                            status={true}
                            createdAt={item?.createDate}
                            machines={item?.machines}
                            hour={item?.timeh}
                            minuts={item?.timem}
                            isChecked={item?.ischeck}
                            handleUpdate={() => handleUpdate(item?._id)}
                          />
                        ) : null
                      )
                        
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

const UserTableBody = ({
  name,
  img,
  id,
  village,
  email,
  machines,
  createdAt,
  index,
  hour,
  minuts,
  isChecked,
  handleUpdate,
}) => (
  <tr
    className={`hover:bg-gray-950 ${
      !isChecked ? "bg-violet-700" : "bg-gray-900"
    }`}
  >
    <td className="p-4 hidden lg:table-cell w-4 text-center whitespace-nowrap text-base font-medium text-gray-50">
      {index}.
    </td>

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
    <td className="p-4 hidden md:table-cell text-center whitespace-nowrap text-base font-medium text-gray-50">
      
        {village}
   
    </td>
    <td className="p-4  whitespace-nowrap text-center text-base font-medium text-gray-50">
      <p>
        {createdAt[0]}-{createdAt[1]}-{createdAt[2]}
      </p>
      <p>
        {createdAt[3]}:{createdAt[4]}:{createdAt[5]}
      </p>
    </td>
    <td className="p-2 md:p-4 text-center  whitespace-nowrap text-base font-normal text-gray-50">
      {machines}
    </td>
    <td className="p-2 md:p-4 text-center whitespace-nowrap text-base font-normal text-gray-50">
      {hour}:{minuts}
    </td>
    <td className="whitespace-nowrap hidden md:table-cell  ">
      {isChecked ? (
        <CheckBadgeIcon className="h-5 w-5 m-auto text-green-500" />
      ) : (
        <XCircleIcon className="h-5 w-5 m-auto text-rose-500" />
      )}
    </td>
    <td className=" whitespace-nowrap ">
      {!isChecked ? (
        <button
          type="button"
          onClick={handleUpdate}
          data-modal-toggle="user-modal"
          className="text-white m-1 bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center "
        >
          <CheckBadgeIcon className="h-5 w-5" />
          <span className="hidden md:block">Check</span>
        </button>
      ) : null}
    </td>
  </tr>
);

