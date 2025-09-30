import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgAuth from "../../assets/auth-bg.png";
import ExamLogo from "../../assets/ExamLogo.svg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard");
  };

  const handleSignUpClick = () => {
    navigate("/register");
  };

  return (
    <div
      className="min-w-screen w-full min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${bgAuth})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Optional overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Login container */}
      <div className="relative z-10 w-full max-w-sm sm:max-w-md h-auto bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-5 sm:p-6 ">
        {/* Logo */}
        <div className="flex justify-center mb-4">
          <img src={ExamLogo} alt="Exam Logo" className="h-10 w-auto" />
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="text-xl sm:text-xl font-semibold text-gray-900 mb-1">
            Welcome to Exam Portal
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your credentials to access your dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-3">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID / Email
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder="Enter your Student ID or Email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-10 text-sm"
                placeholder="Enter Password"
              />
              <div
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 bg-transparent border-0 p-0 flex items-center justify-center cursor-pointer"
                >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>


            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <div
              type="button"
              className="text-orange-500 hover:text-orange-600 hover:underline"
            >
              Forgot Password?
            </div>
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-orange-200 text-sm"
          >
            Sign In
          </button>
        </form>

        {/* Link to Register */}
        {/* <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={handleSignUpClick}
            className="text-orange-500 hover:underline cursor-pointer font-medium"
          >
            Sign Up
          </span>
        </p> */}
      </div>
    </div>
  );
}
