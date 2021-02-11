const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    role: {type: String, required: true},
    phone: {type: String},
    city: {type: String, required: true},
    street: {type: String, required: true},
    flatNumber: {type: String},
    isLogged: {type: Boolean, required: true},
});

module.exports = mongoose.model('User', userSchema);
