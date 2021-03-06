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
 * Neste caso a primeira para rendenizar o formulário que está em views/people/new
 * Usaremos a rota
 * router.get('/new', peoples.newPeople);
 * O formulário tem que submeter para /people com method post
 * sempre para o post precisamos da linha app.use(express.urlencoded({ extended: true }));
 * que da acesso ao req.body
 * 
 * A segunda rota vai ser para salvar route.post
 * 
 * Salvamos a people em module.exports.savePeople
 * 
 * Outra coisa IMPORTANTISSIMA aqui para funcionar em ambos a validação tanto no model quanto no joi
 * precisamos definir os nomes dos campos no formulário como people[firstName] 
 * dessa forma se dar um console.log(req.body) ao enviar o formulário o resultado vai ser algo
 * people:[
 *    firstName,
 *    lastName,
 *    score
 * ]
 * daí quando for fazer o SAVE la no controller se usar apenas req.body ele vai dar sempre como
 * o campo tal é obrigatório como se não tivesse sendo enviado pq? pq ele vai trazer people e não firstName
 * para dar certo lá no save temos que usar req.body.people
 * dessa forma pegamos apenas os campos firstName etc
 * e pq não usar direto então lá no formulário o nome firstName ao invés de people[firstName]?
 * pq precisamos que seja people[firstName] na validação do joi
 * 
 * 
 */


require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


//========================ADICIONAMOS urlencoded NECESSÁRIO PARA ACESSAR===========
//req.body
app.use(express.urlencoded({ extended: true }));
//====================================================




//===================================ROTAS=============================================
const People = require('./models/people');
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