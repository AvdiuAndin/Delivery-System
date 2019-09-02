

var express = require('express');
// Helper libraries are supplied if needed
// const _ = require('lodash')
// const r = require('ramda')
const { validateState } = require('../helpers/validateState');
const { validateAddress } = require('../helpers/validateAddress');
const { validatePackages } = require('../helpers/validatePackages');
const typeValidator = require('../helpers/typeValidation');
const prizeCalculator = require('../helpers/priceCalculator');
const { checkSameState } = require("../helpers/sameState");
const { addPercentageToPrize } = require("../helpers/priceCalculator");


const CONSTANTS = require('../helpers/constants');
const router = express.Router()

router.post('/request-shipment', function(req, res, next) {
	// TODO implement based on README
	let shipment_request = req.body.shipment_request;
	let shippingAddress = shipment_request.shippingAddress;
	let receivingAddress = shipment_request.receivingAddress;
	let packages = shipment_request.packages;

	// This array holds the codes if there are more than one error.
	let errorCodesArray = [];

	// validate  if they exist
	if(!typeValidator.isVariableSet(shippingAddress) && !typeValidator.isObject(shippingAddress)){
		errorCodesArray.push(CONSTANTS.SHIPPING_ADDRESS_ERROR_CODE);
	}

	//validate if they exist
	if(!typeValidator.isVariableSet(receivingAddress) && !typeValidator.isObject(receivingAddress)){
		errorCodesArray.push(CONSTANTS.RECEIVING_ADDRESS_ERROR_CODE);
	}

	if(!typeValidator.isVariableSet(packages) && !typeValidator.isArray(packages)){
		errorCodesArray.push(CONSTANTS.PACKAGES_ERROR_CODE);
	} else {
		if(typeValidator.isArray(packages) && packages.length === 0){
			// there should be at least one package;
			errorCodesArray.push(CONSTANTS.PACKAGES_ERROR_CODE);
		}
	}

	// if there is any error code
	if(errorCodesArray.length > 0){
		//return array of error codes
		return res.status(400).send({ errorCode : errorCodesArray.length === 1 ? errorCodesArray[0]:errorCodesArray });
	}

	let inputErrorMessagesArray = [];
	// result object contains 'error' object with attribute status and body
	let resultOfShippingAddress = validateAddress(shippingAddress);
	let resultOfReceivingAddress = validateAddress(receivingAddress);
	let resultOfPackages = validatePackages(packages);


	let arrayOfErrorCodes = [];

	if(resultOfReceivingAddress.error.status){
		errorCodesArray.push(CONSTANTS.RECEIVING_ADDRESS_ERROR_CODE);
	}

	if(resultOfShippingAddress.error.status){
		errorCodesArray.push(CONSTANTS.SHIPPING_ADDRESS_ERROR_CODE);
	}

	if(resultOfPackages.error.status){
		errorCodesArray.push(CONSTANTS.PACKAGES_ERROR_CODE);
	}

	if(errorCodesArray.length > 0){
		console.log(errorCodesArray);
		return res.status(400).send({ errorCode: errorCodesArray.length === 1 ? errorCodesArray[0] : errorCodesArray });
	}

	let total = prizeCalculator.calculateTotal(packages);

	if(!checkSameState(shippingAddress, receivingAddress)){
		total = addPercentageToPrize(total, 20);
	}

	res.status(200).send({ shipment: { cost: parseFloat(total.toFixed(2))} })
});

module.exports = router;
