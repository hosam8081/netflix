import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/AuthContext";
const Navbar = () => {
  const { isLogin, logOut } = useGlobalContext();
  return (
    <div className="flex justify-between items-center p-4 z-[100] w-full absolute flex-wrap">
      <Link to="/" className="text-red-600 text-4xl cursor-pointer font-bold">
        NETFLIX
      </Link>
      <div className="mt-4">
        {isLogin ? (
          <>
            <Link to="/account" className="text-white pr-4">
              account
            </Link>
            <Link to="/login" className="main-btn" onClick={() => logOut()}>
              log out
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white pr-4">
              Sign In
            </Link>
            <Link to="/signup" className="main-btn">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
