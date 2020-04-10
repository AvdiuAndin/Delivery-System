module.exports = {
  isString: (string) => 'string' === typeof string,
  isNumber: (number) => !isNaN(number),
  isStringOfLength: (string, length) => {
    return module.exports.isString(string) && string.length === length;
  },
  isVariableSet: (variable) => {
    return variable != undefined;
  },
  isObject: (obj) => {
    return obj && typeof obj === 'object' && obj.constructor === Object;
  },
  isArray: (array) => {
    return Array.isArray(array);
  },
};
