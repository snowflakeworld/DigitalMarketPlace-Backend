import express from 'express';

import { addSetting, getSetting, modifySetting } from '@controllers/setting.controller';
import { auth } from '@middlewares';

const router = express.Router();

router.get('/all', auth, getSetting);
router.post('/insert', auth, addSetting);
router.put('/update/:key', auth, modifySetting);

export default router;
