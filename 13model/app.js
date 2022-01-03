/*
 *
 * MODEL 
 * 1-Cria uma pasta models na raiz do app
 * 2-Dentro da pasta model criamos o model neste caso cadastro.js
 * 3-Dentro do arquivo models/cadastro.js precisamos dar um require no mongoose
 * 4-Cria a schema neste caso cadastroSchema
 * 5-Ainda no arquivo models/cadastro.js compilamos o model mongoose.model
 * 6-Ainda no arquivo models/cadastro.js exportamos o model module.exports
 * 7-Importamos o model para o app.js require const Cadastro = require('./models/cadastro');
 * 
 * 
 */


require('dotenv').config();
const port = process.env.PORT || 3000;

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

//==================Imoprtamos o model=======
const Cadastro = require('./models/cadastro');
//===========================================

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';

mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});


app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})