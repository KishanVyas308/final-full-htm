import React, { useEffect } from "react";
import Cookies from "js-cookie"; // Import js-cookie
import { useRecoilState } from "recoil";
import { isLoginAtom } from "./atom/isLogin";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";


const className = 'my-custom-class';

const Login: React.FC = () => {
  const [id, setId] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [idError, setIdError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);

  const [isUserLogin, setIsUserLogin] = useRecoilState(isLoginAtom);

  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setIsUserLogin(true);
    }
  }, []);

  const validateForm = () => {
    let isValid = true;

    if (!id) {
      setIdError(true);
      isValid = false;
    } else {
      setIdError(false);
    }

    if (!password) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    return isValid;
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) return;

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
        Cookies.set("authToken", result.token, { expires: 1 });
        console.log("Login successful:", result.token);
        setIsUserLogin(true);
        navigate("/gov");
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
    <div className="flex items-center justify-center min-h-screen bg-zinc-800">
      <div className="absolute top-0 left-0 w-full h-full overflow-clip">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 82 72"
          fill="none"
          stroke="currentColor"
          stroke-width="6"
          xmlns="http://www.w3.org/2000/svg"
          className={clsx("text-fuchsia-500/10 -rotate-6", className)}
        >
          <path
            d="M3.44337 38.5C2.55021 36.953 2.55021 35.047 3.44338 33.5L20.0566 4.72501C20.9498 3.178 22.6004 2.22501 24.3868 2.22501H57.6132C59.3996 2.22501 61.0502 3.178 61.9434 4.72501L78.5566 33.5C79.4498 35.047 79.4498 36.953 78.5566 38.5L61.9434 67.275C61.0502 68.822 59.3996 69.775 57.6132 69.775H24.3867C22.6004 69.775 20.9498 68.822 20.0566 67.275L3.44337 38.5Z"
            vector-effect="non-scaling-stroke"
          />
        </svg>
      </div>
      <div className="w-full max-w-md p-6 bg-zinc-700 rounded-lg shadow-md z-50">
        <h2 className="text-2xl font-bold text-center text-fuchsia-400 mb-4">
          Login
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-white">ID</label>
            <input
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`text-black w-full p-2 border rounded ${idError ? "border-red-500" : "border-zinc-600"
                }`}
              type="text"
            />
            {idError && (
              <p className="text-red-500 text-xs italic">ID is required</p>
            )}
          </div>

          <div>
            <label className="block text-white">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`text-black w-full p-2 border rounded ${passwordError ? "border-red-500" : "border-zinc-600"
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
            className="w-full mt-4 p-2 bg-fuchsia-700 text-white rounded hover:bg-fuchsia-600"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;