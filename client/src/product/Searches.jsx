import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Products from './Products';

const Searches = () => {
  const location = useLocation();
  if(location?.state?.results){

    return (
      <Products products={location?.state?.results} searched={false} />
    )
  }
  return <Navigate to={'/'}/>
}

export default Searches