'use strict';

const typeValidator = require('../../../helpers/validators/typeValidation');
const {validateAddress} = require('../../../helpers/validators/addressValidator');
const {validatePackages} = require('../../../helpers/validators/packagesValidator');
const CONSTANTS = require('../../../helpers/constants');

module.exports = {
  validateShipmentRequest: (req, res, next) => {
    const shipmentRequest = req.body.shipment_request;

    // Get shippment data
    const shippingAddress = shipmentRequest.shippingAddress;
    const receivingAddress = shipmentRequest.receivingAddress;
    const packages = shipmentRequest.packages;

    // This array holds the codes if there are more than one error.
    const errorCodesArray = [];

    // Validate that shipping address is present
    if (
      !typeValidator.isVariableSet(shippingAddress) &&
      !typeValidator.isObject(shippingAddress)
    ) {
      errorCodesArray.push(CONSTANTS.SHIPPING_ADDRESS_ERROR_CODE);
    }

    // Validate that recieving address is present
    if (
      !typeValidator.isVariableSet(receivingAddress) &&
      !typeValidator.isObject(receivingAddress)
    ) {
      errorCodesArray.push(CONSTANTS.RECEIVING_ADDRESS_ERROR_CODE);
    }

    // Validate that packages is present
    if (
      !typeValidator.isVariableSet(packages) &&
      !typeValidator.isArray(packages)
    ) {
      errorCodesArray.push(CONSTANTS.PACKAGES_ERROR_CODE);
    } else {
      if (typeValidator.isArray(packages) && packages.length === 0) {
        // there should be at least one package;
        errorCodesArray.push(CONSTANTS.PACKAGES_ERROR_CODE);
      }
    }

    if (errorCodesArray.length > 0) {
      // return array of error codes
      return res.status(400).send({
        errorCode:
          errorCodesArray.length === 1 ? errorCodesArray[0] : errorCodesArray,
      });
    }

    // result object contains 'error' object with attribute status and body
    const resultOfShippingAddress = validateAddress(shippingAddress);
    const resultOfReceivingAddress = validateAddress(receivingAddress);
    const resultOfPackages = validatePackages(packages);

    if (resultOfReceivingAddress.error.status) {
      errorCodesArray.push(CONSTANTS.RECEIVING_ADDRESS_ERROR_CODE);
    }

    if (resultOfShippingAddress.error.status) {
      errorCodesArray.push(CONSTANTS.SHIPPING_ADDRESS_ERROR_CODE);
    }

    if (resultOfPackages.error.status) {
      errorCodesArray.push(CONSTANTS.PACKAGES_ERROR_CODE);
    }

    if (errorCodesArray.length > 0) {
      return res.status(400).send({
        errorCode:
          errorCodesArray.length === 1 ? errorCodesArray[0] : errorCodesArray,
      });
    }

    // Validation completed
    next();
  },
};
