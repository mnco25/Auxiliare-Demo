import React, { useState, useEffect } from "react";

interface Step2VerificationProps {
  registrationData: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const Step2Verification: React.FC<Step2VerificationProps> = ({
  registrationData,
  onDataChange,
  onNext,
  onPrevious,
}) => {
  const [otpMethod, setOtpMethod] = useState<"email" | "sms">("email");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  const maskedEmail = registrationData.email.replace(
    /(.{2})(.*)(@.*)/,
    "$1*****$3"
  );
  const maskedPhone = registrationData.mobileNumber.replace(
    /(\d{3})(\d{4})(\d{4})/,
    "$1****$3"
  );

  useEffect(() => {
    startResendTimer();
    simulateSendOTP();
  }, [otpMethod]);

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const simulateSendOTP = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      console.log(
        `OTP sent to ${otpMethod === "email" ? maskedEmail : maskedPhone}`
      );
    }, 1500);
  };

  const handleResendOTP = () => {
    if (resendTimer === 0) {
      startResendTimer();
      simulateSendOTP();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    const newOtp = [...otp];
    if (value.length > 1) {
      value = value.slice(-1);
    }
    if (value && !/^\d+$/.test(value)) {
      return;
    }
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handleVerifyOTP = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length !== 6) {
      setError("Please enter the complete 6-digit OTP");
      return;
    }
    setIsVerifying(true);
    setError("");
    setTimeout(() => {
      setIsVerifying(false);
      if (fullOtp === "123456") {
        onNext();
      } else {
        setError("Invalid OTP. Please try again.");
      }
    }, 1500);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <div className="mb-2 text-gray-700">Verify Your Contact</div>
        <p className="text-gray-600">
          We've sent a verification code to your {otpMethod}
        </p>
        <p className="text-gray-600">
          {otpMethod === "email" ? maskedEmail : maskedPhone}
        </p>
      </div>

      <div className="space-y-3">
        <div className="flex justify-center space-x-2">
          <button
            type="button"
            onClick={() => setOtpMethod("email")}
            className={`px-3 py-1 border ${
              otpMethod === "email"
                ? "bg-gray-300 border-gray-400"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setOtpMethod("sms")}
            className={`px-3 py-1 border ${
              otpMethod === "sms"
                ? "bg-gray-300 border-gray-400"
                : "bg-gray-100 border-gray-300"
            }`}
          >
            SMS
          </button>
        </div>

        <div className="mt-3">
          <label className="block text-gray-600 mb-2 text-center">
            Enter 6-digit code
          </label>
          <div className="flex justify-center space-x-1">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-8 h-8 text-center border border-gray-300"
              />
            ))}
          </div>
          {error && <p className="mt-2 text-gray-600 text-center">{error}</p>}
        </div>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendOTP}
            disabled={resendTimer > 0 || isSending}
            className={`text-sm ${
              resendTimer > 0 || isSending
                ? "text-gray-400"
                : "text-gray-600 underline"
            }`}
          >
            {isSending
              ? "Sending..."
              : resendTimer > 0
              ? `Resend code in ${resendTimer}s`
              : "Resend code"}
          </button>
        </div>
      </div>

      <div className="flex space-x-3">
        <button
          type="button"
          onClick={onPrevious}
          disabled={isVerifying}
          className="flex-1 p-2 border border-gray-300 text-gray-600"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleVerifyOTP}
          disabled={isVerifying}
          className="flex-1 bg-gray-400 text-white p-2 border border-gray-500"
        >
          {isVerifying ? "Verifying..." : "Verify & Continue"}
        </button>
      </div>

      <div className="mt-3 text-center text-sm text-gray-600">
        <p>Test Code: 123456</p>
        <p className="mt-1">Please use this code for demonstration purposes.</p>
      </div>
    </div>
  );
};

export default Step2Verification;
