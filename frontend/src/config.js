export const APP_TITLE = 'ABE: Public-Key Cryptography - A Hybrid Approach Using Polybius and Vigenere Cipher';

const fallbackApiUrl = 'http://localhost:5001';

export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || fallbackApiUrl).replace(/\/$/, '');
