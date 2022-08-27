import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

const AuthContext = React.createContext();
const AuthContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [isLogin, setIsLogin] = useState(userData ? true : false);

  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, "users", email), {
      savedShows: [],
    });
  }

  const logOut = () => {
    localStorage.removeItem("userData");
    setIsLogin(false);
    window.location.reload();
  };
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        setIsLogin,
        userData,
        setUserData,
        logOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};

export { AuthContext, AuthContextProvider };
