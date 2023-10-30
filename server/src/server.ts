require('dotenv').config();

import connect from './database/conn';
import advertisementsRoutes from './routes/advertisements';
import express from 'express';
import cors from 'cors';

const PORT = process.env.PORT;
const app = express();

app.use(
  cors({
    origin: '*'
  })
);

app.use(express.json({ limit: '50mb' }));
app.use(
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 })
);

app.use('/api/advertisements', advertisementsRoutes);

// connect to db
connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`Server connected to http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log("Can't connect to the server");
    }
  })
  .catch(error => {
    console.log('Invalid Database Connection...!');
  });
