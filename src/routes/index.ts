import express from 'express';

import authRoute from './auth.route';
import productRoute from './product.route';

const routes = [
  { path: '/auth', route: authRoute },
  { path: '/product', route: productRoute }
];

const router = express.Router();
routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
