import { useState } from 'react';
import { Copy, ArrowRight, CheckCircle } from 'lucide-react';

export default function OutputPage({ data, onProceed }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.ciphertext);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="card">
      <h2>Encrypted Data Output</h2>
      
      <div className="form-group">
        <label className="form-label">Generated Ciphertext</label>
        <div className="readonly-display">
          {data.ciphertext || "No ciphertext available."}
        </div>
      </div>

      <h2>Applied Access Policy (ABE)</h2>
      <ul className="policy-list">
        <li className="policy-item">
          <span className="policy-label">Role Attribute:</span>
          <span>{data.role || "N/A"}</span>
        </li>
        <li className="policy-item">
          <span className="policy-label">Department Attribute:</span>
          <span>{data.department || "N/A"}</span>
        </li>
      </ul>

      <div className="action-buttons">
        <button className="btn btn-secondary" onClick={handleCopy}>
          {copied ? (
            <><CheckCircle size={18} style={{ marginRight: '8px' }} /> Copied!</>
          ) : (
            <><Copy size={18} style={{ marginRight: '8px' }} /> Copy Ciphertext</>
          )}
        </button>
        <button className="btn btn-primary" onClick={onProceed}>
          Proceed to Decryption Module <ArrowRight size={18} style={{ marginLeft: '8px' }} />
        </button>
      </div>

      <div className="info-box">
        This ciphertext follows the Ciphertext-Policy Attribute-Based Encryption (CP-ABE) access model.
      </div>
    </div>
  );
}
