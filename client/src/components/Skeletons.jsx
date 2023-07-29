import React from 'react'
import Loading from './Loading'
const Skeletons = ({type}) => {
  if(type === 'hero'){

    return (
      <div className="bg-gray-200 animate-pulse">
        <div className="bg-gray-400 h-[290px] md:h-[415px] w-full rounded-md"></div>
      </div>
    )
  }
  if(type === 'banner'){

    return (
      <div className="bg-gray-200 animate-pulse">
        <div className="bg-gray-400 h-[230px] sm:h-[200px] w-full rounded-md"></div>
      </div>
    )
  }
  if(type === 'table'){
    return (
      <div className="bg-gray-200 mb-2 animate-pulse">
        <div className="bg-gray-400 flex items-center justify-center h-[290px] md:h-[300px] w-full rounded-md">
          <div className='flex flex-col items-center'>
            <Loading/>
          <p className="text-lg">Please wait for a seconds</p>

          </div>
        </div>
      </div>
    )
  }

}

export default Skeletons