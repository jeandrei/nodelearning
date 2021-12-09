/*
 * VALIDAÇÃO DO FORMULÁRIO CLIENT SIDE
 * Criamos o arquivo public/javascripts/validateForm.js
 * Com a função que se aplica a classe validated-form
 * ou seja todo formulário que tiver validated-form será validado
 * também no formulário tem que colocar novalidate para não validar com a função
 * padrão do navegador, pois em todos os inputs com required o navegador valida
 * colocando novalidate o navegador não valida e quem valida é nossa função valida
 * Temos que adicionar o script para carregar lá no arquivo views/layouts/boilerplate.ejs
 * Por fim coloque requierd em todos os campos obrigatórios
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



app.all('*', (req, res, next) => {
   next(new ExpressError('Página não encontrada', 404));
});



app.use((err,req, res, next) => {  
   const { statusCode = 500 } = err;
   if(!err.message) err.message = 'Oh No, Something Went Wrong!';
   res.status(statusCode).render('error', { err });   
})


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})