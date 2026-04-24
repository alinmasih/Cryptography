import React from 'react';

export default function Stepper({ currentStep, onChangeStep }) {
  const steps = [
    { id: 1, label: 'Encryption & Policy Setup' },
    { id: 2, label: 'Decryption & Access' }
  ];

  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div 
            className={`step ${currentStep === step.id ? 'active' : ''}`}
            onClick={() => onChangeStep && onChangeStep(step.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className="step-number">{step.id}</div>
            <div className="step-label">{step.label}</div>
          </div>
          {index < steps.length - 1 && <div className="step-divider"></div>}
        </React.Fragment>
      ))}
    </div>
  );
}
