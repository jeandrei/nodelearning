
/**
 * Mesma função de validação em backend e frontend
 * Criamos o arquivo public/javascripts/valida.js
 * Criamos as funções de validação no formato javascript
 * e ao final verificamos se está sendo solicitado tipo module e module.exports
 * se sim adicionamos o module exports
 * No model models/cadastro.js damos um require no arquivo 
 * Valida = require('../public/javascripts/valida');
 * Em que Valida passa a ter acesso as funções de validação
 * Em que chamamos dentro da Schema assim Valida.validaCPF
 * Dando a mensagem de erro customizada
 * Para utilizar no frontend basta dar um script src no arquivo
 * Como no arquivo views/cadastros/new.ejs 
 *<script src="/javascripts/valida.js"></script> 
 * Para testar coloque dados que não passam na validação do arquivo seeds2.js
 * E tente inserir com node seeds2.js
 * E no frontend abra o arquivo ip:3000/cadastros/new
 * Aperte F12 e no console rode uma função como validaCPF('00');
 * vai ter que retornar ture or false
 * para testar o backend insira dados inválidos no seed.js e 
 * tente inserir node seeds.js
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