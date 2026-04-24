import { useState } from 'react';
import { Lock, FileText, Key, Shield, Info, Tag, Cpu, ArrowDown, Network, ArrowRight } from 'lucide-react';
import { API_BASE_URL } from '../config';

const keyPattern = /^[A-Za-z]+$/;

export default function EncryptionPage({ onEncrypt }) {
  const [plaintext, setPlaintext] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [attribute, setAttribute] = useState('');

  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [encryptionData, setEncryptionData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (plaintext && secretKey && attribute) {
      const normalizedKey = secretKey.trim();
      const normalizedAttribute = attribute.trim().toLowerCase();

      if (!keyPattern.test(normalizedKey)) {
        alert('Invalid key: Vigenere key must use alphabetic characters only (A-Z).');
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/encrypt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plaintext,
            key: normalizedKey,
            policy: { role: normalizedAttribute }
          })
        });
        const data = await response.json();
        
        if (response.ok) {
          const resultData = {
            plaintext,
            polybiusOutput: data.polybiusOutput,
            ciphertext: data.ciphertext,
            attribute: normalizedAttribute,
            secretKey: normalizedKey,
            policy: data.policy
          };
          setEncryptionData(resultData);
          setIsProcessing(true);
          
          
          setProcessStep(1); 
          setTimeout(() => {
            setProcessStep(2); 
            setTimeout(() => {
              setProcessStep(3); 
            }, 1800);
          }, 1800);

        } else {
          alert('Encryption Error: ' + data.error);
        }
      } catch (error) {
         alert('Failed to connect to backend: ' + error.message);
      }
    }
  };

  const handleProceed = () => {
    if (encryptionData) {
      onEncrypt(encryptionData);
    }
  };

  if (isProcessing && encryptionData) {
    return (
      <div className="card">
        <h2><Network size={24} /> Initiating Hybrid Encryption Protocol...</h2>
        <p className="text-muted" style={{ marginBottom: '2rem' }}>
          Visualizing the state transformations of your data.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' }}>
          
          <div className="process-box fade-in" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: '#10b981' }}>
              <Cpu size={20} />
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Step 1: Polybius State Matrix</h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
              Mapping plaintext to matrix coordinates...
            </p>
            <div style={{ backgroundColor: 'rgba(0,0,0,0.2)', minHeight: '50px', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', wordBreak: 'break-all', color: '#10b981' }}>
              {encryptionData.polybiusOutput || "Loading matrix... (Please restart backend server)"}
            </div>
          </div>

          {processStep >= 2 && (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', width: '100%' }}>
              <ArrowDown size={32} color="var(--primary-color)" style={{ opacity: 0.7 }} />

              <div className="process-box" style={{ width: '100%', maxWidth: '500px', backgroundColor: 'var(--surface-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--primary-color)', position: 'relative', boxShadow: '0 0 15px rgba(59, 130, 246, 0.1)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', color: 'var(--primary-color)' }}>
                  <Lock size={20} />
                  <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Step 2: Vigenère Cipher & CP-ABE</h3>
                </div>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', gap: '15px' }}>
                  <span><Key size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Key: ***</span>
                  <span><Shield size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} /> Policy: {encryptionData.attribute}</span>
                </p>
                <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', padding: '1rem', borderRadius: '8px', fontFamily: 'monospace', wordBreak: 'break-all', color: 'var(--text-color)' }}>
                  {encryptionData.ciphertext}
                </div>
              </div>
            </div>
          )}

          {processStep >= 3 && (
            <div className="fade-in" style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button className="btn btn-primary" onClick={handleProceed}>
                Proceed to Decryption Phase <ArrowRight size={18} style={{ marginLeft: '8px' }} />
              </button>
            </div>
          )}
        </div>

        <style>{`
          .fade-in {
            animation: fadeIn 0.5s ease-in-out forwards;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="card">
      <h2><Lock size={24} /> Encryption – Sender Module</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label"><FileText size={16} /> Plaintext Message</label>
          <textarea
            className="form-control"
            placeholder="Enter the message to be securely encrypted"
            value={plaintext}
            onChange={(e) => setPlaintext(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label"><Key size={16} /> Vigenère Secret Key</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter encryption key (letters only)"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            pattern="[A-Za-z]+"
            title="Use alphabetic characters only"
            required
          />
        </div>

        <hr className="card-divider" />

        <h2><Shield size={24} /> Attribute-Based Access Policy (ABE)</h2>
        
        <div className="form-group">
          <label className="form-label"><Tag size={16} /> Required Attribute</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g., officer, admin, CSE"
            value={attribute}
            onChange={(e) => setAttribute(e.target.value)}
            required
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">
            <Lock size={18} style={{ marginRight: '8px' }} />
            Encrypt and Generate Ciphertext
          </button>
        </div>

        <div className="info-box">
          <Info size={24} style={{ flexShrink: 0 }} />
          <span>The message will be encrypted using a hybrid Polybius–Vigenère cipher and protected using attribute-based access control.</span>
        </div>
      </form>
    </div>
  );
}
