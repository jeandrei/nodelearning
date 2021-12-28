

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

//morgan
//const morgan = require('morgan');
//app.use(morgan('tiny'))

//ejs-mate necessário para o layout boilerplate
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);

//ErrorHandler
const ExpressError = require('./utils/ExpressError');


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


//===============================ROTA PARA PÁGINAS NÃO ENCONTRADAS===============
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




//App listening
const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("App listening in: http://%s:%s", serverhost, serverport);
});


