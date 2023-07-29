import React from "react";
import { MdEmail } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import auth from "../../authentication/auth-helper";
const TopBar = () => {
  const loggedIn = auth.isAuthenticated();
  const handleSignout = () => {
    auth.clearJWT(() => {
      window.location.reload();
    });
  };

  return (
    <div className="container mx-auto md:flex p-2 text-white items-center  justify-between hidden">
      <div className="right flex items-center gap-4 ">
        <div className="flex items-center gap-2">
          <MdEmail className="text-white" size={20} />
          <p>aangle05@gmail.com</p>
        </div>
        <div className="border-l-2">
          <p className="ml-3">Free Shipping for all Order of Rs.2999</p>
        </div>
      </div>
      <div className="left relative cursor-pointer group border-l-2">
        <div className="flex  gap-2 ml-3 items-center">
          <FaUserCircle size={20} />
          <p>{loggedIn ? loggedIn.user.name : "Account"}</p>
        </div>
        <div className="md:w-28 lg:w-32  bg-white p-1 text-gray-500 text-center drop-shadow-md left-1 hidden rounded-sm group-hover:flex flex-col items-center absolute z-20">
          {!loggedIn ? (
            <>
              <Link
                to={"signin"}
                className="p-1 mt-2 hover:text-red-500 uppercase w-full"
              >
                Sign in
              </Link>
              <Link
                to={"signup"}
                className="p-1 mb-2 hover:text-red-500 uppercase w-full"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link
                to={`/user/${loggedIn?.user?._id}`}
                className="p-1 mt-2 hover:text-red-500 uppercase w-full"
              >
                Account
              </Link>

              <button
                className="p-1  mb-2 hover:text-red-500 uppercase w-full"
                onClick={handleSignout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
