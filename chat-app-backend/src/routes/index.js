import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import chatRoute from './chat.route';
/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);

  router.use('/chat', chatRoute);

  return router;
};

export default routes;
