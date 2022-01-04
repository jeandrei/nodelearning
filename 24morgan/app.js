/*
 * Morgan
 * Morgan e uma middleware que mostra detalhes da aplicação
 * para facilitar o debugin
 * Instale o morgan
 * npm install morgan --save
 * fonte: https://www.npmjs.com/package/morgan
 * De um Require no Morgan
 * Defina o metodo de utilização do morgan no app.use
 * O morgan irá apresentar no console dados de requisições
 * exemplo: GET /cadastros 304 - - 51.405 ms
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

//==========================Require Morgan====================
const morgan = require('morgan');
//app.use executa sempre no código por exemplo
//se colocassemos um console.log("Heyyy"); no app.use
//veriamos um Heyy no console em todas as requisições pois ele 
//executa sempre
//então iremos colocar o morgan para executar em cada request
//tiny é tipo o mínimo para maiores informações veja a fonte
app.use(morgan('tiny'));
//Agora no console teremos várias informações em cada request
//para auxiliar o debug 
//==========================================================================

const Cadastro = require('./models/cadastro');

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