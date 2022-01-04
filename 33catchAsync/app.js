/*
 * 
 * 
 * Cath async wrap automático
 * Crie o arquivo utils/catchAsync.js
 * Cria a função de wrap catchAsync
 * No router da um require na função catchAsync
 * Depois no controller não precisa mais usar o try catch para async
 * Teste novamente os endereços 
 * /peoples tem que dar o erro peoples.fly is not a function !
 * esse erro está lá no controller listPeople essa função não existe
 * o segundo erro teste uma página inexistente 
 * /peoples123 tem que dar o erro Página não encontrada !
 * o console não pode dar erro pois estamos capturando com a função catchAsync
 * Como funciona a função catchAsync
 * imagine a rota tem que ser async
 * 
 * app.get('/peoples', async (req, res, next) => {
 *    código
 * });
 * 
 * Para usar nesse exemplo fariamos
 *  app.get('/peoples', catchAsync(async (req, res, next) => {
 *    código
 * }));
 * Observe estamos selecionando todo o async da função
 * 
 * Logo na rota quando já temos o controller podemos chamar da seguinte forma
 * router.get('/', catchAsync(peoples.listPeoples));
 * basicamente peoples.listPeoples é o que está lá no controller dentro do async
 * 
 * 
 * ATENÇÃO só funciona para async então para rotas post, put, delete
 * se tentar usar em uma rota get sem async vai dar ERRO
 */




require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);



const Cadastro = require('./models/cadastro');

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);


mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});



app.all('*', (req, res, next) => {
   next(new ExpressError('Página não encontrada', 404));
});


app.use((err,req, res, next) => {   
   const { statusCode = 500 } = err;
   if(!err.message) err.message = 'Oh No, Something Went Wrong!';
   res.status(statusCode).render('error', { err });   
})


app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})