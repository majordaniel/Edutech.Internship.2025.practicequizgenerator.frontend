import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import bgAuth from "../../assets/auth-bg.png";
import ExamLogo from "../../assets/ExamLogo.svg";

export default function Register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Register attempted with:", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      rememberMe,
    });
    navigate("/dashboard");
  };

  const handleSignInClick = () => {
    navigate("/login");
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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Container */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-4 sm:p-5 mx-4">
        {/* Logo */}
        <div className="flex justify-center mb-3">
          <img src={ExamLogo} alt="Exam Logo" className="h-9 w-auto" />
        </div>

        {/* Title */}
        <div className="text-center mb-3">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
            Create an Account
          </h1>
          <p className="text-gray-500 text-xs sm:text-sm">
            Fill in your details to register
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-2.5">
          {/* First & Last Name side by side on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="First Name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Email / Student ID */}
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
              placeholder="Student ID or Email"
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
                placeholder="Password"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer flex items-center justify-center"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-10 text-sm"
                placeholder="Confirm Password"
              />
              <div
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer flex items-center justify-center"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </div>
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="ml-2 text-gray-600 text-xs sm:text-sm">Remember me</span>
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-orange-200 text-sm"
          >
            Register
          </button>
        </form>

        {/* Link to Login */}
        <p className="mt-3 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            onClick={handleSignInClick}
            className="text-orange-500 hover:underline cursor-pointer font-medium"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
}
