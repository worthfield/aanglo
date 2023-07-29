import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { create } from "../apis/user-api";
import Dialog from "../components/Dialog";
import auth from "../authentication/auth-helper";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import hero from "../assets/images/hero_bg.jpg";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    redirectTo: false,
    error: "",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("idle");
  const loggedIn = auth.isAuthenticated();

  useEffect(() => {
    if (loggedIn) {
      setValues({ ...values, redirectTo: true });
    }
  });

  const openDialog = () => {
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const notify = (errorMessage) => {
    toast.error(errorMessage, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting");
    const userData = {
      name: values.name || undefined,
      email: values.email || undefined,
      password: values.password || undefined,
    };
    try {
      await create(userData);
      openDialog();
      setStatus("idle");
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setValues({ ...values, error: errorMessage });
        notify(errorMessage);
        setStatus("idle");
      }
    }
    setStatus("idle");
  };
  if (values.redirectTo) {
    return <Navigate to={"/"} />;
  }

  return (
    <div>
      <div className="h-[194px] relative">
        <img className="w-full h-full object-cover object-center" src={hero} />
        <p className="absolute top-1/2 left-1/2 w-full text-center sm:text-2xl md:text-3xl lg:text-4xl transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          Create an Account
        </p>
      </div>
      <div className="container mt-20 mx-auto">
        <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2 ">
          <div className="px-[15px] mt-5 md:mt-[77px]">
            <form>
              <div className="mb-[13px] flex flex-col">
                <label className="mb-[3px]">Full Name:*</label>
                <input
                  type="text"
                  className="pt-[10px] px-[10px] pb-[9px] border-2"
                  name="name"
                  onChange={handleChange}
                  value={values.name}
                />
              </div>
              <div className="mb-[13px] flex flex-col">
                <label className="mb-[3px]">Email Address:*</label>
                <input
                  type="text"
                  className="pt-[10px] px-[10px] pb-[9px] border-2"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                />
              </div>
              <div className="mb-[13px] flex flex-col">
                <label className="mb-[3px]">Password:*</label>
                <input
                  type="password"
                  className="pt-[10px] px-[10px] pb-[9px] border-2"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </div>
              <div className="mb-[13px] flex items-center ">
                <button
                  onClick={handleSubmit}
                  disabled={status === "Submitting"}
                  className={`p-3 uppercase mt-[20px] md:mt-[7px] text-[14px]  ${
                    status === "Submitting"
                      ? " bg-gray-700 cursor-not-allowed"
                      : "bg-red-500"
                  } border-0 rounded-[9999px] w-full font-bold text-white `}
                >
                  {status === "Submitting"
                    ? "Signing up..."
                    : "create an account"}
                </button>
              </div>
            </form>
          </div>
          <div className="px-[15px] ">
            <div className="mt-[50px] md:mt-[77px] mb-[80px] ">
              <div className="p-5 border-2">
                <h4 className="text-2xl md:text-3xl mt-[4px]">New User?</h4>
                <p className="mt-[10px]">
                  Create an account with us and you’ll be able to:
                </p>
                <ul className="mt-[37px]">
                  <li className="text-gray-500 list-disc text-lg ml-4">
                    Check Out Faster
                  </li>
                  <li className="text-gray-500 list-disc text-lg ml-4">
                    Save multiple shipping addesses
                  </li>
                  <li className="text-gray-500 list-disc text-lg ml-4">
                    Access your order history
                  </li>
                  <li className="text-gray-500 list-disc text-lg ml-4">
                    Track new orders
                  </li>
                  <li className="text-gray-500 list-disc text-lg ml-4">
                    Save items to your Wishlist
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Dialog isOpen={isOpen} values={values} onClose={closeDialog} />
    </div>
  );
};

export default Signup;
