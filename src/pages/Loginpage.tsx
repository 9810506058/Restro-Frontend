// src/pages/Login.tsx
import { loginInWIthGoogle } from "../auth";
import { MdEmail } from "react-icons/md";

const Login = () => {
  const handleGoogleLogin = async () => {
    try {
      await loginInWIthGoogle();
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 font-sans">
      <div className="bg-white p-10 rounded-xl shadow-md w-80 text-center">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">Welcome Back!</h1>
        <p className="text-gray-600 mb-8">Sign in to continue to YourApp</p>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full gap-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
         <MdEmail />
          <span className="text-gray-700 font-medium">Sign in with Google</span>
        </button>
         
      </div>
    </div>
  );
};

export default Login;
