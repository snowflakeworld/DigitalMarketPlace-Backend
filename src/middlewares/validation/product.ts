import Joi from 'joi';

export const listProductValidator = Joi.object({
  address: Joi.string().required().length(42),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.string().required(),
  image: Joi.string().required(),
  ipfsHash: Joi.string().required(),
  productId: Joi.number().required()
});

export const purchaseProductValidator = Joi.object({
  address: Joi.string().required().length(42),
  productObjectId: Joi.string().required()
});

export const transferOwnershipValidator = Joi.object({
  fromAddress: Joi.string().required().length(42),
  toAddress: Joi.string().required().length(42),
  productObjectId: Joi.string().required()
});
