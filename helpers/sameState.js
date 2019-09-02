module.exports = {
    checkSameState: (receivingAddress, shippingAddress) =>{
        return receivingAddress.state === shippingAddress.state;
    }
}
