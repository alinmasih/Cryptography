import express from 'express';
import cors from 'cors';
import encryptionRoutes from './routes/encryptionRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', encryptionRoutes);

app.get('/', (req, res) => {
  res.send('ABE Hybrid Encryption System Backend Running');
});

const PORT = Number(process.env.PORT) || 5001;

app.listen(PORT, () => {
  console.log(`ABE Backend server running on port ${PORT}`);
});

export default app;
