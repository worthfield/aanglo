import { Outlet, Navigate, redirect } from "react-router-dom";
import auth from "./authentication/auth-helper";
export async function requireAuth() {
  const loggedIn = auth.isAuthenticated();
  if (!loggedIn) {
    return redirect("/signin?message=You must signin first!");
  }
  return <Outlet />;
}
export async function sellerAuth(request) {
   const pathname = new URL(request.url).pathname

  const loggedIn = auth.isAuthenticated();
  if (!loggedIn) {
    return redirect(`/signin?message=You must signin first!&redirectTo=${pathname}`);
  } else {
    if (loggedIn.user.seller === true) {
      return <Outlet />;
    }
    return redirect(`/user/${loggedIn.user._id}?message=You must be a seller&redirectTo=${pathname}`);
  }
}
