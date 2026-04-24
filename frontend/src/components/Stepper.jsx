import { Fragment } from 'react';

export default function Stepper({ currentStep, onChangeStep, canAccessStep2 = false }) {
  const steps = [
    { id: 1, label: 'Encryption & Policy Setup' },
    { id: 2, label: 'Decryption & Access' }
  ];

  return (
    <div className="stepper">
      {steps.map((step, index) => {
        const isDisabled = step.id === 2 && !canAccessStep2;

        return (
          <Fragment key={step.id}>
            <div
              className={`step ${currentStep === step.id ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`}
              onClick={() => {
                if (isDisabled) {
                  return;
                }

                if (onChangeStep) {
                  onChangeStep(step.id);
                }
              }}
              style={{ cursor: isDisabled ? 'not-allowed' : 'pointer' }}
            >
              <div className="step-number">{step.id}</div>
              <div className="step-label">{step.label}</div>
            </div>
            {index < steps.length - 1 && <div className="step-divider"></div>}
          </Fragment>
        );
      })}
    </div>
  );
}
