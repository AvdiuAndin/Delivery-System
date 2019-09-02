const weightConverter = require('./weightConverter');
module.exports = {
    calculatePrizeFromOfPackage: (pack) => {
        let unit = pack.unit.toUpperCase();
        let pound = pack.weight;
        if(unit !== 'LB'){
            pound = weightConverter.kgToPound(pack.weight);
        }
        return pound;
    },
    calculateTotal: (packages) => {
        let total = 0;
        for(let pack of packages){
            let number = module.exports.calculatePrizeFromOfPackage(pack);
            total += number;
        }

        switch (true) {
            case (total <= 2):
                return 0;
            case ((total > 2) && total < 20):
                return total;
            case (total > 20):
                return total * 2;
        }
    },
    addPercentageToPrize: (prize, percentage) => {
        return prize + prize / 100 * percentage;
    }
}
