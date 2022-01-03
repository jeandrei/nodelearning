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
        enum: [0,1,2,3,4,5,6,7,8,9,10],
        min: 0
    }        
});


const People = mongoose.model('People', peopleSchema);

module.exports = People;

