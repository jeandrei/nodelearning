/*
 * Morgan
 * Morgan e uma middleware que mostra detalhes da aplicação
 * para facilitar o debugin
 * Instale o morgan
 * npm install morgan --save
 * fonte: https://www.npmjs.com/package/morgan
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
//==========================Require Morgan====================
const morgan = require('morgan');
//============================================================

app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));


//==========================================================================
//app.use executa sempre no código por exemplo
//se colocassemos um console.log("Heyyy"); no app.use
//veriamos um Heyy no console em todas as requisições pois ele 
//executa sempre
//então iremos colocar o morgan para executar em cada request
//tiny é tipo o mínimo para maiores informações veja a fonte
app.use(morgan('tiny'));
//Agora no console teremos várias informações em cada request
//para auxiliar o debug 
//==========================================================================


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