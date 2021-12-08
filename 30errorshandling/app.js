/*
 * Handling Errors in Express
 * Para exemplificar aqui iremos usar aquela rota secret
 * /peoples/secret
 * Quando falamos de erros temos alguns grupos de erros tipos de erros
 * alguns causados por erro no código, sintaxe etc outros são
 * outros por dados incompletos ou falha de conexão com o banco de dados
 * erros gerados por API de serviços esternos, bibliotecas,
 * dados incompletos de um form etc
 * Para tratar isso o Express vem com uma função para tratar erros
 * errorHandler que toda vez que um erro ocorrer, o express vai pegar 
 * o erro e responder com a própria função errorHandler
 * então lá no arquivo de rotas na rota /peoples/secret
 * que no controller chama uma middleware verifyPassword
 * nesta middleware que está no arquivo middlewares.js
 * vamos usar essa funcionalidade para ao inves de mandar 
 * res.send('Desculpe você não tem permissão');
 * vamos criar um novo erro
 * throw new Error('Password required!');
 * 
 * 
 */


require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');


app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));



//===================================ROTAS=============================================
const People = require('./models/people');
const peoples = require('./routes/peoples');
app.use('/peoples', peoples);
//======================================================================================



app.use((req,res) => {
   res.status(404).send('Page not found');
})



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