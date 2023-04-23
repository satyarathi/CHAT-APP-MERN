import express from 'express';
import * as messageController from '../controllers/message.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to send chat
router.post('/', userAuth, messageController.sendMessage);

export default router;