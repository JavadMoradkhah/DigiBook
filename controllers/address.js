const AppError = require('../utils/AppError');
const Address = require('../models/Address');
const { AddressSchema, AddressUpdateSchema } = require('../schemas/Address');

exports.findAddress = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const address = await Address.findByPk(id);

    if (!address) {
      return next(new AppError(404, 'fail', 'The address not found with the given id!'));
    }

    req.address = address;

    next();
  } catch (error) {
    next(error);
  }
};

exports.getUserAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.findAll({
      where: { user_id: req.user.id },
      order: [['created_at', 'DESC']],
    });

    res.status(200).json({ status: 'success', data: { addresses } });
  } catch (error) {
    next(error);
  }
};

exports.getAddressById = async (req, res, next) => {
  try {
    res.status(200).json({ status: 'success', data: { address: req.address } });
  } catch (error) {
    next(error);
  }
};

exports.createAddress = async (req, res, next) => {
  try {
    const validation = AddressSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    req.body.user_id = req.user.id;

    const address = await Address.create(req.body);

    res.status(200).json({ status: 'success', data: { address } });
  } catch (error) {
    next(error);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const validation = AddressUpdateSchema.validate(req.body);
    if (validation.error) {
      return next(new AppError(400, 'fail', validation.error.message));
    }

    let { address } = req;

    Object.assign(address, req.body);

    address = await address.save();

    res.status(200).json({ status: 'success', data: { address } });
  } catch (error) {
    next(error);
  }
};
