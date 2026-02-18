import express from 'express';
import { createValidator } from 'express-joi-validation';

import { getProducts, listProduct, purchaseProduct, transferOwnership } from '@controllers/product.controller';
import { auth } from '@middlewares';
import {
  listProductValidator,
  purchaseProductValidator,
  transferOwnershipValidator
} from '@middlewares/validation/product';

const router = express.Router();
const validator = createValidator();

router.get('/list/all', auth, getProducts);
router.post('/list/new', auth, validator.body(listProductValidator), listProduct);
router.post('/purchase', auth, validator.body(purchaseProductValidator), purchaseProduct);
router.post('/transfer', auth, validator.body(transferOwnershipValidator), transferOwnership);

export default router;
