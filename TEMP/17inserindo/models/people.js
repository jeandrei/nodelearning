const mongoose = require('mongoose');


const peopleSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        min: 0
    }        
});


const People = mongoose.model('People', peopleSchema);

module.exports = People;

