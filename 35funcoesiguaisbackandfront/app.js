
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
 * 
 */


//arquivo de configuração secreta .env
require('dotenv').config();
const port = process.env.PORT;


//Express
const express = require('express');
const app = express();

//Static Files public folder
app.use(express.static('public'));


//Definição da pasta views 
const path = require('path');
app.set('views', path.join(__dirname, 'views'));

//Definição do ejs engine
app.set('view engine', 'ejs');

//Acesso ao req.body
app.use(express.urlencoded({ extended: true }));

//MethodOverride
const methodOverride = require('method-override');
//Palavra passe hrl?_method=DELETE
app.use(methodOverride('_method'));

//Monogoose
const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';

//cadastroSchema
const Cadastro = require('./models/cadastro');



//Rota para o Home
app.get('/', (req, res) => {
    res.send('Home');
});


//Rotas de cadastros
const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);


//Conexão com o banco de dados
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


//App listening
const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("App listening in: http://%s:%s", serverhost, serverport);
});


