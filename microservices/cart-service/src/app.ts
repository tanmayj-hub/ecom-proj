import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Cart-service running!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Cart-service running at port ${PORT}`);
});
