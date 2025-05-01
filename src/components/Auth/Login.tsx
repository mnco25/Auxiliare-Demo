import React, { useState } from "react";

interface LoginProps {
  onRegisterClick: () => void;
}

const Login: React.FC<LoginProps> = ({ onRegisterClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      email: "",
      password: "",
      general: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // In a real app, this would call the API
      console.log("Login attempt with:", { email, password, rememberMe });

      // For demo purposes, simulate a successful login
      alert("Login successful! Redirecting to dashboard...");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        {errors.general && (
          <div className="p-2 bg-gray-200 text-gray-700 border border-gray-400">
            {errors.general}
          </div>
        )}

        <div>
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300"
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-gray-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-gray-600">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="border-gray-300"
            />
            <label htmlFor="remember-me" className="ml-2 text-gray-600">
              Remember me
            </label>
          </div>

          <div>
            <a href="#" className="text-gray-600">
              Forgot password?
            </a>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-gray-400 text-white p-2 border border-gray-500"
          >
            Sign In
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <button onClick={onRegisterClick} className="text-gray-600 underline">
            Register Now
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
