import React, { useState } from "react";

interface Step1BasicInfoProps {
  registrationData: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onSwitchToLogin: () => void;
}

const Step1BasicInfo: React.FC<Step1BasicInfoProps> = ({
  registrationData,
  onDataChange,
  onNext,
  onSwitchToLogin,
}) => {
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [formData, setFormData] = useState({
    fullName: registrationData.fullName || "",
    email: registrationData.email || "",
    mobileNumber: registrationData.mobileNumber || "",
    password: registrationData.password || "",
    confirmPassword: registrationData.password || "",
    role: registrationData.role || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      role: "",
    };

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
      isValid = false;
    } else if (
      !/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(
        formData.mobileNumber
      )
    ) {
      newErrors.mobileNumber = "Mobile number is invalid";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Password must include lowercase, uppercase, numbers and special characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Please select a role";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      const { confirmPassword, ...dataToSubmit } = formData;
      onDataChange(dataToSubmit);
      onNext();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="fullName" className="block text-gray-600 mb-1">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-gray-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-600 mb-1">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            placeholder="your.email@example.com"
          />
          {errors.email && <p className="text-gray-600">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="mobileNumber" className="block text-gray-600 mb-1">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            placeholder="+1 (555) 123-4567"
          />
          {errors.mobileNumber && (
            <p className="text-gray-600">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-600 mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            placeholder="••••••••"
          />
          {errors.password && (
            <p className="text-gray-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-gray-600 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300"
            placeholder="••••••••"
          />
          {errors.confirmPassword && (
            <p className="text-gray-600">{errors.confirmPassword}</p>
          )}
        </div>

        <div>
          <label htmlFor="role" className="block text-gray-600 mb-1">
            I am a:
          </label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <div
              className={`cursor-pointer p-2 border ${
                formData.role === "Founder"
                  ? "border-gray-500 bg-gray-200"
                  : "border-gray-300"
              }`}
              onClick={() => setFormData({ ...formData, role: "Founder" })}
            >
              <div className="text-xl mb-1">👨‍💼</div>
              <div>Founder</div>
              <div className="text-xs text-gray-500">
                I have a startup or business idea
              </div>
            </div>
            <div
              className={`cursor-pointer p-2 border ${
                formData.role === "Investor"
                  ? "border-gray-500 bg-gray-200"
                  : "border-gray-300"
              }`}
              onClick={() => setFormData({ ...formData, role: "Investor" })}
            >
              <div className="text-xl mb-1">💰</div>
              <div>Investor</div>
              <div className="text-xs text-gray-500">
                I want to invest in startups
              </div>
            </div>
            <input
              type="radio"
              id="founder"
              name="role"
              value="Founder"
              checked={formData.role === "Founder"}
              onChange={handleChange}
              className="hidden"
            />
            <input
              type="radio"
              id="investor"
              name="role"
              value="Investor"
              checked={formData.role === "Investor"}
              onChange={handleChange}
              className="hidden"
            />
          </div>
          {errors.role && <p className="text-gray-600">{errors.role}</p>}
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-gray-400 text-white p-2 border border-gray-500"
          >
            Next
          </button>
        </div>
      </form>

      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account?{" "}
          <button onClick={onSwitchToLogin} className="text-gray-600 underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Step1BasicInfo;
