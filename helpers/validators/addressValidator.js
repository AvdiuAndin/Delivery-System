const typeValidator = require('./typeValidation');
const states = require('../dataSets/states.json');
const STATE_LENGTH = 2;

module.exports = {
  validateAddress: (address) => {
    // TODO implement state validation

    const errorBody = {
      messages: [],
    };

    const addressName = address.addressName;
    const state = address.state;
    const name = address.name;

    // validate addressName
    if (!typeValidator.isVariableSet(addressName)) {
      errorBody.messages.push('addressName is required');
    } else {
      // validate if it is string
      if (!typeValidator.isString(addressName)) {
        errorBody.messages.push('addressName should be a string');
      }
    }

    // validate state
    if (!typeValidator.isVariableSet(state)) {
      errorBody.messages.push('state is required');
    } else {
      if (!typeValidator.isString(state)) {
        errorBody.messages.push('state should be string');
      } else {
        // length
        if (!typeValidator.isStringOfLength(state, STATE_LENGTH)) {
          errorBody.messages.push('state should be of length: 2');
        }

        if (!module.exports.stateExists(state)) {
          errorBody.messages.push('state ' + state + ' is not found');
        }
      }
    }

    // validate name
    if (typeValidator.isVariableSet(name)) {
      if (!typeValidator.isString(name)) {
        errorBody.messages.push('name should be string');
      }
    }

    return {
      error: {
        status: errorBody.messages.length > 0,
        body: errorBody.messages,
      },
      body: {},
    };
  },
  isSameState: (shippingAddress, receivingAddress) => {
    return shippingAddress === receivingAddress;
  },
  stateExists: (state) => {
    return !!states[state];
  },
};
