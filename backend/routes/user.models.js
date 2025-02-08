import express from 'express';
import { getAlldatafromtable } from '../controllers/user.controllers.js';

// initate express router
const router = express.Router();

router.get('/getalluser', getAlldatafromtable);



export default router;