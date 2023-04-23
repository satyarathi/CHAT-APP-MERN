import express from 'express';
import * as messageController from '../controllers/message.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to send chat
router.post('/', userAuth, messageController.sendMessage);

// route to fetch all chat
router.get('/:chatId', userAuth, messageController.allMessages);

export default router;