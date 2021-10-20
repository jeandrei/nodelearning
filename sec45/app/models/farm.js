//require no mongoose
const mongoose = require('mongoose');

const Product = require('./product');

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
});

farmSchema.post('findOneAndDelete', async function (farm){
    if(farm.products.length){
        //delete todos os produtos onde encontrar o _id no array farm.products
        const res = await Product.deleteMany({ _id:{ $in: farm.products } });
        console.log(res);
    }   
});

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;

//Relação product - farm one to many
