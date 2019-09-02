const typeValidator = require('./typeValidation');
const CONSTANTS = require('./constants');

module.exports = {
    validatePackages: (packages) => {
        // TODO implement state validation

        let errorBody = {
            messages: []
        };

        for(let pack of packages) {

            let packageName = pack.name;
            let packageWeight = pack.weight;
            let packageUnit = pack.unit;

            if(!typeValidator.isString(packageName)) errorBody.messages.push('package name is required');
            if(!typeValidator.isNumber(packageWeight)) errorBody.messages.push('package weight is required and should be a number');
            if(!typeValidator.isStringOfLength(packageUnit, CONSTANTS.WEIGHT_UNIT_LENGTH)) {
                errorBody.messages.push('package unit is should be a string with length of 2');
            } else {
                if(CONSTANTS.WEIGHT_UNITS.indexOf(packageUnit.toUpperCase()) === -1){
                    errorBody.messages.push('Unit :' + packageUnit+ ' is not found');
                }
            }
        }
        return {
            error: {
                status: errorBody.messages.length > 1,
                body: errorBody.messages
            },
            body: {}
        };
    }
}
