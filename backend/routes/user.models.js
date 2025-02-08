import express from 'express';
import { createNewUser, getAlldatafromtable, getDatabyID } from '../controllers/user.controllers.js';

// initate express router
const router = express.Router();

router.get('/getalluser', getAlldatafromtable);
router.get('/getuserbyid/:id', getDatabyID);
router.post('/createuser', createNewUser);



export default router;