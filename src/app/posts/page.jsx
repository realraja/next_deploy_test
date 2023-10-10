'use client';

import SelectComponent from "@/components/FormElements/SelectComponent";
import { GlobalContext } from "@/context"
import React,{useContext} from 'react'

const optionMachine =[
  {
    id: "",
    label: "Choose machines:",
  },
  {
    id: "1",
    label: "1",
  },
  {
    id: "2",
    label: "2",
  },
  {
    id: "3",
    label: "3",
  },
  {
    id: "4",
    label: "4",
  },
  {
    id: "5",
    label: "5",
  },
  {
    id: "6",
    label: "6",
  },
  {
    id: "7",
    label: "7",
  },
  {
    id: "8",
    label: "8",
  },
  {
    id: "9",
    label: "9",
  },
  {
    id: "10",
    label: "10",
  },
]
const optionHours =[
  {
    id: "",
    label: "Choose Hours:",
  },
  {
    id: "1",
    label: "1",
  },
  {
    id: "2",
    label: "4",
  },
  {
    id: "3",
    label: "3",
  },
  {
    id: "4",
    label: "4",
  },
  {
    id: "5",
    label: "5",
  },
  {
    id: "6",
    label: "6",
  },
  {
    id: "7",
    label: "7",
  },
  {
    id: "8",
    label: "8",
  },
  {
    id: "9",
    label: "9",
  },
  {
    id: "10",
    label: "10",
  },
]

const page = () => {
  const {user} = useContext(GlobalContext)

  return (
    <div className="min-h-[85vh] w-full text-center items-center">

      <div className="md:w-[60%] mx-5 my-5 md:px-24 md:my-8 md:m-auto  p-10 space-y-5 bg-gray-800 rounded-xl">
      <h1 className="text-violet-500 p-3 text-xl border-b-2 w-fit border-rose-500 m-auto">Post Your Today's Work Now!</h1>
      
      <div >
        <SelectComponent
        options={optionMachine}
        label={'Number Of machines:'}
        // onChange={(event) => {
        //   setFormData({
        //     ...formData,
        //     [controlItem.id]: event.target.value,
        //   });
        // }}
        // value={''}
         />
        {/* <label className=" text-xl" htmlFor="number">Number Of machines:</label> */}
        {/* <input className="bg-gray-950 p-4 m-auto w-[400px]"  type="number" placeholder="Number Of machines:" min="1" max="5"  /> */}
      </div>
      
      <div>
      <SelectComponent
        options={optionHours}
        label={'Time of work(h):'}
        // onChange={(event) => {
        //   setFormData({
        //     ...formData,
        //     [controlItem.id]: event.target.value,
        //   });
        // }}
        // value={''}
         />
        {/* <label className="" htmlFor="number">Time of work(h):</label> */}
        {/* <input className="bg-gray-950 p-4 m-auto w-[400px]"  type="number" max={'20'} min={'0'} placeholder="Time of work(h):"  /> */}
      </div>
      
       <div>
        <button className="inline-flex w-[200px] items-center justify-center bg-black px-6 py-4 text-lg 
                     text-white transition-all duration-200 ease-in-out focus:shadow font-medium uppercase tracking-wide">Submit</button>
       </div>
      </div>

    </div>
  )
}

export default page
