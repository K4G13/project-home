import 'dotenv/config';
import express, { Request, Response } from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const infoRouter = require('./routes/info');
const authRouter = require('./routes/auth');

app.use('/api', infoRouter);
app.use('/api', authRouter);

// Start the server
const PORT: number = parseInt(process.env.PORT || '3000');
console.log(process.env.PORT);
app.listen(PORT, () => {
    const logo = `\x1b[31m
      ___           ___           ___           ___
     /\\__\\         /\\  \\         /\\__\\         /\\  \\
    / /  /        /  \\  \\       /  |  |       /  \\  \\
   / /__/        / /\\ \\  \\     / | |  |      / /\\ \\  \\
  /  \\  \\ ___   / /  \\ \\  \\   / /| |__|__   /  \\ \\ \\  \\
 / /\\ \\  /\\__\\ / /__/ \\ \\__\\ / / |    \\__\\ / /\\ \\ \\ \\__\\
 \\/__\\ \\/ /  / \\ \\  \\ / /  / \\/__/--/ /  / \\ \\ \\ \\ \\/__/
      \\  /  /   \\ \\  / /  /        / /  /   \\ \\ \\ \\__\\
      / /  /     \\ \\/ /  /        / /  /     \\ \\ \\/__/
     / /  /       \\  /  /        / /  /       \\ \\__\\
     \\/__/         \\/__/         \\/__/         \\/__/

                        VERSION 7.0
\x1b[0m`;
    console.log(logo);
    console.log(`🔥 running on port: ${PORT}`);
    console.log(`🔸 http://localhost:${PORT}`);
});
