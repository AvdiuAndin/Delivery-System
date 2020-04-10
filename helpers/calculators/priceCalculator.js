const weightConverter = require('../converters/weightConverter');

module.exports = {
  calculateWeightFromOfPackage: (pack) => {
    const unit = pack.unit.toUpperCase();
    let pound = pack.weight;
    if (unit !== 'LB') {
      pound = weightConverter.kgToPound(pack.weight);
    }
    return pound;
  },
  calculateTotal: (packages) => {
    let totalPounds = 0;
    for (const pack of packages) {
      const weight = module.exports.calculateWeightFromOfPackage(pack);
      totalPounds += weight;
    }

    switch (true) {
      case (totalPounds <= 2):
        return 0;
      case ((totalPounds > 2) && totalPounds < 20):
        return total;
      case (totalPounds > 20):
        return totalPounds * 2;
    }
  },
  addPercentageToPrice: (prize, percentage) => {
    return prize + prize / 100 * percentage;
  },
};
