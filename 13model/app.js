/*
 *
 * MODEL 
 * 1-Cria uma pasta models na raiz do app
 * 2-Dentro da pasta model criamos o model neste caso people.js
 * 3-Dentro do arquivo models/people.js precisamos dar um require no mongoose
 * 4-Cria a schema neste caso peopleSchema
 * 5-Ainda no arquivo models/people.js compilamos o model mongoose.model
 * 6-Ainda no arquivo models/people.js exportamos o model module.exports
 * 7-Importamos o model para o app.js require const People = require('./models/people');
 * 
 * 
 */


require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));





//===================================ROTAS=============================================


//==================Imoprtamos o model=======
const People = require('./models/people');
//===========================================



const peoples = require('./routes/peoples');
app.use('/peoples', peoples);
//======================================================================================





const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/testdb';
mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})