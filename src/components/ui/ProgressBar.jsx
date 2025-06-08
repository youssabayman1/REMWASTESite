import React from 'react';

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="w-full mb-8">
      {/* Desktop Progress Bar (Horizontal) */}
      <div className="hidden md:flex items-start justify-between">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            {/* Connecting Line */}
            {index < steps.length - 1 && (
              <div
                className={`absolute left-[32px] w-[calc(100vw/6-2rem)] h-0.5 top-4 ${
                  index + 1 < currentStep ? 'bg-[#254d70]' : 'bg-[#f7f7f7]'
                }`}
              />
            )}
            {/* Circle and Text Container */}
            <div className="flex flex-col items-center relative bg-white">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  index + 1 <= currentStep
                    ? 'bg-[#254d70] text-white'
                    : 'bg-[#f7f7f7] text-[#8c8d8b]'
                }`}
              >
                {index + 1}
              </div>
              <div
                className={`text-sm font-medium text-center max-w-[120px] ${
                  index + 1 <= currentStep ? 'text-[#242524]' : 'text-[#8c8d8b]'
                }`}
              >
                {step.label}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Progress Bar (Vertical) */}
      <div className="md:hidden">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-[#f7f7f7]" />
          
          {/* Steps */}
          {steps.map((step, index) => {
            // Only show current and remaining steps
            if (index + 1 < currentStep) return null;
            
            return (
              <div
                key={index}
                className={`relative flex mb-8 ${
                  index + 1 === currentStep ? 'opacity-100' : 'opacity-70'
                }`}
              >
                <div className="flex flex-col items-center bg-white relative">
                  {/* Circle */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                      index + 1 === currentStep
                        ? 'bg-[#254d70] text-white'
                        : 'bg-[#f7f7f7] text-[#8c8d8b]'
                    }`}
                  >
                    {index + 1}
                  </div>
                  
                  {/* Label */}
                  <div
                    className={`text-sm font-medium text-center ${
                      index + 1 === currentStep ? 'text-[#242524]' : 'text-[#8c8d8b]'
                    }`}
                  >
                    {step.label}
                  </div>

                  {/* Active Step Indicator */}
                  {index + 1 === currentStep && (
                    <div className="mt-2 text-xs text-[#254d70] font-medium">
                      Current Step
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;