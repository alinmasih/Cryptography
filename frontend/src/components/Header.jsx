import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="govt-header">
      <div className="logo-placeholder">
        <Shield size={32} />
      </div>
      <div className="title-group">
        <h1>ABE: Public-Key Cryptography</h1>
        <p>A Hybrid Approach Using Polybius and Vigenere Cipher</p>
      </div>
    </header>
  );
}
