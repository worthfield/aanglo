import React, { useState, useEffect } from "react";
import {  useParams } from "react-router-dom";
import { read, update } from "../apis/user-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from "../authentication/auth-helper";

const EditProfile = () => {
  const [values, setValues] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
    error: "",
    photo: null,
    seller: false,
    picture: null,
    redirectToProfile: false,
  });
 
  const params = useParams();
  const jwt = useAuth.isAuthenticated();

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

  useEffect(() => {
    fetchData();
  }, [params.userId]);
  const fetchData = async () => {
    try {
      const data = await read({ userId: params.userId }, { t: jwt.token });
      setValues({
        ...values,
        id: data._id,
        name: data.name,
        email: data.email,
        password: data.password,
        picture: data.photo,
        seller: data.seller,
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.error);
      }
    }
  };

  const handleChange = (name) => (event) => {
    let value;

    if (name === "photo") {
      value = event.target.files[0];
      const fileNameElement = document.getElementById("file-name");
      if (value) {
        fileNameElement.textContent = value.name;
      } else {
        fileNameElement.textContent = "No file selected";
      }
    } else {
      value = event.target.value;
    }

    setValues({ ...values, [name]: value });
  };

  const handleCheck = (e) => {
    setValues({ ...values, seller: e.target.checked });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData(); // Create a new userData object
      userData.append("name", values.name); // Append form data fields
      userData.append("email", values.email);
      values.password && userData.append("password", values.password);

      userData.append("seller", values.seller);

      if (values.photo) {
        userData.append("photo", values.photo);
      } // Append the photo file
      const data = await update(
        { userId: params.userId },
        { t: jwt.token },
        userData
      );
      useAuth.updateUser(data, () => {
        setValues({ ...values, id: data._id });
        window.location.reload();
      });
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        setValues({ ...values, error: errorMessage });
        notify(errorMessage);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 justify-items-center bg-red">
        <form
          encType="multipart/form-data"
          className="flex flex-col w-full px-4 md:px-0  gap-3"
        >
          <p className="text-center italic font-bold lg:text-xl text-md mb-4">
            Update your profile
          </p>
          <div className="flex items-center lg:w-[500px] lg:mx-auto border-2  rounded-lg">
            <label className="relative block w-full cursor-pointer h-48 bg-gray-200 border-2 border-gray-300 rounded-lg">
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange("photo")}
                name="photo"
              />
              <span className="absolute inset-0 flex justify-center items-center">
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  ></path>
                </svg>
                <span className="text-gray-500" id="file-name">
                  Upload Image
                </span>
              </span>
            </label>
          </div>
          <div className="flex mt-2 md:flex-row gap-3 flex-col">
            <div className="flex flex-col gap-2 lg:w-[500px] w-full ">
              <label className="ml-1">Full Name</label>
              <input
                type={"text"}
                className="py-3 px-2 focus:bg-white focus:outline-blue-200 border-2 rounded-lg w-full"
                value={values.name}
                onChange={handleChange("name")}
                name="name"
                placeholder="Enter your name..."
              />
            </div>

            <div className="flex flex-col gap-2 lg:w-[500px] w-full ">
              <label className="ml-1">Email Address</label>
              <input
                type={"text"}
                className="py-3 px-2 focus:bg-white focus:outline-blue-200 border-2 rounded-lg w-full"
                value={values.email}
                onChange={handleChange("email")}
                name="email"
                placeholder="Enter your email..."
              />
            </div>
          </div>

          <div className="flex items-center mt-2 md:flex-row gap-3 flex-col ">
            <div className="flex flex-col gap-2 lg:w-[500px] w-full">
              <label className="">Password</label>

              <input
                type={"text"}
                className="py-3 px-2 focus:bg-white focus:outline-blue-200 border-2 rounded-lg w-full"
                value={values.password}
                onChange={handleChange("password")}
                name="password"
                placeholder="Enter your password..."
              />
            </div>
            <div className="flex w-full items-center mt-4">
              <input
                class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-red-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                checked={values.seller}
                onChange={handleCheck}
                id="flexSwitchCheckDefault"
              />
              <label
                class="inline-block pl-[0.15rem] hover:cursor-pointer"
                for="flexSwitchCheckDefault"
              >
                Be a Seller
              </label>
            </div>
          </div>
          <div className="flex w-full items-center justify-center md:mt-6">
            <button
              className="bg-red-500 px-4 py-2 mt-2 w-full md:w-60 mb-[64px] lg:w-72 rounded-lg text-white font-bold"
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </form>
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
    </div>
  );
};

export default EditProfile;
