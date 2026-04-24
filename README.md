# Attribute-Based Hybrid Encryption System (ABE-HES)

A secure cryptographic system that combines classical ciphers (Polybius and Vigenère) with Ciphertext-Policy Attribute-Based Access Control (CP-ABAC). This system ensures that data is encrypted using a hybrid approach and can only be decrypted by users whose attributes satisfy a specific access policy.

## 🚀 Project Overview

This project is a full-stack application designed to demonstrate a multi-layered encryption process:
1.  **Polybius Square Cipher**: Initial transformation of the plaintext.
2.  **Vigenère Cipher**: Secondary encryption using a secret key.
3.  **Attribute-Based Access Control**: Implementation of access policies that govern who can decrypt the final ciphertext.

## 📁 Project Structure

```text
.
├── backend/            # Node.js + Express API
│   ├── src/
│   │   ├── abe/        # Access Control logic
│   │   ├── ciphers/    # Polybius and Vigenère implementations
│   │   ├── services/   # Hybrid encryption orchestration
│   │   └── server.js   # Express server entry point
│   └── package.json
├── frontend/           # React + Vite Application
│   ├── src/
│   │   ├── components/ # UI components (Encryption, Decryption, Stepper)
│   │   ├── App.jsx     # Main application logic
│   │   └── index.css   # Global styles
│   └── package.json
├── package.json        # Root package.json (Workspaces)
└── README.md
```

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Tooling**: NPM Workspaces

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ABE
   ```

2. Install dependencies for both frontend and backend from the root:
   ```bash
   npm install
   ```

### Running the Application

You can run both parts from the root directory using the following scripts:

- **Frontend (Dev)**:
  ```bash
   npm run dev:frontend
   ```

- **Backend (Dev)**:
  ```bash
   npm run dev:backend
   ```

## 🔐 Cryptography Workflow

1.  **Plaintext Input**: The user provides the message to be encrypted.
2.  **Policy Definition**: An access policy is assigned (e.g., `role: "admin", department: "security"`).
3.  **Hybrid Encryption**:
    - The message is first processed via a **Polybius Square**.
    - The result is then encrypted using the **Vigenère Cipher** with a user-provided secret key.
4.  **Decryption & Access**:
    - A receiver must provide the correct secret key.
    - The receiver's attributes must match the policy embedded in the encryption for successful decryption.

## 📜 License

This project is for academic/personal use. Please see individual files for specific implementation details.
