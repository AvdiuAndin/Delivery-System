module.exports = {
    isString: (string) => {
        return "string" === typeof string;
    },
    isNumber: (number) => {
        return !isNaN(number)
    },
    isStringOfLength: (string, length) => {
        return module.exports.isString(string) && string.length === length;
    },
    isVariableSet: (variable) => {
        return variable != undefined;
    },
    isObject: (obj) => {
        return obj && typeof obj === 'object' && obj.constructor === Object
    },
    isArray: (array) => {
        return array && typeof array === 'object' && array.constructor === Array
    }
}
