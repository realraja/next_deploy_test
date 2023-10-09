import React from 'react'
import { PuffLoader } from 'react-spinners'

const loading = () => {
  return (
    <div className="h-[90vh] items-center text-center flex">
      <PuffLoader className="m-auto"  size={'240px'} color={"#9224f0"} /> 
    </div>
  )
}

export default loading
