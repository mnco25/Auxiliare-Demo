import React, { useState, useEffect } from "react";

interface Step5ConfirmationProps {
  registrationData: any;
  onLoginClick: () => void;
}

const Step5Confirmation: React.FC<Step5ConfirmationProps> = ({
  registrationData,
  onLoginClick,
}) => {
  const [verificationStatus, setVerificationStatus] = useState<
    "processing" | "success" | "failure"
  >("processing");
  const [progressPercent, setProgressPercent] = useState(0);

  // Simulate automated ID verification process
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setVerificationStatus("success");
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center space-y-4">
      {verificationStatus === "processing" ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="h-12 w-12 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
          </div>
          <h3 className="text-lg text-gray-700">
            Processing Your Registration
          </h3>
          <p className="text-gray-600">
            We're verifying your information and setting up your account.
          </p>
          <div className="w-full bg-gray-200 h-2">
            <div
              className="bg-gray-500 h-2"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500">
            This usually takes less than a minute. Please don't close this
            window.
          </p>
        </div>
      ) : verificationStatus === "success" ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="border-2 border-gray-300 rounded-full p-3">✓</div>
          </div>
          <h3 className="text-lg text-gray-700">Registration Complete!</h3>
          <p className="text-gray-600">
            Your account has been successfully created and verified.
          </p>

          <div className="bg-gray-100 p-3 border border-gray-300 text-left">
            <h4 className="text-gray-700 mb-2">Account Details</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Name:</div>
              <div className="text-gray-700">{registrationData.fullName}</div>

              <div className="text-gray-500">Email:</div>
              <div className="text-gray-700">{registrationData.email}</div>

              <div className="text-gray-500">Role:</div>
              <div className="text-gray-700">{registrationData.role}</div>

              <div className="text-gray-500">Status:</div>
              <div className="text-gray-700">Verified ✓</div>
            </div>
          </div>

          <p className="text-gray-600">
            {registrationData.role === "Founder"
              ? "You're now ready to showcase your startup and connect with potential investors."
              : "You're now ready to discover promising startups and connect with founders."}
          </p>

          <div>
            <button
              onClick={onLoginClick}
              className="w-full bg-gray-400 text-white p-2 border border-gray-500"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="border-2 border-gray-300 rounded-full p-3">✗</div>
          </div>
          <h3 className="text-lg text-gray-700">Verification Failed</h3>
          <p className="text-gray-600">
            We encountered an issue verifying your information. Please contact
            support for assistance.
          </p>
          <div>
            <button
              onClick={onLoginClick}
              className="w-full bg-gray-300 text-gray-700 p-2 border border-gray-400"
            >
              Return to Login
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step5Confirmation;
