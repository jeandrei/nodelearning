//require no mongoose
const mongoose = require('mongoose');
// para evitar ter que fazer mongoose.Schema
const { Schema } = mongoose;

// cria a Schema para a farm
const farmSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Farm must have a name']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        require: [true, 'Email require']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

//Relação product - farm one to many
