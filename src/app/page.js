'use client'
import { EmployeesPostData } from "@/components/AdminPostTable";
import { EmployeesformData } from "@/components/TableComponent";
import { GlobalContext } from "@/context";
import { useContext } from "react";


export default function Home() {
  const {user} = useContext(GlobalContext);
  return (
    <main>
      {
        user?.role === 'admin'?<EmployeesPostData />:<EmployeesformData />
      }
      
    </main>
  )
}
