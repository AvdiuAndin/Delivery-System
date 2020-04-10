const express = require('express');


const shipmentController = require('./controller/shipmentController');
const shippmentMiddleware = require('./middleware/shippmentMiddleware');

// eslint-disable-next-line new-cap
const router = express.Router();

router.post(
    '/request',
    shippmentMiddleware.validateShipmentRequest,
    shipmentController.requestShippment,
);
module.exports = router;
