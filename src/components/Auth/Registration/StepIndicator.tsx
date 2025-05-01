import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  currentStep,
  steps,
}) => {
  return (
    <div className="mb-8 px-4">
      <div className="relative">
        {/* Base line */}
        <div className="absolute top-4 left-0 right-0 h-1 bg-gray-200"></div>

        {/* Progress line */}
        <div
          className="absolute top-4 left-0 h-1 bg-green-500 transition-all duration-300 ease-in-out"
          style={{
            width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
          }}
        ></div>

        {/* Steps */}
        <div className="flex justify-between relative">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full border-2 z-10 ${
                  index + 1 <= currentStep
                    ? "bg-green-500 border-green-600 text-white"
                    : "bg-white border-gray-300 text-gray-500"
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`text-xs mt-2 font-medium ${
                  index + 1 === currentStep ? "text-gray-800" : "text-gray-500"
                }`}
              >
                {step}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
