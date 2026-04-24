import React from 'react';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="govt-header">
      <div className="logo-placeholder">
        <Shield size={32} />
      </div>
      <div className="title-group">
        <h1>Secure Data Encryption Portal</h1>
        <p>Attribute-Based Hybrid Cryptography System</p>
      </div>
    </header>
  );
}
