"use client";

import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "@/context";
import { toast } from "react-toastify";
import { PuffLoader } from "react-spinners";
import axios from "axios";
import { optionHours, optionMachine, optionMinutes } from "@/utiles";
import { useRouter } from "next/navigation";
import { PostNewUsersWork } from "@/services/post";
import ComponentLevelLoader from "@/components/Loader/componentlevel";

export const EmployeesformData = () => {
  const { componentLevelLoader, setComponentLevelLoader, user } =
    useContext(GlobalContext);

  const [todayMachines, setTodayMachines] = useState("0");
  const [todayHours, setTodayHours] = useState("0");
  const [todayMinuts, setTodayMinuts] = useState("0");
  const [loading, setLoading] = useState(true);
  const [usersPost, setUsersPost] = useState([]);

  const router = useRouter();
  // console.log(todayHours,todayMachines,todayMinuts)
  const fetchPosts = async () => {
    // console.log(user?._id)
    // const data =  await getAllUsers();
    const { data } = await axios.get(`/api/post`, {
      // query URL without using browser cache
      headers: {
        "Cache-Control": "no-cache",
        cache:'no-cache',
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

  const formData = {
    email: user?.email,
    machines: todayMachines,
    hour: todayHours,
    minutes: todayMinuts,
  };

  // console.log(formData);

  const handlePostWork = async () => {
    if (!user?.email) {
      toast.error("Login to send message", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
      router.push("/login");
      return;
    }
    setComponentLevelLoader({ loading: true, id: "" });

    const res = await PostNewUsersWork(formData);

    console.log(res);

    if (res.success) {
      toast.success(res.post, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTodayHours("0");
      setTodayMachines("0");
      setTodayMinuts("0");
      setComponentLevelLoader({ loading: false, id: "" });
      setUsersPost([]);
      setLoading(true);
      fetchPosts();
      router.refresh();
    } else {
      toast.error(res.post, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setComponentLevelLoader({ loading: false, id: "" });
    }
  };

  useEffect(() => {
    

    fetchPosts();
  }, []);
  return (
    <>

    <div className=" w-full text-center items-center">
      {
        user?.activated?
        <div className="md:w-[500px] w-[400px] my-5 md:px-24 md:my-8 m-auto  p-10 space-y-10 bg-gray-800 rounded-xl">
          <h1 className="text-violet-500 p-3 text-xl border-b-2 w-fit border-rose-500 m-auto">
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
          </div>

          <div class="mt-2 p-5  bg-gray-800 rounded-lg border-2 border-gray-200 ">
            <p
              htmlFor="time"
              className="pt-0 pr-2 absolute pb-0 pl-2 -mt-8 mr-0 mb-0 -ml-3 font-medium text-gray-50 bg-gray-800 z-0"
            >
              Select today time:
            </p>
            <div class="flex justify-between">
              <select
                value={todayHours}
                onChange={(e) => setTodayHours(e.target.value)}
                name="hours"
                class="scrollEditclass px-5 bg-gray-800 text-3xl  appearance-none outline-none"
              >
                {optionHours.map((item) => (
                  <option className="" value={item.id} key={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <span class="text-2xl mx-2">:</span>
              <select
                value={todayMinuts}
                onChange={(e) => setTodayMinuts(e.target.value)}
                name="minutes"
                class="scrollEditclass px-5 my-auto bg-gray-800 text-3xl  appearance-none outline-none mr-4"
              >
                {optionMinutes.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
              <select
                name="ampm"
                class="bg-gray-800 text-3xl appearance-none outline-none"
              >
                <option className="hidden md:block" value="am">
                  Hours
                </option>
              </select>
            </div>
          </div>

          <div>
            <button
              onClick={handlePostWork}
              className="inline-flex w-[200px] items-center justify-center bg-black px-6 py-4 text-lg 
                    text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide"
            >
              {componentLevelLoader && componentLevelLoader.loading ? (
                <ComponentLevelLoader
                  text={"Sending"}
                  color={"#ffffff"}
                  loading={componentLevelLoader && componentLevelLoader.loading}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      :<main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-rose-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-rose-100 sm:text-5xl">You are not verified</h1>
        <p className="mt-6 text-base leading-7 text-rose-400">Please contact to admin to verify your account!!</p>
        
      </div>
    </main>
      }
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
                          className="p-4 hidden lg:table-cell md:text-base font-medium text-gray-400 uppercase"
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
                          Machines
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-base font-medium text-gray-400 uppercase"
                        >
                          Time(H:M)
                        </th>
                        <th
                          scope="col"
                          className="p-4 text-base font-medium text-gray-400 uppercase"
                        >
                          checked
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-700 text-white divide-y divide-gray-200">
                      {usersPost.map((item, index) =>
                        user?.email === item?.email ? (
                          <UserTableBody
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
                          />
                        ) : null
                      )}
                    </tbody>
                  </table>

                  <div className="min-h-20 p-5 my-5 bg-gray-700 flex text-center items-center justify-center">
                    <p className="text-3xl font-extralight text-red-500 ">
                      Note:If you want any account's backup please contact to
                      developer!
                    </p>
                  </div>
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
  village,
  email,
  machines,
  createdAt,
  index,
  hour,
  minuts,
  isChecked,
}) => (
  <tr className="hover:bg-gray-900">
    <td className="p-4 hidden lg:table-cell w-4 text-center whitespace-nowrap text-base font-medium text-gray-50">
      {index}.
    </td>

    <td className="p-2 md:p-4  hidden lg:flex items-center text-center whitespace-nowrap md:space-x-6 md:mr-12 lg:mr-0">
      <div className="text-sm font-normal text-gray-400 m-auto md:m-0">
        <div className="text-base font-semibold text-gray-50">{name}</div>
        <div className="text-sm font-normal text-gray-400 ">
          <span className="hidden md:block">[{email}]</span>
          <span className="md:hidden">[{village}]</span>
        </div>
      </div>
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
    <td className="p-4  whitespace-nowrap ">
      {isChecked ? (
        <CheckBadgeIcon className="h-5 w-5 text-green-500" />
      ) : (
        <XCircleIcon className="h-5 w-5 m-auto text-rose-500" />
      )}
    </td>
  </tr>
);



export const EmployeesPostData = () => {

  
}
