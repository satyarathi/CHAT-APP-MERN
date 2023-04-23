import express from 'express';
import * as chatController from '../controllers/chat.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to access chat
router.post('/', userAuth, chatController.accessChat);

//route to fetch chat
router.get('/', userAuth, chatController.fetchChat);

export default router;