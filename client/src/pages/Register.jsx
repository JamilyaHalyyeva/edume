// RegisterPage.js
import { useState } from "react";
import { useUser } from "../context/UserProvider";
import StudentPreProfilePage from "./StudentPreProfilePage";

const RegisterPage = () => {
  const { registerUser } = useUser();

  const [username, setUsername] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const role = localStorage.getItem("role");
  const handleRegister = async () => {
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

      // Call registerUser method
      await registerUser({ username, surname, email, password });

      // Redirect or perform other actions after successful registration
    } catch (error) {
      setError("Registration failed"); // Handle registration error
    }
  };

  return (
    <>
      {role && role.toString() === "student" && <StudentPreProfilePage />}
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Register
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border rounded-md"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              {usernameError && (
                <div className="text-red-500">{usernameError}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="surname"
                className="block text-sm font-medium text-gray-700"
              >
                Surname:
              </label>
              <input
                type="text"
                id="surname"
                className="mt-1 p-2 w-full border rounded-md"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              {surnameError && (
                <div className="text-red-500">{surnameError}</div>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="text"
                id="email"
                className="mt-1 p-2 w-full border rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <div className="text-red-500">{emailError}</div>}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="mt-1 p-2 w-full border rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {passwordError && (
                <div className="text-red-500">{passwordError}</div>
              )}
            </div>

            {error && <div className="text-red-500">{error}</div>}
            <button
              type="button"
              onClick={handleRegister}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
