import { Router } from 'express';
import { hybridEncrypt, hybridDecrypt } from '../services/hybridEncryption.js';

const router = Router();
const isPlainObject = (value) => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

router.post('/encrypt', (req, res) => {
  try {
    const { plaintext, key, policy } = req.body;
    
    if (!plaintext || !key || !policy) {
      return res.status(400).json({ error: 'Missing required fields: plaintext, key, or policy' });
    }

    if (!isPlainObject(policy) || Object.keys(policy).length === 0) {
      return res.status(400).json({ error: 'Invalid policy: expected a non-empty object' });
    }

    const result = hybridEncrypt(plaintext, key, policy);
    
    res.json(result);
  } catch (error) {
    const message = error?.message || 'Unexpected server error';

    if (message.startsWith('Invalid')) {
      return res.status(400).json({ error: message });
    }

    res.status(500).json({ error: message });
  }
});

router.post('/decrypt', (req, res) => {
  try {
    const { ciphertext, key, userAttributes, policy } = req.body;
    
    if (!ciphertext || !key || !userAttributes || !policy) {
      return res.status(400).json({ error: 'Missing required fields: ciphertext, key, userAttributes, or policy' });
    }

    if (!isPlainObject(userAttributes) || !isPlainObject(policy) || Object.keys(policy).length === 0) {
      return res.status(400).json({ error: 'Invalid attributes or policy: expected non-empty objects' });
    }

    const plaintext = hybridDecrypt(ciphertext, key, userAttributes, policy);
    
    res.json({ plaintext });
  } catch (error) {
    const message = error?.message || 'Unexpected server error';

    if (message.includes('Access Denied')) {
      return res.status(403).json({ error: message });
    }

    if (message.startsWith('Invalid')) {
      return res.status(400).json({ error: message });
    }
    
    res.status(500).json({ error: message });
  }
});

export default router;
