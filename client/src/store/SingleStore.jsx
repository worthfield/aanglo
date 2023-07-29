import React from 'react'
import { Link } from 'react-router-dom'

const SingleStore = ({shop}) => {
  
  return (
    <div className="max-w-xs cursor-pointer  bg-white shadow-md rounded-lg overflow-hidden">
    
    <div className="relative">
      <img
        className="object-cover bg-cover bg-center w-full h-48"
        src={"/api/shops/logo/" + shop._id + "?" + new Date().getTime()}

        alt="Shop Image"
      />
      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
        <Link to={"/shops/" + shop._id} className="bg-gray-900 text-white px-4 py-2 rounded">
          View Shop
        </Link>
      </div>
    </div>

    <div className="p-4">
      <h3 className="text-gray-900 font-medium text-lg">{shop.name}</h3>
      <p className="text-gray-600 mt-2">{shop.description}</p>
    </div>
  </div>
  )
}

export default SingleStore
