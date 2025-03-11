import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Product-service running with TypeScript!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Product-service running clearly at port ${PORT}`);
});

// change made to check if git push works and cicd pipeline works with OIDC authentication 3
