'use client'
import { EmployeesPostData } from "@/components/AdminPostTable";
import { EmployeesformData } from "@/components/TableComponent";
import { GlobalContext } from "@/context";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext } from "react";


export default function Home() {
  const {user,isAuthUser} = useContext(GlobalContext);
  return (
    <main>
      {
        isAuthUser ?(
        user?.role === 'admin'?<EmployeesPostData />:<EmployeesformData />
        ):(
          <main className="grid min-h-full place-items-center bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-indigo-100 sm:text-5xl">You are not Logged In!</h1>
        <p className="mt-6 text-base leading-7 text-indigo-400">Please LogIn to view this page!</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/login"
                className="flex space-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In Now <ArrowRightIcon className="w-5" />
              </Link>
            </div>
        
      </div>
    </main>
        )
      }
      
    </main>
  )
}
