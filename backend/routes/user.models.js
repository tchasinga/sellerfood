import express from "express";
import {
  createNewUser,
  deleteDataOfUsers,
  getAlldatafromtable,
  getDatabyID,
} from "../controllers/user.controllers.js";

// initate express router
const router = express.Router();

router.get("/getalluser", getAlldatafromtable);
router.get("/getuserbyid/:id", getDatabyID);
router.post("/createuser", createNewUser);
router.delete("/deleteuser/:id", deleteDataOfUsers);

export default router;
