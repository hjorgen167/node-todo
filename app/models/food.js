var mongoose = require('mongoose');

module.exports = mongoose.model('food', {
    name: {
        type: String,
        default: ''
    },
    price: {
    	type: Number,
    	default: 0
    }
});