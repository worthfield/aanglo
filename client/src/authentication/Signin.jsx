import React, { useState } from "react";
import {
  Form,
  Link,
  Navigate,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import hero from "../assets/images/hero_bg.jpg";
import { signin } from "../apis/auth-api";
import auth from "./auth-helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}
export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const pathname = new URL(request.url).searchParams.get("redirectTo") || "/";
  try {
    const response = await signin({ email, password });
    auth.authenticate(response);
    return redirect(pathname);
  } catch (error) {
    return error.response.data.error;
  }
}

const Signin = () => {
  const [redirectTo, setRedirectTo] = useState(false);
  const data = useLoaderData();
  const error = useActionData();
  const navigation = useNavigation();
  console.log(navigation.state);

  const loggedIn = auth.isAuthenticated();
  useEffect(() => {
    if (loggedIn) {
      setRedirectTo(true);
    }
  }, []);
  if (redirectTo) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="h-[194px] relative">
        {data &&
          toast.error(data, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })}
        <img className="w-full h-full object-cover object-center" src={hero} />
        <p className="absolute uppercase top-1/2 left-1/2 w-full text-center sm:text-2xl md:text-3xl lg:text-4xl transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
          Sign into your account
        </p>
      </div>
      <div className="container mt-20 mx-auto">
        <div className="grid grid-cols-1 gap-[15px] md:grid-cols-2 ">
          <div className="px-[15px] mt-5 md:mt-[77px]">
            <Form method="post" replace>
              <div className="mb-[13px] flex flex-col">
                <label className="mb-[3px]">Email Address:*</label>
                <input
                  type="text"
                  className="pt-[10px] px-[10px] pb-[9px] border-2"
                  name="email"
                />
              </div>
              <div className="mb-[13px] flex flex-col">
                <label className="mb-[3px]">Password:*</label>
                <input
                  type="password"
                  className="pt-[10px] px-[10px] pb-[9px] border-2"
                  name="password"
                />
              </div>
              {error && (
                <div className="bg-red-700 text-white w-full font-sans font-bold rounded-md text-center p-2">
                  {error}
                </div>
              )}
              <div className="mb-[13px] flex items-center flex-col md:flex-row">
                <button
                  disabled={navigation.state === "submitting"}
                  className={`p-3 uppercase mt-[20px] md:mt-[7px] text-[14px]  ${
                    navigation.state === "submitting"
                      ? " bg-gray-700 cursor-not-allowed"
                      : "bg-red-500"
                  } border-0 rounded-[9999px] w-full font-bold text-white `}
                >
                  {navigation.state === "submitting" ? "signing..." : "SIGN IN"}
                </button>
                <Link className="md:ml-5 mt-6 md:mt-0 text-center  w-full text-red-500">
                  Forgot Your password
                </Link>
              </div>
            </Form>
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
                <button className="uppercase my-5 bg-red-500 text-white p-3 rounded-[9999px] text-[14px] font-bold">
                  <Link to={"/signup"} className="w-full h-full">
                    create an account
                  </Link>
                </button>
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
    </div>
  );
};

export default Signin;
