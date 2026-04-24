export function vigenereEncrypt(text, key) {
  if (!text || !key) return text || '';
  
  text = text.toUpperCase();
  key = key.toUpperCase();
  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {      const p = charCode - 65;
      const k = key.charCodeAt(keyIndex % key.length) - 65;
      
      const c = (p + k) % 26;
      result += String.fromCharCode(c + 65);
      keyIndex++;
    } else {
      result += text[i];
    }
  }

  return result;
}

export function vigenereDecrypt(ciphertext, key) {
  if (!ciphertext || !key) return ciphertext || '';
  
  ciphertext = ciphertext.toUpperCase();
  key = key.toUpperCase();
  let result = '';
  let keyIndex = 0;

  for (let i = 0; i < ciphertext.length; i++) {
    const charCode = ciphertext.charCodeAt(i);

    if (charCode >= 65 && charCode <= 90) {
      const c = charCode - 65;
      const k = key.charCodeAt(keyIndex % key.length) - 65;
      
      
      const p = (c - k + 26) % 26;
      result += String.fromCharCode(p + 65);
      keyIndex++;
    } else {
      result += ciphertext[i];
    }
  }

  return result;
}
