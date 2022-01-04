/*
 * ATUALIZANDO
 * 1-Cria um controller editCadastro para rendenizar o formulário de edição
 * cadastros/edit
 * 2-Cria uma rota para carregar o formulário de edição no controller
 * router.get('/:id/edit', cadastros.editCadastro);
 * no controller procurando os dados e armazenando em uma constante
 * para carregar o formulário com os dados
 * 3-Crie o formulário de edição views/cadastros/edit.ejs
 * 3-Cria um controller para atualizar os dados no bd
 * updateCadastro
 * 4-Cria uma rota para PUT rodar o código do controller 
 * router.put('/:id', cadastros.updateCadastro);
 * 5-Cria um formulário edit.ejs com metodo put ?_method=PUT
 * nesse formulário é carregado os dados já existentes no banco
 * 6-No arquivo views/cadastros/details.ejs crie o link para edição
 * do registro  <a href="/cadastros/<%= cadastro._id %>/edit">Editar</a>
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