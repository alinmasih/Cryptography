import { useState } from 'react';
import { ShieldCheck, XCircle, Unlock, Key, Tag, FileText, RefreshCw } from 'lucide-react';
import { API_BASE_URL } from '../config';

const keyPattern = /^[A-Za-z]+$/;

export default function DecryptionPage({ originalData }) {
  const [ciphertext, setCiphertext] = useState(() => originalData?.ciphertext || '');
  const [secretKey, setSecretKey] = useState(() => originalData?.secretKey || '');
  const [attribute, setAttribute] = useState('');
  const [requiredAttribute, setRequiredAttribute] = useState(() => originalData?.attribute || '');
  const [result, setResult] = useState(null);

  const handleUsePrevious = () => {
    if (!originalData) {
      return;
    }

    setCiphertext(originalData.ciphertext || '');
    setSecretKey(originalData.secretKey || '');
    setRequiredAttribute(originalData.attribute || '');
    setResult(null);
  };

  const handleDecrypt = async (e) => {
    e.preventDefault();

    const normalizedKey = secretKey.trim();
    const normalizedAttribute = attribute.trim().toLowerCase();
    const normalizedRequiredAttribute = requiredAttribute.trim().toLowerCase();

    if (!ciphertext || !normalizedKey || !normalizedAttribute || !normalizedRequiredAttribute) {
      setResult({
        status: 'error',
        message: 'Missing Input',
        desc: 'Ciphertext, key, user attribute, and required policy attribute are all mandatory.'
      });
      return;
    }

    if (!keyPattern.test(normalizedKey)) {
      setResult({
        status: 'error',
        message: 'Invalid Key',
        desc: 'Vigenere key must use alphabetic characters only (A-Z).'
      });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/decrypt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ciphertext,
          key: normalizedKey,
          userAttributes: { role: normalizedAttribute },
          policy: { role: normalizedRequiredAttribute }
        })
      });
      const data = await response.json();
      
      if (response.ok) {
        setResult({
          status: 'success',
          message: 'Access Granted: Decryption Successful',
          decryptedMessage: data.plaintext
        });
      } else {
        setResult({
          status: 'error',
          message: 'Access Denied',
          desc: data.error || 'Provided attribute or key does not satisfy the access policy. Decryption failed.'
        });
      }
    } catch (error) {
      setResult({
        status: 'error',
        message: 'Connection Error',
        desc: 'Failed to connect to backend: ' + error.message
      });
    }
  };

  return (
    <div className="card">
      <h2><Unlock size={24} /> Decryption and Access Verification</h2>
      
      <form onSubmit={handleDecrypt}>
        <div className="form-group">
          <label className="form-label"><FileText size={16} /> Ciphertext</label>
          <textarea
            className="form-control"
            placeholder="Paste the encrypted message here"
            value={ciphertext}
            onChange={(e) => {
              setCiphertext(e.target.value);
              setResult(null);
            }}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label"><Key size={16} /> Vigenère Secret Key</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter decryption key"
            value={secretKey}
            onChange={(e) => {
              setSecretKey(e.target.value);
              setResult(null);
            }}
            pattern="[A-Za-z]+"
            title="Use alphabetic characters only"
            required
          />
        </div>

        <hr className="card-divider" />

        <h2><Tag size={24} /> Policy and User Attribute Verification</h2>

        <div className="form-group">
          <label className="form-label"><Tag size={16} /> Required Policy Attribute</label>
          <input
            type="text"
            className="form-control"
            placeholder="Required role from encryption policy"
            value={requiredAttribute}
            onChange={(e) => {
              setRequiredAttribute(e.target.value);
              setResult(null);
            }}
            readOnly={Boolean(originalData?.attribute)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label"><ShieldCheck size={16} /> Verification Attribute</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your attribute"
            value={attribute}
            onChange={(e) => {
              setAttribute(e.target.value);
              setResult(null);
            }}
            required
          />
        </div>

        {originalData && (
          <div className="action-buttons" style={{ marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={handleUsePrevious}>
              <RefreshCw size={16} style={{ marginRight: '8px' }} />
              Use Previous Encryption Output
            </button>
          </div>
        )}

        <div style={{ marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary">
            <ShieldCheck size={18} style={{ marginRight: '8px' }} />
            Verify Access and Decrypt
          </button>
        </div>
      </form>

      {result && (
        <div className={`alert ${result.status === 'success' ? 'alert-success' : 'alert-error'}`}>
          <div className="alert-title">
            {result.status === 'success' ? <ShieldCheck size={24} /> : <XCircle size={24} />}
            {result.message}
          </div>
          <div>
            {result.status === 'success' ? (
              <div className="info-box mono" style={{ 
                marginTop: '1rem', 
                backgroundColor: 'rgba(16, 185, 129, 0.1)', 
                borderColor: 'rgba(16, 185, 129, 0.3)', 
                borderLeftColor: '#10b981', 
                color: '#d1fae5' 
              }}>
                <Unlock size={20} style={{ color: '#10b981', flexShrink: 0 }} />
                <span style={{ fontSize: '1.05rem', wordBreak: 'break-all' }}>{result.decryptedMessage}</span>
              </div>
            ) : (
              <div style={{ marginTop: '0.5rem', opacity: 0.9 }}>{result.desc}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
