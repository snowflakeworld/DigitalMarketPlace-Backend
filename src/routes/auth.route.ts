import express from 'express';
import { createValidator } from 'express-joi-validation';

import { signIn, signUp } from '@controllers/auth.controller';
import { signinValidator, signupValidator } from '@middlewares/validation/auth';

const router = express.Router();
const validator = createValidator();

router.post('/sign-in', validator.body(signinValidator), signIn);
router.post('/sign-up', validator.body(signupValidator), signUp);

export default router;
