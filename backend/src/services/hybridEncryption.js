import { polybiusEncrypt, polybiusDecrypt } from '../ciphers/polybius.js';
import { vigenereEncrypt, vigenereDecrypt } from '../ciphers/vigenere.js';
import { checkAccess } from '../abe/accessControl.js';

export function hybridEncrypt(plaintext, vigenereKey, policy) {
  
  const polybiusOutput = polybiusEncrypt(plaintext);

  
  const cipherOutput = vigenereEncrypt(polybiusOutput, vigenereKey);

  
  return {
    ciphertext: cipherOutput,
    policy: policy,
    polybiusOutput: polybiusOutput
  };
}

export function hybridDecrypt(ciphertext, vigenereKey, userAttributes, policy) {
  
  const isAuthorized = checkAccess(policy, userAttributes);
  
  if (!isAuthorized) {
    throw new Error('Access Denied: Attributes do not satisfy policy');
  }

  
  const vigenereOutput = vigenereDecrypt(ciphertext, vigenereKey);

  
  const plaintext = polybiusDecrypt(vigenereOutput);

  return plaintext;
}
