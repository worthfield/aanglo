// import React, { useEffect, useState } from "react";
// import { Link, Navigate, useParams } from "react-router-dom";
// import { read, remove } from "../apis/user-api";
// // import { useAuth } from "../Export";
// import useAuth from "../authentication/auth-helper";
// const Profile = () => {
//   const [user, setUser] = useState({});
//   const [redirectToSignin, setRedirectToSignin] = useState(false);
//   const params = useParams();
//   const jwt = useAuth.isAuthenticated();
//   useEffect(() => {
//     fetchUser();
//   }, [params.userId]);
//   const fetchUser = async () => {
//     try {
//       const user = await read({ userId: params.userId }, { t: jwt.token });
//       setUser(user);
//       console.log(user);
//     } catch (error) {
//       if (error.response) {
//         setRedirectToSignin(true);
//       }
//     }
//   };

//   const deleteUser = async () => {
//     try {
//       const deletedUser = await remove({ userId: params.userId });
//       console.log(deletedUser);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const photoUrl = user._id
//     ? `/api/users/photo/${user._id}?${new Date().getTime()}`
//     : "/api/users/defaultphoto";

//   if (redirectToSignin) {
//     return <Navigate to={"/signin"} />;
//   }
//   // console.log(auth.isAuthenticated().user)
//   // console.log(auth.isAuthenticated().user._id)
//   // console.log(user._id)
//   return (
//     <div>
//       {/* {user ? (
//         <div>
//         <div onClick={deleteUser}>Delete</div>
//         </div>
//         ) : (
//           "no zero"
//         )} */}

//       <div>{user.name}</div>
//       <img src={photoUrl} />
//       {useAuth.isAuthenticated().user &&
//         useAuth.isAuthenticated().user._id == user._id && (
//           <div>
//             <Link to={`/user/edit/${user._id}`}>edit</Link>
//             <div onClick={deleteUser}>Delete</div>
//           </div>
//         )}
//       {user.seller &&
//         (user.stripe_seller ? (
//           <button>payment Connected</button>
//         ) : (
//           <button>Connect to Stripe</button>
//         ))}
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { FaAddressBook, FaUserAlt } from "react-icons/fa";
import { MdFindInPage, MdPayments } from "react-icons/md";
import { Link, NavLink, Outlet, useLoaderData, useParams, useSearchParams } from "react-router-dom";
import auth from "../authentication/auth-helper";
import { read } from "../apis/user-api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function loader({request}){
    return new URL(request.url).searchParams.get("message");
}

const ProfileLayout = () => {
  const [user, setUser] = useState({});
  const data = useLoaderData();
  const params = useParams();
  useEffect(() => {
    fetchUser();
  }, [params.userId]);

  const loggedIn = auth.isAuthenticated();
  const active =
    "flex px-5 items-center border-b-2 text-white py-[15px] bg-red-500 w-full gap-2 text-sans";
  const nonActive =
    "flex px-5 items-center border-b-2 text-gray-500 py-[15px] bg-white w-full gap-2 text-sans";

  const fetchUser = async () => {
    try {
      const user = await read({ userId: params.userId }, { t: loggedIn.token });
      setUser(user);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      }
    }
  };

  const photoUrl = user._id
    ? `/api/users/photo/${user._id}?${new Date().getTime()}`
    : "/api/users/defaultphoto";

  return (
    <div className="container mx-auto mt-[77px]">
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
      <p className="mb-5 text-xl sm:text-2xl lg:text-4xl font-bold font-sans">
        Your Account
      </p>
      <div className="flex flex-col border-2 rounded-md mb-32 drop-shadow-sm bg-white sm:flex-row">
        <div className="w-full md:w-[25%] sm:w-[30%] border-r-2 flex flex-col items-center  ">
          <div className="p-6 flex flex-col gap-3 items-center">
            <div className="w-[100px] h-[100px] bg-green-400 rounded-full border-[5px] drop-shadow-sm">
              <img
                src={photoUrl}
                className="w-full h-full rounded-full object-cover object-center"
              />
            </div>
            <p>{loggedIn.user.name}</p>
          </div>
          <NavLink
            to={`/user/${loggedIn.user._id}`}
            className={({ isActive }) => (isActive ? active : nonActive)}
          >
            <FaUserAlt size={20} />

            <p className="text-xl">Profile</p>
          </NavLink>
          <NavLink
            to={`/user/${loggedIn.user._id}/address`}
            className={({ isActive }) => (isActive ? active : nonActive)}
          >
            <FaAddressBook size={20} />
            <p className="text-xl">Address</p>
          </NavLink>
          <NavLink
            to={`/user/${loggedIn.user._id}/orders`}
            className={({ isActive }) => (isActive ? active : nonActive)}
          >
            <MdFindInPage size={24} />
            <p className="text-xl">Orders</p>
          </NavLink>
          <NavLink
            to={`/user/${loggedIn.user._id}/payments`}
            className={({ isActive }) => (isActive ? active : nonActive)}
          >
            <MdPayments size={24} />
            <p className="text-xl">Payments</p>
          </NavLink>
        </div>
        <div className="w-full p-4 md:p-5 md:w-[75%] sm:w-[70%] ">
          <Outlet />
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

export default ProfileLayout;
