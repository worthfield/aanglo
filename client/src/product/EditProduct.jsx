import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import auth from "../authentication/auth-helper";
import { read, update } from "../apis/product-api";
import { BiArrowBack } from "react-icons/bi";

const EditProduct = () => {
  const [values, setValues] = useState({
    id: "",
    name: "",
    description: "",
    photo: "",
    category: "",
    quantity: "",
    price: "",
    redirect: false,
    error: "",
  });
  const [disableButton, setDisableButton] = useState(false);

  const jwt = auth.isAuthenticated();
  const params = useParams();
  console.log(params)
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const data = await read({
        productId: params.productId,
      });
      setValues({
        ...values,
        id: data._id,
        name: data.name,
        description: data.description,
        category: data.category,
        quantity: data.quantity,
        price: data.price,
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
  console.log(values);
  const handleClick = async (e) => {
    e.preventDefault();
    setDisableButton(true);
    let productData = new FormData();
    values.name && productData.append("name", values.name);
    values.description && productData.append("description", values.description);
    values.category && productData.append("category", values.category);
    values.quantity && productData.append("quantity", values.quantity);
    values.price && productData.append("price", values.price);
    values.photo && productData.append("photo", values.photo);
    try {
      const data = await update(
        { shopId: params.shopId, productId: params.productId },
        { t: jwt.token },
        productData
      );
      setValues({ ...values, redirect: true });
      setDisableButton(false)
    } catch (err) {
      if (err.response) {
        setValues({ ...values, error: err.response.data.error });
        setDisableButton(false)
      }
    }
  };
  if(values.redirect){
    return <Navigate to={`/seller/shops/edit/${params.shopId}`}/>
  }
  return (
    <div className="container mx-auto">
      <Link to=".." className="flex gap-2 ml-3 mt-[24px]  items-center">
        <BiArrowBack />
        <p>Back to store</p>
      </Link>
      <div className="grid grid-cols-1 justify-items-center bg-red">
        <form
          encType="multipart/form-data"
          className="lg:ml-[120px] flex flex-col w-full px-4 md:px-0 md:w-[400px] sm:w-[350px] lg:w-[500px] mt-[24px] lg:mt-[64px] gap-3"
        >
          <p className="text-center italic font-bold lg:text-xl text-base mb-4">
            Edit your Product...
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
              name="name"
              value={values.name}
              onChange={handleChange("name")}
              placeholder="Enter your product name..."
            />
          </div>
          <div className="flex items-center border-2 lg:w-[500px] w-full rounded-lg">
            <select
              className="w-full py-3 px-2 focus:outline-blue-200 rounded-lg"
              value={values.category}
              onChange={handleChange("category")}
            >
              <option value="">Optional</option>
              <option value="Electronics">Electronics</option>
              <option value="Men Clothing">Men Clothing</option>
              <option value="Women Clothing">Women Clothing</option>
            </select>
          </div>
          <div className="flex items-center border-2 lg:w-[500px] w-full rounded-lg">
            <input
              type={"number"}
              className="py-3 px-2 focus:bg-white focus:outline-blue-200 rounded-lg w-full"
              name="quantity"
              value={values.quantity}
              onChange={handleChange("quantity")}
              placeholder="Quantity"
            />
          </div>
          <div className="flex items-center border-2 lg:w-[500px] w-full rounded-lg">
            <input
              type={"number"}
              className="py-3 px-2 focus:bg-white focus:outline-blue-200 rounded-lg w-full"
              name="price"
              value={values.price}
              onChange={handleChange("price")}
              placeholder="price"
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
              placeholder="Describe about your product..."
            />
          </div>
          <button
            className={`px-4 py-2 mb-[64px] rounded-lg text-white font-bold  ${
              disableButton ? "bg-gray-700 cursor-not-allowed" : "bg-red-500 "
            }`}
              onClick={handleClick}
              disabled={disableButton}
          >
            Edit your product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
