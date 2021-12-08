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
const port = process.env.PORT;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/ExpressError');



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


//===============================ROTA PARA PÁGINAS NÃO ENCONTRADAS===============
//Se for chamado uma rota/página inexistente sempre vai cair aqui aula 442
//vai criar um objeto ExpressError lá do arquivo utils/ExpressError.js 
//o next vai passar para a linha abaixo app.use na variável err
app.all('*', (req, res, next) => {
   next(new ExpressError('Página não encontrada', 404));
});
//================================================================================


//=======COMO ÚLTIMO RECURSO SE AINDA DER ALGUM ERRO DAMOS A MENSAGEM QUE ALGO DEU ERRADO====
//aqui tem que ser antes do app.listenen como último recurso mesmo
app.use((err,req, res, next) => {
   //os valores de err vem do app.all
   //os valores de statusCode e message vai ser passada por err de app.all mas na verdade vem lá
   //do ExpressError
   //passa o que tem em err para statusCode se não tiver nada passa 500 valor defoult
   const { statusCode = 500 } = err;
   // se não tiver nada em err.message passa Ho no something went wrong
   if(!err.message) err.message = 'Oh No, Something Went Wrong!';
   //render a pagina error.ejs passando a variavel err que vai conter o erro e o código status
   res.status(statusCode).render('error', { err });   
})
//=======================================================================================


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})