import express from 'express';
import * as chatController from '../controllers/chat.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to access chat
router.post('/', userAuth, chatController.accessChat);

//route to fetch chat
router.get('/', userAuth, chatController.fetchChat);

//route to create group chat
router.post('/group', userAuth, chatController.createGroupChat);

//route to rename group chat
router.put('/rename', userAuth, chatController.renameGroupChat);

export default router;