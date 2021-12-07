/*
 * ROTA 404 PARA PÁGINA NÃO ENCONTRADA
 * No final do app.js como uma rota de último recurso adicionamos um app.use
 * para page not found.
 * lembre que app.use é sempre executado
 * ou seja se passar por todas as rotas e nenhuma for a solicitada
 * a última linha a ser executada será o app.use
 * antes da conexão com o banco de dados
 * res.status(404) para deixar claro que o erro é de página não encontrada
 * pode verificar no console do chrome vai dar erro 404
 * 
 * 
 * 
 * OBS.: DEPOIS TENTAR VOLTAR AQUI E IMPLEMENTAR O TEMPLATE DE ERRO
 * AULA 442
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



//===================================ROTAS=============================================
const People = require('./models/people');
const peoples = require('./routes/peoples');
app.use('/peoples', peoples);
//======================================================================================


//==========================ROTA 404 PAGE NOT FOUND======================================
app.use((req,res) => {
   res.status(404).send('Page not found');
})
//=======================================================================================



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