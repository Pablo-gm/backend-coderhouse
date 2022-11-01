const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
    products: { type: [Object]},
    userId: { type: String, required: true},
}) 

module.exports = model('carts',cartSchema);