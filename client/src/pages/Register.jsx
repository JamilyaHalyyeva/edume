import { useEffect, useState } from "react";

import LOGO from "../assets/logo.png";
import REGISPANDA from "../assets/panda.png";

import EDUME from "../assets/edume.png";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../context/RegisterProvider";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { updateUserToBeRegistered, userToBeRegistered } = useRegister();

  useEffect(() => {
    if (userToBeRegistered) {
      userToBeRegistered.username && setUsername(userToBeRegistered.username);
      userToBeRegistered.surname && setSurname(userToBeRegistered.surname);
      userToBeRegistered.email && setEmail(userToBeRegistered.email);
      userToBeRegistered.password && setPassword(userToBeRegistered.password);
    }
  }, []);

  const handleNext = async () => {
    try {
      // Validate username
      if (!username) {
        setUsernameError("Username is required");
        return;
      } else {
        setUsernameError("");
      }

      // Validate surname
      if (!surname) {
        setSurnameError("Surname is required");
        return;
      } else {
        setSurnameError("");
      }

      // Validate email
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setEmailError("Invalid email address");
        return;
      } else {
        setEmailError("");
      }

      // Validate password
      if (!password || password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        return;
      } else {
        setPasswordError("");
      }

      const localRole = localStorage.getItem("role");
      console.log(localRole);
      const roleVal = localRole === null ? "student" : localRole;
      updateUserToBeRegistered({
        username,
        surname,
        email,
        password,
        role: roleVal,
      });

      if (roleVal === "student") {
        navigate("/register/student");
      } else {
        navigate("/register/teacher");
      }

      // Redirect or perform other actions after successful registration
    } catch (error) {
      console.error("Error in registerUser:", error.message);
      setError("Registration failed"); // Handle registration error
    }
  };

  return (
    <>
      <div className=" w-full  flex item-center justify-center 2xl:p-10">
        <div className="2xl:w-2/5  2xl:rounded-l-2xl xl:w-1/2 lg:w-1/2 md:w-1/2 sm:hidden md:flex xs:hidden flex-col justify-center items-center  bg-gray-100">
          <div className="registerImage ">
            <img src={REGISPANDA} alt="" className="h-[30rem] w-[30rem] flex" />
          </div>
          <div className=" justify-between items-center w-4/5 rounded-xl flex  bottom-10  p-5 ml-10 h-20 shadow-2xl bg-slate-100/50">
            <span className="text text-gray-700 text-lg font-extrabold">
              Do you have an account?
            </span>
            <Link to={"/register"}>
              <button
                type="submit"
                className="group relative  flex justify-center py-2 px-4 w-[10rem]  text-sm font-medium rounded-2xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign in
              </button>
            </Link>
          </div>
        </div>

        <div className=" 2xl:w-2/5 2xl:rounded-r-2xl   xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full  xs:w-full flex flex-col justify-center items-center bg-gray-100">
          <div className="2xl:hidden xl:hidden lg:hidden md:hidden mb-10 sm:mb-3 xs:mb-1 sm:pt-10 flex-row">
            <img
              src={LOGO}
              className="w-[15rem] h-[15rem] xs:w-[10rem] xs:h-[10rem]  flex "
            />
          </div>
          <div className=" flex justify-center items-center flex-row">
            <img src={EDUME} className="w-40 " />
          </div>
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-5 text-center text-3xl font-extrabold text-gray-900">
                Register
              </h2>
            </div>
            <form
              className="mt-8 space-y-6 w-3/2 p-10 sm:p-1 xs:p-8 xs:ml-3   flex-row"
              onSubmit={handleNext}
            >
              <div className="username-wrapper sm:m-0">
                <label
                  htmlFor="username"
                  className="sr-only item-center"
                ></label>
                <input
                  type="text"
                  id="username"
                  className="username appearance-none rounded-xl min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && (
                  <div className="text-red-500">{usernameError}</div>
                )}
              </div>

              <div className="surname-wrapper">
                <label
                  htmlFor="surname"
                  className="sr-only item-center"
                ></label>
                <input
                  type="text"
                  id="surname"
                  className="username appearance-none rounded-xl min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  value={surname}
                  placeholder="Surname"
                  onChange={(e) => setSurname(e.target.value)}
                />
                {surnameError && (
                  <div className="text-red-500">{surnameError}</div>
                )}
              </div>

              <div className="email-wrapper">
                <label htmlFor="email" className="sr-only item-center"></label>
                <input
                  type="email"
                  id="email"
                  className="username appearance-none rounded-xl min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <div className="text-red-500">{emailError}</div>}
              </div>

              <div>
                <label htmlFor="password" className="sr-only item-center">
                  Password:
                </label>
                <input
                  type="password"
                  id="password"
                  className="username appearance-none rounded-xl min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && (
                  <div className="text-red-500">{passwordError}</div>
                )}
              </div>

              {error && <div className="text-red-500">{error}</div>}
              <button
                type="button"
                onClick={handleNext}
                className="group  items-center min-h-12 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Next
              </button>
            </form>
          </div>

          <div className="2xl:hidden xl:hidden lg:hidden mb-10 md:hidden  sm:hidden  justify-center item-center flex-row  w-4/5 rounded-xl flex ">
            <Link to={"/loginpage"}>
              <button
                type="submit"
                className="group relative w-[10rem] h-10 flex justify-center py-2 px-4  text-sm font-medium rounded-3xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
