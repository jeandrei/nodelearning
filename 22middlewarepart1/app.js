/*
 * MIDDLEWARE
 * Middleware executa em algum momento entre o request e response
 * executa entre o tempo em que entra uma request e o tempo que temos a response
 * é uma função que executa entre o req e o res
 * cada middleware tem acesso aos objetos do req e do res
 * podendo fazer alterações em ambos
 * Uma middle were pode ser o final de um processo ou pode ser apenas
 * um elo entre uma série de middlewares onde uma chama a outra
 * guia: https://expressjs.com/en/guide/using-middleware.html
 * writing middleware: http://expressjs.com/en/guide/writing-middleware.html
 * middleware tem 3 parametreos req, res, next
 * 
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

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));

//===========================================================================
//app.use executa sempre no código por exemplo
//neste caso iremos dar um console.log toda vez que tiver uma req
//ou seja sempre iremos receber essa mensagem no console
//sempre executa o next no final faz com que o código continue 
//na próxima linha se não colocar o next o código para 
//e não segue adiante
app.use((req,res,next) => {
   console.log('Hi how are you by my first middleware in my app.use!');
   return next();
});

app.use((req,res,next) => {
   console.log('This is the second middleware!');
   return next();
});


//===========================================================================



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