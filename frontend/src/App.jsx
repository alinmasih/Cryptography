import { useEffect, useState } from 'react';
import Header from './components/Header';
import Stepper from './components/Stepper';
import EncryptionPage from './components/EncryptionPage';
import DecryptionPage from './components/DecryptionPage';
import { APP_TITLE } from './config';
import './index.css';

function App() {
  const [step, setStep] = useState(1);
  const [encryptedData, setEncryptedData] = useState(null);

  useEffect(() => {
    document.title = APP_TITLE;
  }, []);

  const handleEncrypt = (data) => {
    setEncryptedData(data);
    setStep(2); 
  };

  const handleStepChange = (nextStep) => {
    if (nextStep === 2 && !encryptedData) {
      return;
    }

    setStep(nextStep);
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Stepper
          currentStep={step}
          onChangeStep={handleStepChange}
          canAccessStep2={Boolean(encryptedData)}
        />

        {step === 1 && (
          <EncryptionPage onEncrypt={handleEncrypt} />
        )}

        {step === 2 && (
          <DecryptionPage originalData={encryptedData} />
        )}
      </main>
    </div>
  );
}

export default App;
