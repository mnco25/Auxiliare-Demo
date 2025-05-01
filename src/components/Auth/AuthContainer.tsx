import React, { useState } from "react";
import Login from "./Login";
import Step1BasicInfo from "./Registration/Step1BasicInfo";
import Step2Verification from "./Registration/Step2Verification";
import Step3RoleInfo from "./Registration/Step3RoleInfo";
import Step4Agreements from "./Registration/Step4Agreements";
import Step5Confirmation from "./Registration/Step5Confirmation";
import StepIndicator from "./Registration/StepIndicator";

const AuthContainer: React.FC = () => {
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [registrationStep, setRegistrationStep] = useState(1);
  const [registrationData, setRegistrationData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "",
    companyInfo: {
      companyName: "",
      industry: "",
      description: "",
      stage: "",
      teamInfo: "",
      website: "",
      linkedin: "",
    },
    investorInfo: {
      linkedinUrl: "",
      organizationalAffiliations: "",
      startupsFunded: "",
    },
    idDocument: null,
    agreements: {
      termsOfService: false,
      privacyPolicy: false,
      nda: false,
    },
  });

  // Step names for StepIndicator
  const stepNames = ["Info", "Verify", "Profile", "Terms", "Finish"];

  const handleAuthModeChange = (mode: "login" | "register") => {
    setAuthMode(mode);
    if (mode === "register") {
      setRegistrationStep(1);
    }
  };

  const handleRegistrationDataChange = (data: any) => {
    setRegistrationData({ ...registrationData, ...data });
  };

  const handleNextStep = () => {
    setRegistrationStep(registrationStep + 1);
  };

  const handlePreviousStep = () => {
    setRegistrationStep(registrationStep - 1);
  };

  const renderAuthComponent = () => {
    if (authMode === "login") {
      return <Login onRegisterClick={() => handleAuthModeChange("register")} />;
    } else {
      switch (registrationStep) {
        case 1:
          return (
            <Step1BasicInfo
              registrationData={registrationData}
              onDataChange={handleRegistrationDataChange}
              onNext={handleNextStep}
              onSwitchToLogin={() => handleAuthModeChange("login")}
            />
          );
        case 2:
          return (
            <Step2Verification
              registrationData={registrationData}
              onDataChange={handleRegistrationDataChange}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />
          );
        case 3:
          return (
            <Step3RoleInfo
              registrationData={registrationData}
              onDataChange={handleRegistrationDataChange}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />
          );
        case 4:
          return (
            <Step4Agreements
              registrationData={registrationData}
              onDataChange={handleRegistrationDataChange}
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
            />
          );
        case 5:
          return (
            <Step5Confirmation
              registrationData={registrationData}
              onLoginClick={() => handleAuthModeChange("login")}
            />
          );
        default:
          return (
            <Step1BasicInfo
              registrationData={registrationData}
              onDataChange={handleRegistrationDataChange}
              onNext={handleNextStep}
              onSwitchToLogin={() => handleAuthModeChange("login")}
            />
          );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="w-full max-w-md p-4 bg-white border border-gray-300">
        <div className="mb-4 text-center">
          <h1 className="text-xl font-medium text-gray-700">
            Auxiliare-Clover
          </h1>
          <p className="text-gray-500">
            {authMode === "login"
              ? "Sign in to your account"
              : `Registration - Step ${registrationStep} of 5`}
          </p>
        </div>

        {/* Add StepIndicator for registration flow */}
        {authMode === "register" && (
          <StepIndicator currentStep={registrationStep} steps={stepNames} />
        )}

        {renderAuthComponent()}
      </div>
    </div>
  );
};

export default AuthContainer;
