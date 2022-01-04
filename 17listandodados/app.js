/*
 * 1-Cria o view index.ejs views/cadastros/index.ejs
 * 2-No controller importe o model
 * 3-Cria no controller module.exports.listCadastros que renderiza o index.ejs
 * 4-Adiciona a rota no arquivo routes/cadastros
 * router.get('/', cadastros.listCadastros);
 * 5-Realiza a consulta e rendeniza o arquivo views/cadastros/index.js passando os dados
 * localizados
 * 6-Exibe os dados no arquivo views/cadastros/index.ejs
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