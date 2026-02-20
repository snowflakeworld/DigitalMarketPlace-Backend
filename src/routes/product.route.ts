import express from 'express';
import { createValidator } from 'express-joi-validation';

import { getProducts, listProduct, purchaseProduct, transferOwnership, uploadProductImage } from '@controllers/product.controller';
import { auth, uploadImage } from '@middlewares';
import {
  listProductValidator,
  purchaseProductValidator,
  transferOwnershipValidator
} from '@middlewares/validation/product';

const router = express.Router();
const validator = createValidator();

router.post('/list/all', auth, getProducts);
router.post('/list/new', auth, validator.body(listProductValidator), listProduct);
router.post('/purchase', auth, validator.body(purchaseProductValidator), purchaseProduct);
router.post('/transfer', auth, validator.body(transferOwnershipValidator), transferOwnership);

router.post('/upload/image', auth, uploadImage.single('file'), uploadProductImage);

export default router;
