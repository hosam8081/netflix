import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/FormInput";
import Joi, { isError } from "joi";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { useGlobalContext } from "../context/AuthContext";

const Signup = () => {
  const {signUp} = useGlobalContext()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      pattern: `[a-z0-9]+@[a-z]+\.[a-z]{2,3}`,
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
  const [wating, setWating] = useState(false);
  const [isError, setIsError] = useState("");
  const navigate = useNavigate();

  // get user data and store in a state
  let getUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  let sendData = async (e) => {
    e.preventDefault();
    try {
      await signUp(user.email, user.password)
      navigate("/login");
    } catch (error) {
      setIsError("email aleardy regstierd");
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="/"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <form
                className="w-full flex flex-col py-4"
                onSubmit={(e) => sendData(e)}
              >
                {isError ? <span className="text-red-500">{isError}</span> : ""}
                {inputs.map((input) => {
                  return (
                    <FormInput
                      key={input.id}
                      {...input}
                      value={user[input.name]}
                      onChange={getUser}
                    />
                  );
                })}

                <button className="bg-red-600 py-3 my-6 rounded font-bold">
                  {wating ? "wating..." : "Sign Up"}
                </button>
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <p>
                    <input className="mr-2" type="checkbox" />
                    Remember me
                  </p>
                  <p>Need Help?</p>
                </div>
                <p className="py-8">
                  <span className="text-gray-600">
                    Already subscribed to Netflix?
                  </span>{" "}
                  <Link to="/login">Sign In</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
