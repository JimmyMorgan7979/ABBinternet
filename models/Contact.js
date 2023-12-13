const mongoose = require('mongoose')

var contactSchema = mongoose.Schema({
    name: String,
    email: String,
    message: String,
    company: String,
    dateAdded: String
})

var Contact = mongoose.model("Contact", contactSchema)

module.exports = Contact