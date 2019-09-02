const states = require('./states.json')

module.exports = {
	validateState: (state) => {
		// TODO implement state validation
		return !!states[state];
	}
}
