import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Navbar from "../Components/Navbar";
import { auth } from "../firebase/firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("🎉 Login Successful!");

      navigate("/");

    } catch (err) {
      switch (err.code) {
        case "auth/invalid-credential":
          setError("Incorrect email or password.");
          break;

        case "auth/user-not-found":
          setError("No account found with this email.");
          break;

        case "auth/wrong-password":
          setError("Incorrect password.");
          break;

        default:
          setError("Login failed. Please try again.");
      }
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12">

        <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10">

          <h1 className="text-4xl font-bold text-green-700 text-center">
            Welcome Back
          </h1>

          <p className="text-center text-gray-500 mt-2">
            Login to your ODIANOSE account
          </p>

          <form
            onSubmit={handleLogin}
            className="space-y-5 mt-8"
          >

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-xl p-4 focus:ring-2 focus:ring-green-600 outline-none"
              required
            />

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-xl p-4 pr-12 focus:ring-2 focus:ring-green-600 outline-none"
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

            </div>

            {error && (
              <div className="bg-red-100 text-red-700 p-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-700 text-white py-4 rounded-xl hover:bg-green-800 transition"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

          </form>

          <p className="text-center mt-6 text-gray-600">

            Don't have an account?

            <Link
              to="/register"
              className="text-green-700 font-semibold ml-2"
            >
              Register
            </Link>

          </p>

        </div>

      </main>
    </>
  );
}

export default Login;