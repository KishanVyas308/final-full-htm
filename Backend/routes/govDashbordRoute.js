import express from 'express';
import { checkToken } from '../middlewares/govDashbordMiddleWare.js';
import { addUser, login } from '../controllers/govDashbordController.js';

const router = express.Router();

router.post("/login" , login );
  
  
  router.post("/addUser" ,checkToken, addUser);

export default router;