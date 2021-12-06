/*
 * MIDDLEWARE
 * criando uma middleware
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
})

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