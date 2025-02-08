import express from 'express';
import cors from 'cors';
import Poolconnector from './db/connector';



// initate express
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// initiate listener
app.listen(5000, () => {
    console.log('Server is running on port 5000');
    // initate now db connection
    Poolconnector.connect()
});
