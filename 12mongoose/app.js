/*
 *
 * MONGOOSE
 * Depende do express ejs mongoose
 * 1-Instale o mongoose npm i mongoose
 * 2-De um require no mongoose
 * 3-Defina a constante dbUrl com as configurações do banco
 * 4-Crie a conexão com o banco de dados
 * 5-O banco só é criado após inserir algo nele
 * APÓS INSERIR ALGO verifique no mongo se o banco foi criado
 * no mongo
 * show dbs
 * use testedb
 * show collections
 * 
 */


require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

//=======================================Require no mongoose===========================
const mongoose = require('mongoose');
//=====================================================================================

const methodOverride = require('method-override');

app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);

//===============================CONST dbUrl============================================
//const dbUrl se tiver configurado no arquivo .env pega de la caso contrário pega o que definirmos a direita
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';
//======================================================================================


//===============================CONEXÃO COM O BANCO DE DADOS===========================
mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});
//=====================================================================================


app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})