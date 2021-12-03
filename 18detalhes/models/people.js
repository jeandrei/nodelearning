const mongoose = require('mongoose');


const peopleSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    }, 
    last_name: {
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

