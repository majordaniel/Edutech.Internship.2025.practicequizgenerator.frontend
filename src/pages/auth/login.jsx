import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bgAuth from "../../assets/auth-bg.png";
import ExamLogo from "../../assets/ExamLogo.svg";
import { users } from "@/Data/mockDB";

export default function Login() {
  const navigate = useNavigate();
  useEffect(() => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  if (isLoggedIn) {
    navigate("/dashboard");
  }
}, [navigate]);

  const [formData, setFormData] = useState({
    identifier: "", // Can be email or ID
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fallback to mock database
  const loginWithMockDB = () => {
    console.log("Checking mock DB with:", formData.identifier);
    console.log("Available users:", users.map(u => u.email));
    
    const foundUser = users.find(
      (u) => (u.email === formData.identifier || String(u.id) === formData.identifier) && 
             u.password === formData.password
    );

    console.log("Found user:", foundUser);

    if (foundUser) {
      // Store individual user properties
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedInUserEmail", foundUser.email);
      localStorage.setItem("loggedInUserId", String(foundUser.id));
      localStorage.setItem("loggedInUserName", foundUser.name || "Student");
      localStorage.setItem("loggedInUserStudentId", foundUser.studentId || "");
      
      // Store complete user object as JSON
      localStorage.setItem("userData", JSON.stringify(foundUser));
      
      navigate("/dashboard", { state: { userId: foundUser.id } });
      return true;
    }
    return false;
  };

  // Fetch user profile by email
  const fetchUserProfileByEmail = async (email, token) => {
    try {
      const encodedEmail = encodeURIComponent(email);
      const fullUrl = `http://apppracticequiz.runasp.net/api/User/email?email=${encodedEmail}`;

      console.log("Fetching profile by email:", email);

      const profileResponse = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });

      console.log("Email Profile Response:", profileResponse.data);

      if (profileResponse.data?.succeeded && profileResponse.data?.data) {
        return profileResponse.data.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch user profile by email:", error);
      return null;
    }
  };

  // Fetch user profile by ID
  const fetchUserProfileById = async (userId, token) => {
    try {
      const fullUrl = `http://apppracticequiz.runasp.net/api/User/id?id=${userId}`;

      console.log("Fetching profile by ID:", userId);

      const profileResponse = await axios.get(fullUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 5000,
      });

      console.log("ID Profile Response:", profileResponse.data);

      if (profileResponse.data?.succeeded && profileResponse.data?.data) {
        return profileResponse.data.data;
      }
      return null;
    } catch (error) {
      console.error("Failed to fetch user profile by ID:", error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Determine if identifier is email or ID
    const isEmail = formData.identifier.includes('@');
    const loginPayload = isEmail 
      ? { email: formData.identifier, password: formData.password }
      : { userId: formData.identifier, password: formData.password };

    try {
      // Try API authentication first
      const response = await axios.post(
        "http://apppracticequiz.runasp.net/api/Auth/login",
        loginPayload,
        { timeout: 5000 }
      );

      console.log("API Response:", response.data);

      const apiData = response.data;

      // Check if API login succeeded and has token/data
      if (apiData?.succeeded && apiData?.data) {
        const loginData = apiData.data;
        const token = loginData.token || "api-token";
        const userEmail = loginData.email || (isEmail ? formData.identifier : null);
        const userId = loginData.userId || loginData.id || (!isEmail ? formData.identifier : null);
        
        let userProfile = null;

        // Try to fetch profile by ID first (if userId exists)
        if (userId) {
          console.log("Attempting to fetch by user ID:", userId);
          userProfile = await fetchUserProfileById(userId, token);
        }

        // If ID fetch failed or no userId, fall back to email
        if (!userProfile && userEmail) {
          console.log("Falling back to fetch by email");
          userProfile = await fetchUserProfileByEmail(userEmail, token);
        }
        
        // Combine login data with profile data
        const completeUserData = userProfile 
          ? { 
              ...loginData, 
              ...userProfile,
              name: `${userProfile.firstName || ''} ${userProfile.lastName || ''}`.trim() || loginData.name || "Student",
              studentId: userProfile.registrationNumber || userProfile.studentId || "",
              userId: userProfile.id || userId || loginData.userId,
            }
          : {
              ...loginData,
              name: loginData.name || loginData.firstName || "Student",
              studentId: loginData.studentId || "",
              userId: userId || loginData.userId || "api-user-id",
            };
        
        // Save user data to localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", token);
        localStorage.setItem("loggedInUserEmail", userEmail || "");
        localStorage.setItem("loggedInUserId", completeUserData.userId);
        localStorage.setItem("loggedInUserName", completeUserData.name);
        localStorage.setItem("loggedInUserStudentId", completeUserData.studentId);
        
        // Store complete user object as JSON
        localStorage.setItem("userData", JSON.stringify(completeUserData));
        
        console.log("Complete user data saved:", completeUserData);
        
        // Navigate and pass userId in state for Dashboard
        navigate("/dashboard", { state: { userId: completeUserData.userId } });
        return;
      }
      
      // If API says credentials are invalid, fall back to mock DB
      console.warn("API authentication failed, trying mock database");
      const mockLoginSuccess = loginWithMockDB();
      
      if (!mockLoginSuccess) {
        setError(apiData?.message || "Invalid credentials.");
      }
      
    } catch (err) {
      console.warn("API error occurred:", err.message);
      console.log("Full error:", err);
      
      // Fallback to mock database if API has network/server error
      const mockLoginSuccess = loginWithMockDB();
      
      if (!mockLoginSuccess) {
        setError("Invalid credentials.");
      }
    } finally {
      setLoading(false);
    }
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
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative z-10 w-full max-w-sm sm:max-w-md h-auto bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-5 sm:p-6">
        <div className="flex justify-center mb-4">
          <img src={ExamLogo} alt="Exam Logo" className="h-20 w-auto" />
        </div>

        <div className="text-center mb-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">
            Welcome to Exam Portal
          </h2>
          <p className="text-gray-500 text-sm">
            Enter your credentials to access your dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          {error && (
            <p className="text-sm text-red-500 bg-red-50 p-2 rounded">{error}</p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or User ID
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
              placeholder="Enter your email or user ID"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all pr-10 text-sm"
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

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
            <div className="text-orange-500 hover:text-orange-600 hover:underline cursor-pointer">
              Forgot Password?
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-orange-200 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}