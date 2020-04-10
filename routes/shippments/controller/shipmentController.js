
const {addPercentageToPrice} = require('../../../helpers/calculators/priceCalculator');
const {isSameState} = require('../../../helpers/validators/addressValidator');
const priceCalculator = require('../../../helpers/calculators/priceCalculator');

module.exports = {
  requestShippment: (req, res) => {
    const shipmentRequest = req.body.shipment_request;

    // Get shippment data
    const shippingAddress = shipmentRequest.shippingAddress;
    const receivingAddress = shipmentRequest.receivingAddress;
    const packages = shipmentRequest.packages;
    let total = priceCalculator.calculateTotal(packages);

    if (!isSameState(shippingAddress.state, receivingAddress.state)) {
      total = addPercentageToPrice(total, 20);
    }

    res.status(200).send({shipment: {cost: parseFloat(total.toFixed(2))}});
  },
};
