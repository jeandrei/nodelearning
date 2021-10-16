/**
 * Aula 450 One to Many
 */


//conexão com o banco de dados
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sec44',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
   console.log("CONNECTION OPEN!!!");
})
.catch(err => {
   console.log("OH NO ERROR!!!")
   console.log(err);
})

//1 - Cria a Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        //enum só permite esses valores
        enum: ['Sprint', 'Summer', 'Fall', 'Winter']
    }
});