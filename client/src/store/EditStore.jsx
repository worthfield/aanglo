import React, { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { Link, Navigate, useParams } from "react-router-dom";
import { read, update } from "../apis/store-api";
import auth from "../authentication/auth-helper";
import MyProducts from "../product/MyProducts";
import { BiArrowBack } from "react-icons/bi";


const EditStore = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    photo: "",
    redirect: false,
    error: "",
    id: "",
    owner: "",
  });
  const jwt = auth.isAuthenticated();
  const params = useParams();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await read({
        shopId: params.shopId,
      });
      setValues({
        ...values,
        id: data._id,
        name: data.name,
        description: data.description,
        owner: data.owner.name,
      });
    } catch (err) {
      if (err.response) {
        console.log(err.response.data.error);
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

  const handleClick = async (e) => {
    e.preventDefault();
    let shopData = new FormData();
    values.name && shopData.append("name", values.name);
    values.description && shopData.append("description", values.description);
    values.photo && shopData.append("photo", values.photo);
    try {
      const data = await update(
        { shopId: params.shopId },
        { t: jwt.token },
        shopData
      );
      setValues({ ...values, redirect: true });
    } catch (err) {
      if (err.response) {
        setValues({ ...values, error: err.response.data.error });
      }
    }
  };
  if (values.redirect) {
    return <Navigate to="/seller/shops" />;
  }

  return (
    <div className="container mx-auto">
      <Link to=".."className="flex gap-2 mt-[24px]  items-center">
        <BiArrowBack />
        <p>Back to store</p>
      </Link>
      <div className="grid grid-cols-2 gap-4 mt-[24px]">
        <div className="bg-red-400 h-[400px] lg:h-[400px] rounded-lg md:h-[300px] col-span-2 md:col-span-1">
          <img
            className="w-full h-full object-cover bg-center rounded-lg bg-cover"
            src={"/api/shops/logo/" + values.id + "?" + new Date().getTime()}
          />
        </div>
        <div className="col-span-2 md:border-2 border-blue-300  rounded-lg bg-white md:col-span-1">
          <p className="text-center text-xl mt-[10px]">Customize your shop</p>
          <form
            encType="multipart/form-data"
            className="flex flex-col items-center mx-auto  w-full h-full md:w-[300px] lg:w-[400px] gap-2 justify-center border-blue-300 rounded-lg "
          >
            <div className="flex items-center border-2 w-full rounded-lg">
              <label className="relative block  w-full cursor-pointer h-[50px] bg-gray-200 border-2 border-gray-300 rounded-lg">
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

            <input
              className="py-3 px-2 w-full  focus:outline-blue-200 rounded-lg border-blue-400 border-2"
              type="text"
              value={values.name}
              onChange={handleChange("name")}
              name="name"
              placeholder="Enter your store name..."
            />
            <textarea
              className="py-3 border-blue-400 border-2 px-2 w-full focus:bg-white rounded-lg focus:outline-blue-200"
              rows="2"
              name="description"
              type={"text"}
              value={values.description}
              placeholder="Describe about your store..."
              onChange={handleChange("description")}
            />
            {values.error && (
              <div className="bg-red-300 text-red-500 font-bold lg:w-[500px] flex items-center gap-2  rounded-md p-2">
                <i>
                  <RiErrorWarningLine size={32} className={"text-red-500"} />
                </i>
                <p>{values.error}</p>
              </div>
            )}
            <button
              className="bg-[#1D9BF0] px-4 py-2 mb-[64px] rounded-lg text-white font-bold"
              onClick={handleClick}
            >
              Edit your store
            </button>
          </form>
        </div>
      </div>

      <MyProducts shopId={params.shopId} />
    </div>
  );
};

export default EditStore;


