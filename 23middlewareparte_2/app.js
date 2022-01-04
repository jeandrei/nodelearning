/*
 * MIDDLEWARE
 * criando uma middleware
 * 
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



//==============MIDDLEWARE PARA IMPRIMIR DADOS NO CONSOLE=================
app.use((req,res,next) => {
   //transforma todas as requisições em GET
   //req.method = 'GET';
   //só que dai não funciona nenhum post
   //pega a hora em que a requisição foi feita
   //depois lá no controller /index posso imprimir o req.requestTime
   req.requestTime = Date.now();
   console.log(req.method.toUpperCase(), req.path);
   next();
});
//===========================================================================




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