// LoginPage.js
import { useState } from "react";
import { useUser } from "../context/UserProvider";
import LOGO from "../assets/logo.png";
import GOOGLEICON from "../assets/googleicon.png";
import EDUME from "../assets/edume.png";
import BIO from "../assets/bio.png";
import { motion } from "framer-motion";
import CHIM from "../assets/chim.png";
import COMP from "../assets/comp.png";
import MATH from "../assets/math.png";
import CUL from "../assets/cul.png";
import MUS from "../assets/mus.png";
import ENG from "../assets/eng.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faShield } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { loginUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    try {
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

      // Call loginUser method
      try {
        loginUser({ email, password });
      } catch (error) {
        console.error("Error in loginUser:", error.message);
      }

      // Redirect or perform other actions after successful login
    } catch (error) {
      setError("Invalid email or password"); // Handle login error
    }
  };

  return (
    <div className=" w-full h-screen flex item-center justify-center 2xl:p-10">
      <div className="2xl:w-2/5  2xl:rounded-l-2xl xl:w-1/2 lg:w-1/2 md:w-1/2 sm:hidden md:flex xs:hidden flex-col justify-center items-center  bg-gray-100">
        <div className=" flex justify-center  items-center flex-row">
          <motion.div
            initial={{ y: 30 }} // Initial position (above the viewport)
            animate={{
              // y: [-30, 30, -30], // Animate x position from -50 to 50 and back to -50
              x: [30, -20, 30], // Animate x position from -50 to 50 and back to -50
              transition: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                varient: "rotate",
              },
            }}
            style={{ position: "relative", width: "100px", height: "100px" }}
          >
            <motion.img
              src={BIO}
              alt="Floating Image"
              style={{
                width: "80px",
                height: "80px",

                position: "absolute",
              }}
            ></motion.img>
          </motion.div>
        </div>
        <div className=" flex justify-center mb-[-3rem]  flex-row gap-15 items-end">
          <motion.div
            initial={{ y: -30 }} // Initial position (above the viewport)
            animate={{
              y: [-30, 30, -30], // Animate x position from -50 to 50 and back to -50
              x: [30, -30, 30], // Animate x position from -50 to 50 and back to -50
              transition: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                varient: "rotate",
              },
            }}
            style={{ position: "relative", width: "100px", height: "100px" }}
          >
            <motion.img
              src={CHIM}
              alt="Floating Image"
              style={{
                width: "80px",
                height: "80px",

                position: "absolute",
              }}
            ></motion.img>
          </motion.div>
          <div className="w-40"></div>
          <motion.div
            initial={{ y: -30 }} // Initial position (above the viewport)
            animate={{
              x: [30, -30, 30], // Animate x position from -50 to 50 and back to -50
              y: [30, -30, 30], // Animate x position from -50 to 50 and back to -50
              transition: {
                repeat: Infinity,
                duration: 5,
                ease: "easeInOut",
                varient: "rotate",
              },
            }}
            style={{ position: "relative", width: "100px", height: "100px" }}
          >
            <motion.img
              src={CUL}
              alt="Floating Image"
              style={{
                width: "90px",
                height: "90px",

                position: "absolute",
              }}
            ></motion.img>
          </motion.div>
        </div>

        <div className=" flex justify-center items-center flex-row">
          <div className="ml-[2rem]">
            <motion.div
              initial={{ y: -30 }} // Initial position (above the viewport)
              animate={{
                y: [-30, 30, -30], // Animate x position from -50 to 50 and back to -50
                // x: [30, -30, 30], // Animate x position from -50 to 50 and back to -50
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  varient: "rotate",
                },
              }}
              style={{ position: "relative", width: "100px", height: "100px" }}
            >
              <motion.img
                src={MUS}
                alt="Floating Image"
                style={{
                  width: "80px",
                  height: "80px",

                  position: "absolute",
                }}
              ></motion.img>
            </motion.div>
          </div>
          <div>
            <img src={LOGO} className=" flex " />
          </div>

          <div>
            <motion.div
              initial={{ y: -30 }} // Initial position (above the viewport)
              animate={{
                // x: [-30, 30, -30], // Animate x position from -50 to 50 and back to -50
                y: [30, -30, 30], // Animate x position from -50 to 50 and back to -50
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  varient: "rotate",
                },
              }}
              style={{ position: "relative", width: "100px", height: "100px" }}
            >
              <motion.img
                src={COMP}
                alt="Floating Image"
                style={{
                  width: "90px",
                  height: "90px",

                  position: "absolute",
                }}
              ></motion.img>
            </motion.div>
          </div>
        </div>
        <div className=" flex justify-center items-center  gap-10 flex-row">
          <div>
            <motion.div
              initial={{ y: -30 }} // Initial position (above the viewport)
              animate={{
                y: [-30, 30, -30], // Animate x position from -50 to 50 and back to -50
                x: [-30, 30, -30], // Animate x position from -50 to 50 and back to -50
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  varient: "rotate",
                },
              }}
              style={{ position: "relative", width: "100px", height: "100px" }}
            >
              <motion.img
                src={ENG}
                alt="Floating Image"
                style={{
                  width: "80px",
                  height: "80px",

                  position: "absolute",
                }}
              ></motion.img>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ y: -20 }} // Initial position (above the viewport)
              animate={{
                x: [-30, 30, -30], // Animate x position from -50 to 50 and back to -50
                y: [30, -30, 30], // Animate x position from -50 to 50 and back to -50
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  varient: "rotate",
                },
              }}
              style={{ position: "relative", width: "100px", height: "100px" }}
            >
              <motion.img
                src={MATH}
                alt="Floating Image"
                style={{
                  width: "80px",
                  height: "80px",

                  position: "absolute",
                }}
              ></motion.img>
            </motion.div>
          </div>
          <div>
            <motion.div
              initial={{ y: -30 }} // Initial position (above the viewport)
              animate={{
                x: [-30, 30, -30], // Animate x position from -50 to 50 and back to -50
                y: [30, -30, 30], // Animate x position from -50 to 50 and back to -50
                transition: {
                  repeat: Infinity,
                  duration: 5,
                  ease: "easeInOut",
                  varient: "rotate",
                },
              }}
              style={{ position: "relative", width: "100px", height: "100px" }}
            >
              <motion.img
                src={BIO}
                alt="Floating Image"
                style={{
                  width: "80px",
                  height: "80px",

                  position: "absolute",
                }}
              ></motion.img>
            </motion.div>
          </div>
        </div>
        <div className=" justify-between  w-2/6 rounded-xl flex absolute bottom-10 mb-4 p-5 ml-10 h-20 shadow-2xl bg-slate-100/50">
          <span className="text text-gray-700 text-lg font-extrabold">
            Don&apos;t have an account?
          </span>
          <Link to={"/register"}>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4   text-sm font-medium rounded-xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
      <div className=" 2xl:w-2/5 2xl:rounded-r-2xl   xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full  xs:w-full flex flex-col justify-center items-center bg-gray-100">
        <div className="2xl:hidden xl:hidden lg:hidden md:hidden mb-10 xs:mb-1 flex-row">
          <img
            src={LOGO}
            className="w-[15rem] h-[15rem] xs:w-[10rem] xs:h-[10rem]  flex "
          />
        </div>
        <div className=" flex justify-center items-center flex-row">
          <img src={EDUME} className="w-40 " />
        </div>
        <form
          className="mt-8 space-y-6 w-4/5 p-10 xs:p-5 flex-row"
          onSubmit={handleLogin}
        >
          <div className="email-wrapper">
            <label htmlFor="email" className="sr-only item-center"></label>
            {/* <span className="email-icon">
              <FontAwesomeIcon
                icon={faEnvelope}
                style={{ position: "absolute" }}
              />
            </span> */}
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="email appearance-none rounded-xl min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="text-red-500">{emailError}</div>}
          </div>

          <div className="email-wrapper">
            <label htmlFor="password" className="sr-only"></label>
            {/* <span className="email-icon">
              <FontAwesomeIcon
                icon={faShield}
                style={{ position: "absolute" }}
              />
            </span> */}

            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className=" email appearance-none  min-h-12 relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-xl focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <div className="text-red-500">{passwordError}</div>
            )}
          </div>
          <div className="flex flex-row items-center justify-between ">
            <div className="checkbox">
              <input type="checkbox" id="remmember" />
              <label htmlFor="remmember"> Remmember me </label>
            </div>
            <div>
              <Link to={"/forgotpassword"}>
                <span className="text-blue-500">Forgot password</span>
              </Link>{" "}
            </div>
          </div>

          <div>
            <p>{error}</p>
            <button
              type="submit"
              className="group  items-center min-h-12 relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-3xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Login
            </button>
          </div>
          <div>
            <p>{error}</p>
            <button
              type="submit"
              className="group  items-center min-h-12 relative gap-5 w-full flex justify-center py-2 px-4 border  text-sm font-medium  text-gray focus:outline-none rounded-xl  bg-white focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <img src={GOOGLEICON} className="w-8 h-8 " />
              Signin with Google
            </button>
          </div>
        </form>
        <div className="2xl:hidden xl:hidden lg:hidden md:hidden  sm:hidden  justify-center item-center flex-row  w-4/5 rounded-xl flex ">
          <Link to={"/register"}>
            <button
              type="submit"
              className="group relative w-[10rem] flex justify-center py-2 px-4  text-sm font-medium rounded-2xl text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
