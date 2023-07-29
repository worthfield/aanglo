import React, { useState } from "react";
import { create } from "../apis/store-api";
import auth from "../authentication/auth-helper";
import { Link, Navigate } from "react-router-dom";
import { RiErrorWarningLine } from "react-icons/ri";
import { BiArrowBack } from "react-icons/bi";

const NewStore = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    photo: "",
    redirect: false,
    error: "",
  });
  const [status, setStatus] = useState("idle");

  const jwt = auth.isAuthenticated();

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

  const clickSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting");

    let shopData = new FormData();
    values.name && shopData.append("name", values.name);
    values.description && shopData.append("description", values.description);
    values.photo && shopData.append("photo", values.photo);
    try {
      await create({ userId: jwt.user._id }, { t: jwt.token }, shopData);
      setStatus("idle");
      setValues({ ...values, error: "", redirect: true });
    } catch (error) {
      if (error.response) {
        setValues({ ...values, error: error.response.data.error });
        setStatus("idle");
      }
    }
    setStatus("idle");
  };

  if (values.redirect) {
    return <Navigate to={"/seller/shops"} />;
  }

  return (
    <div className="container mx-auto">
      <Link to=".." className="flex gap-2 mt-[24px]  items-center">
        <BiArrowBack />
        <p>Back to store</p>
      </Link>
      <div className="grid grid-cols-1 justify-items-center bg-red">
        <form
          encType="multipart/form-data"
          className="lg:ml-[120px] flex flex-col w-full px-4 md:px-0 md:w-[400px] sm:w-[350px] lg:w-[500px] mt-[24px] lg:mt-[64px] gap-3"
        >
          <p className="text-center italic font-bold lg:text-xl text-md mb-4">
            Open your store...
          </p>
          <div className="flex items-center border-2 lg:w-[500px] w-full rounded-lg">
            <label className="relative block lg:w-[500px] md:w-[400px] sm:w-[350px] w-full cursor-pointer h-48 bg-gray-200 border-2 border-gray-300 rounded-lg">
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
          <div className="flex items-center border-2 lg:w-[500px] w-full rounded-lg">
            <input
              type={"text"}
              className="py-3 px-2 focus:bg-white focus:outline-blue-200 rounded-lg w-full"
              value={values.name}
              onChange={handleChange("name")}
              name="name"
              placeholder="Enter your store name..."
            />
          </div>
          <div className="flex items-center border-2 lg:w-[500px] w-full rounded-lg">
            <textarea
              type={"text"}
              className="py-3 px-2 focus:bg-white w-full flex-1 rounded-lg focus:outline-blue-200"
              value={values.description}
              onChange={handleChange("description")}
              rows="5"
              name="description"
              placeholder="Describe about your store..."
            />
          </div>
          {values.error && (
            <div className="bg-red-300 text-red-500 font-bold lg:w-[500px] flex items-center gap-2  rounded-md p-2">
              <i>
                <RiErrorWarningLine size={32} className={"text-red-500"} />
              </i>
              <p>{values.error}</p>
            </div>
          )}
          <button
            disabled={status === "Submitting"}
            className={`uppercase px-4 py-2 mb-[64px] rounded-lg text-white font-bold  ${
              status === "Submitting"
                ? "bg-gray-700 cursor-not-allowed"
                : "bg-red-500"
            }`}
            onClick={clickSubmit}
          >
            {status === "Submitting"
              ? "Creating your store..."
              : "create an account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewStore;
