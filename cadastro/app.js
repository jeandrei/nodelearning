
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



/* app.all('*', (req, res, next) => {    
    next(new ExpressError('Página não encontrada', 404));
 });
 
 
 app.use((err,req, res, next) => {
    const { statusCode = 500 } = err;
    if(!err.message) err.message = 'Oh No, Something Went Wrong!';
    res.status(statusCode).render('error', { err });   
 }) */


//App listening
const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("App listening in: http://%s:%s", serverhost, serverport);
});


