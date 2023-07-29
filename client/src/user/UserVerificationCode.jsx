import React, { useState } from "react";
import { verify } from "../apis/user-api";
import { Navigate } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";
const UserVerificationCode = ({ email, onClose }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const [otpNumber, setOtpNumber] = useState(0); // Initialize with the desired initial value
  const [redirectToSign, setRedirectToSign] = useState(false);
  const handleChange = (element, index) => {
    const newValue = parseInt(element.value); // Convert the input value to an integer

    if (isNaN(newValue)) {
      return false; // Return early if the value is not a valid number
    }

    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp]; // Create a new array based on the previous state
      updatedOtp[index] = newValue; // Update the value at the specified index

      const otpNumber = parseInt(updatedOtp.join("")); // Convert the updated OTP array to a single number
      setOtpNumber(otpNumber); // Save the OTP number to a separate state

      return updatedOtp; // Set the new OTP array as the state value
    });

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      verificationCode: otpNumber,
    };
    try {
      await verify(userData);
      setRedirectToSign(true);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      }
    }
  };
  if (redirectToSign) {
    return <Navigate to="/signin" />;
  }
  return (
    <div className="">
      <div className="m-2 text-center text-xl font-bold">
        Enter Verification Code
      </div>
      <p>
        A verification code has been sent to your email
        <br />
        {email}
      </p>
      <p className="text-gray-400">The code is only valid for 2 minutes.</p>
      <div className="mt-[24px]">
        <input type="hidden" value={email} />
        {otp.map((data, index) => {
          return (
            <input
              type="text"
              required
              key={index}
              className="border-2 sm:px-3 sm:py-1 ml-1 focus:outline-[#1D9BF0] rounded-md border-gray-300 w-[50px]"
              maxLength="1"
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          );
        })}
      </div>
      {error && (
        <div className="bg-red-300 text-red-500 font-bold mt-[32px] flex items-center gap-2  rounded-md p-2">
          <i>
            <RiErrorWarningLine size={32} className={"text-red-500"} />
          </i>
          <p>{error}</p>
        </div>
      )}
      <div className="flex justify-between">
        <button
          className="mt-4 px-4 py-2 text-white bg-red-400 rounded font-bold"
          onClick={onClose}
        >
          CANCEL
        </button>
        <button
          className="mt-4 px-4 py-2 text-white bg-[#1D9BF0] rounded font-bold"
          onClick={handleSubmit}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default UserVerificationCode;
