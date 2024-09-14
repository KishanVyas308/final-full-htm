import React, { useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { useRecoilState } from "recoil";
import { isLoginAtom } from "./atom/isLogin";

const Login: React.FC = () => {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [idError, setIdError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [isUserLogin, setIsUserLogin] = useRecoilState(isLoginAtom);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsUserLogin(true);
    }
  }, []);

  const validateForm = () => {
    setIdError(false);
    setPasswordError(false);

    if (!id) {
      setIdError(true);
    }

    if (!password) {
      setPasswordError(true);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    validateForm();

    try {
      const response = await fetch("http://localhost:5000/api/gov/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          password: password,
        }),
      });

      const result = await response.json();
      if (result.token) {
        // Store token in a cookie
        Cookies.set("authToken", result.token, { expires: 1 });
        console.log("Login successful:", result.token);
        setIsUserLogin(true);
        // Redirect to Gov page or handle successful login
      } else {
        console.error("Login failed: Invalid ID or Password");
        alert("Login failed: Invalid ID or Password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">
          Login
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">ID</label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`text-black w-full p-2 border rounded ${
                idError ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
            />
            {idError && (
              <p className="text-red-500 text-xs italic">ID is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`text-black w-full p-2 border rounded ${
                passwordError ? "border-red-500" : "border-gray-300"
              }`}
              type="password"
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">
                Password is required
              </p>
            )}
          </div>

          <button
            onClick={onSubmit}
            className="w-full mt-4 p-2 bg-green-600 text-white rounded hover:bg-orange-500"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
