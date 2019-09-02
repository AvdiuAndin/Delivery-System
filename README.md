# Delivery System
Goal is to implement a basic delivery system with a NodeJS backend.

The shipping system should be able to create shipments.

# Goals
The main goal is to realize the idea of a system that can generate and handle the shipment creation process.

## Shipment Creation
The focus of this task is finding out the **correct cost** of a shipment. Aspects such as "time of delivery", surcharges and others are out of scope.

#### Cost business rules
* Same state uses the base rate on the weight;
* Different state shipments have a fixed 20% cost increase on top of the previous value (rate on weight);
* Packages can have distinct weight units, either pounds or kilograms.
* Weight needs to be validated on pounds, thus requiring conversion from kg;
* Weight rate is tiered:
  * Shipments up to 2 pounds are free;
  * When pounds are > 2, each pound will be 1 dollar;
  * When pounds are > 20, each pound will be 2 dollars;
  * Examples:
      * 1 pound shipment will be free;
      * 3 pound shipment will be 3 dollars;
      * 8 pound shipment will be 8 dollars;
      * 25 pound shipment will be 50 dollars;

## Models
Example models expected in the application, in pseudo-code.
```
Address = {
  addressName: String, required
  state: String, required, length: 2, need to be present in state registry
  name: String, optional
}

Package = {
  name: String, required
  weight: Number, required
  unit: String, required, length: 2, either LB or KG
}

ShipmentRequest = {
  shippingAddress: Address, required
  receivingAddress: Address, required
  packages: [ Package... ], required, lenght: >= 1
}

Shipment = {
  cost: Number, required, round to 3 digits
}
```
## Validations
* When a validation fails, return the appropriate HTTP status code.
* For bonus points, return one of the following error codes as well:
  * Validation failed for shipping address: "1100"
  * Validation failed for receiving address: "1200"
  * Validation failed for packages: "1300"
  * Validate the entire request. If more than one area fail, send an array, like ["1100", "1200"]
* Type validations and correct handling of numbers and strings are required, in order to support the maximum amount of clients and requests. 

## Inputs and outputs
With the source code, input and output samples are provided to power the tests. These can be used as documentation as well.
These will contain common edge cases, situations with non-perfect client requests and, most importantly, different permutations of the base input.
Ensure that the implementation is robust beyond the provided tests.
