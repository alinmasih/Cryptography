import React, { useState } from 'react';
import { ShieldCheck, XCircle, Unlock, Key, Tag, FileText } from 'lucide-react';

export default function DecryptionPage({ originalData }) {
  const [ciphertext, setCiphertext] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [attribute, setAttribute] = useState('');
  const [result, setResult] = useState(null);

  const handleDecrypt = async (e) => {
    e.preventDefault();
    if (!ciphertext || !secretKey || !attribute) return;

    try {
      const response = await fetch('http://localhost:5001/decrypt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ciphertext,
          key: secretKey,
          userAttributes: { role: attribute.toLowerCase() },
          policy: { role: originalData?.attribute?.toLowerCase() || attribute.toLowerCase() } 
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
            onChange={(e) => setCiphertext(e.target.value)}
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
            onChange={(e) => setSecretKey(e.target.value)}
            required
          />
        </div>

        <hr className="card-divider" />

        <h2><Tag size={24} /> User Attribute for Access Verification</h2>

        <div className="form-group">
          <label className="form-label"><ShieldCheck size={16} /> Verification Attribute</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your attribute"
            value={attribute}
            onChange={(e) => setAttribute(e.target.value)}
            required
          />
        </div>

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
