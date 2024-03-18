import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Img from "../assets/RegLogo.png";
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [submit, setSubmit] = useState(false);
  const [counter, setCounter] = useState(3);
  const navigate = useNavigate();

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const namePattern = /\S+/;
    if (!namePattern.test(username)) {
      setNameError("Name cannot be empty");
      return;
    } else {
      setNameError("");
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmail)) {
      setEmailError("Invalid email format");
      return;
    } else {
      setEmailError("");
    }

    const userIdPattern = /^(?!@)(?=.*\d)[^\s]{6,}$/;

    if (!userIdPattern.test(userID)) {
      setUserIdError("User must contain at least 6 characters including one number , it should not start with @ and EmptySpace not allowed");
      return;
    } else {
      setUserIdError("");
    }

    const passwordPattern = /^(?!.*\s)(?=.*[a-zA-Z0-9])(?=.*[\W_]).{6,}$/;
    if (!passwordPattern.test(userPass)) {
      setPasswordError("Password must contain at least 6 characters including one special character and space not allowed.");
      return;
    } else {
      setPasswordError("");
    }

    if (userPass !== confirmPass) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: username,
          emailId: userEmail,
          userId: userID,
          password: userPass,
        }),
      });

      if (response.ok) {
        setSubmit(true);
        toast.success("Registration done");
      } else {
        toast.error("User with same Email Id or User Id Already Exists");
      }
    } catch (err) {
      toast.error("Some Error Occurred");
    }
  };

  useEffect(() => {
    if (submit) {
      const timer = setInterval(() => {
        setCounter((prev) => prev - 1);
      }, 1000);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [submit, navigate]);

  return (
    <section className="bg-gray-50 dark:bg-black lg:pb-24 pb-10">
      <div className="flex items-center justify-center">
        {submit ? (
          <div className="fixed z-20 top-48 lg:top-64 lg:py-12 lg:px-5 bg-blue-700 px-1 py-10 rounded-2xl">
            <h1 className="text-3xl lg:text-5xl font-semibold text-center text-white mb-5">
              Registration <br /> Successful
            </h1>
            <span className="text-center text-white ">
              You will be redirected to Login page in{" "}
              <span className="text-xl text-blue-100">{counter}</span>{" "}
            </span>
          </div>
        ) : null}
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            src={Img}
            alt="logo"
            className="m-3 hover:scale-110 w-36 sm:w-44 lg:w-56 rounded-xl"
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="Uname"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="Uname"
                  onChange={(e) => setUsername(e.target.value)}
                  id="Uname"
                  className={`bg-gray-50 border text-center border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    nameError ? "border-red-500" : ""
                  }`}
                  placeholder="Bhupinder Jogi"
                  required
                />
                {nameError && (
                  <p className="text-red-500 text-center hover:scale-110 font-semibold  text-xs mt-1">{nameError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  className={`bg-gray-50 border text-center border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    emailError ? "border-red-500" : ""
                  }`}
                  placeholder="user@company.com"
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-center hover:scale-110 font-semibold  text-xs mt-1">{emailError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="userId"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  User Id
                </label>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  onChange={(e) => setUserID(e.target.value)}
                  className={`bg-gray-50 border  border-gray-300 text-center text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    userIdError ? "border-red-500" : ""
                  }`}
                  placeholder="User ID"
                  required
                />
                {userIdError && (
                  <p className="text-red-500 text-center hover:scale-110 font-semibold  text-xs mt-1">{userIdError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setUserPass(e.target.value)}
                  className={`bg-gray-50 text-center border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    passwordError ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-xs text-center hover:scale-110 font-semibold mt-1">{passwordError}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  className={`bg-gray-50 text-center border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    confirmPasswordError ? "border-red-500" : ""
                  }`}
                  placeholder="Confirm Password"
                  required
                />
                {confirmPasswordError && (
                  <p className="text-red-500 text-center hover:scale-110 font-semibold text-xs mt-1">
                    {confirmPasswordError}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-white hover:text-black hover:scale-105 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                onClick={handleLogin}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default Register;
