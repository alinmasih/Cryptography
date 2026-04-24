import { Router } from 'express';
import { hybridEncrypt, hybridDecrypt } from '../services/hybridEncryption.js';

const router = Router();

router.post('/encrypt', (req, res) => {
  try {
    const { plaintext, key, policy } = req.body;
    
    if (!plaintext || !key || !policy) {
      return res.status(400).json({ error: 'Missing required fields: plaintext, key, or policy' });
    }

    const result = hybridEncrypt(plaintext, key, policy);
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/decrypt', (req, res) => {
  try {
    const { ciphertext, key, userAttributes, policy } = req.body;
    
    if (!ciphertext || !key || !userAttributes || !policy) {
      return res.status(400).json({ error: 'Missing required fields: ciphertext, key, userAttributes, or policy' });
    }

    const plaintext = hybridDecrypt(ciphertext, key, userAttributes, policy);
    
    res.json({ plaintext });
  } catch (error) {
    if (error.message.includes('Access Denied')) {
      return res.status(403).json({ error: error.message });
    }
    
    res.status(500).json({ error: error.message });
  }
});

export default router;
