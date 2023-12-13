const mongoose = require('mongoose')

var productSchema = mongoose.Schema({
    partNumber: String,
    serialNumber: String,
    dateReceived: String
})

var Product = mongoose.model("Product", productSchema)

module.exports = Product