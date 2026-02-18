import express from 'express';

import authRoute from './auth.route';

const routes = [{ path: '/auth', route: authRoute }];

const router = express.Router();
routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
