const request = require('supertest')
const app = require('../../app')
const validRequests = require('../requests/requests.json')
const invalidRequests = require('../requests/invalid_requests.json')
const invalidRequestsWithCodes = require('../requests/invalid_requests_with_error_codes.json')

const validShipmentsIndex = Object.keys(validRequests)
const invalidShipmentsIndex = Object.keys(invalidRequests)
const invalidRequestsWithCodesIndex = Object.keys(invalidRequestsWithCodes)

const createTestsMeta = function(index, map) {
	return index.map(key => {
		return [key, map[key].shipment_request, map[key].shipment]
	})
}

describe('Valid shipment requests', () => {
	it.each(createTestsMeta(validShipmentsIndex, validRequests))(
		'Scenario: %s',
		async (key, shipment_request, shipment) => {
			const response = await request(app).post('/shipments/request-shipment').send({shipment_request})
				.set('Accept', 'application/json')
			expect(response.body).toEqual({ shipment })
	})
})

describe('Invalid shipment requests without error codes', () => {
	it.each(createTestsMeta(invalidShipmentsIndex, invalidRequests))(
		'Scenario: %s',
		async (key, shipment_request) => {
			const response = await request(app).post('/shipments/request-shipment').send({shipment_request})
				.set('Accept', 'application/json')
			expect(response.statusCode).toEqual(400)
		})
})

describe('Invalid shipment requests with error codes', () => {
	it.each(createTestsMeta(invalidRequestsWithCodesIndex, invalidRequestsWithCodes))(
		'Scenario: %s',
		async (key, shipment_request, shipment) => {
			const response = await request(app).post('/shipments/request-shipment').send({shipment_request})
				.set('Accept', 'application/json')
			expect(response.statusCode).toEqual(400)
			expect(response.body).toEqual(shipment)
		})
})
