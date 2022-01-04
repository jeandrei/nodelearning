/*
 * INSERINDO NO BANCO DE DADOS
 * 
 * A primeira coisa aqui no app.js temos que adicionar a linha
 * app.use(express.urlencoded({ extended: true }));
 * para poder passar os dados pelo POST e ter acesso ao
 * req.body, caso contrário não vai passar
 * vai passar como undefined
 * 
 * Para inserir precisamos sempre de duas rotas
 * Uma par rendenizar o formulário
 * E a outra para efetuar a gravação
 * 
 * Neste caso a primeira para rendenizar o formulário que está em views/cadastros/new
 * Usaremos a rota
 * router.get('/new', cadastros.newCadastro);
 * O formulário tem que submeter para /cadastros com method post
 * sempre para o post precisamos da linha app.use(express.urlencoded({ extended: true }));
 * que da acesso ao req.body
 * 
 * A segunda rota vai ser para salvar route.post
 * 
 * Salvamos o cadastro em module.exports.saveCadastro
 * 
 * Outra coisa IMPORTANTISSIMA aqui para funcionar em ambos a validação tanto no model quanto no joi
 * precisamos definir os nomes dos campos no formulário como cadastro[cadastroNome] 
 * dessa forma se dar um console.log(req.body) ao enviar o formulário o resultado vai ser algo
 * cadastro:[
 *    cadastroNome,
 *    cadastroCpf,
 *    cadastroEmail
 * ]
 * daí quando for fazer o SAVE la no controller se usar apenas req.body ele vai dar sempre como
 * o campo tal é obrigatório como se não tivesse sendo enviado pq? pq ele vai trazer cadastro e não cadastroNome
 * para dar certo lá no save temos que usar req.body.cadastro
 * dessa forma pegamos apenas os campos cadastroNome etc
 * e pq não usar direto então lá no formulário o nome cadastroNome ao invés de cadastro[cadastroNome]?
 * pq precisamos que seja cadastro[cadastroNome] na validação do joi
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