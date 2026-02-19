import express from 'express';

import authRoute from './auth.route';
import productRoute from './product.route';
import settingRoute from './setting.route';

const routes = [
  { path: '/auth', route: authRoute },
  { path: '/product', route: productRoute },
  { path: '/setting', route: settingRoute }
];

const router = express.Router();
routes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
