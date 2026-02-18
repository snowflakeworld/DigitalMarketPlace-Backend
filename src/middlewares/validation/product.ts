import Joi from 'joi';

export const listProductValidator = Joi.object({
  address: Joi.string().required().length(42),
  name: Joi.string().required(),
  description: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string().required(),
  ipfsHash: Joi.string().required()
});

export const purchaseProductValidator = Joi.object({
  address: Joi.string().required().length(42),
  productId: Joi.string().required()
});

export const transferOwnershipValidator = Joi.object({
  fromAddress: Joi.string().required().length(42),
  toAddress: Joi.string().required().length(42),
  productId: Joi.string().required()
});
