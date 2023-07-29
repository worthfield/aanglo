import React from 'react'
import UserVerificationCode from '../user/UserVerificationCode';
const Dialog = ({isOpen,onClose,values}) => {
    if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
    <div className="bg-white p-6 rounded-lg shadow-xl z-20">
      <UserVerificationCode email={values.email} onClose={onClose}/>
    </div>
  </div>
  )
}

export default Dialog
