function normalizeAndValidateKey(key) {
  const normalizedKey = String(key).trim().toUpperCase();

  if (!/^[A-Z]+$/.test(normalizedKey)) {
    throw new Error('Invalid key: Vigenere key must contain alphabetic characters only');
  }

  return normalizedKey;
}

const PRINTABLE_ASCII_START = 32;
const PRINTABLE_ASCII_END = 126;
const PRINTABLE_ASCII_RANGE = PRINTABLE_ASCII_END - PRINTABLE_ASCII_START + 1;

function shiftPrintableChar(charCode, shift) {
  const normalized = charCode - PRINTABLE_ASCII_START;
  const shifted = (normalized + shift + PRINTABLE_ASCII_RANGE) % PRINTABLE_ASCII_RANGE;

  return String.fromCharCode(shifted + PRINTABLE_ASCII_START);
}

export function vigenereEncrypt(text, key) {
  if (!text || !key) return text || '';
  
  key = normalizeAndValidateKey(key);
  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    const keyShift = key.charCodeAt(keyIndex % key.length) - 65;

    if (charCode >= PRINTABLE_ASCII_START && charCode <= PRINTABLE_ASCII_END) {
      result += shiftPrintableChar(charCode, keyShift);
      keyIndex++;
    } else {
      result += text[i];
    }
  }

  return result;
}

export function vigenereDecrypt(ciphertext, key) {
  if (!ciphertext || !key) return ciphertext || '';
  
  key = normalizeAndValidateKey(key);
  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < ciphertext.length; i++) {
    const charCode = ciphertext.charCodeAt(i);
    const keyShift = key.charCodeAt(keyIndex % key.length) - 65;

    if (charCode >= PRINTABLE_ASCII_START && charCode <= PRINTABLE_ASCII_END) {
      result += shiftPrintableChar(charCode, -keyShift);
      keyIndex++;
    } else {
      result += ciphertext[i];
    }
  }

  return result;
}
