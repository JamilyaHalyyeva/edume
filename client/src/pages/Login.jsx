// LoginPage.js
import { useState } from "react";
import { useUser } from "../context/UserProvider";

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
      await loginUser({ email, password });

      // Redirect or perform other actions after successful login
    } catch (error) {
      setError("Invalid email or password"); // Handle login error
    }
  };

  return (
    <div className="mx-auto max-w-sm p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <div className="mb-4">
        <label>Email:</label>
        <input
          className="border border-gray-300 p-2 w-full rounded-md"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {emailError && <div className="text-red-500">{emailError}</div>}
      </div>
      <div className="mb-4">
        <label>Password:</label>
        <input
          className="border border-gray-300 p-2 w-full rounded-md"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {passwordError && <div className="text-red-500">{passwordError}</div>}
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
