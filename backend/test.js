import { hybridEncrypt, hybridDecrypt } from './src/services/hybridEncryption.js';

const plaintext = "HELLO WORLD";
const key = "KEY";
const policy = { role: "student", department: "CSE" };

console.log("=== Encryption ===");
console.log("Plaintext:", plaintext);
const encrypted = hybridEncrypt(plaintext, key, policy);
console.log("Result:", encrypted);

console.log("\n=== Decryption ===");
const userAttributes = { role: "student", department: "CSE" };
console.log("User Attributes vs Policy:", userAttributes, policy);
const decrypted = hybridDecrypt(encrypted.ciphertext, key, userAttributes, policy);
console.log("Decrypted Plaintext:", decrypted);

console.log("\n=== Unauthorized Decryption ===");
try {
  const badAttrs = { role: "faculty", department: "CSE" };
  console.log("User Attributes:", badAttrs);
  hybridDecrypt(encrypted.ciphertext, key, badAttrs, policy);
} catch (e) {
  console.error("Successfully caught error:", e.message);
}
