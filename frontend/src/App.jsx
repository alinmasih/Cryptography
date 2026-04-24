import React, { useState } from 'react';
import Header from './components/Header';
import Stepper from './components/Stepper';
import EncryptionPage from './components/EncryptionPage';
import DecryptionPage from './components/DecryptionPage';
import './index.css';

function App() {
  const [step, setStep] = useState(1);
  const [encryptedData, setEncryptedData] = useState(null);

  const handleEncrypt = (data) => {
    setEncryptedData(data);
    setStep(2); 
  };

  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <Stepper currentStep={step} onChangeStep={setStep} />

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
