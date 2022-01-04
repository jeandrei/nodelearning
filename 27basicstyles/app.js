/*
 * Adding Basic Styles
 * Precisamos do ejs-mate para poder adicionar lalyouts
 * boilerplates que é onde colocamos <%- body -%>
 * Instalamos o ejs-mate
 * npm install ejs-mate --save
 * No app.js damos um require no ejs-mate
 * const ejsMate = require('ejs-mate');
 * Definimos o ejs-mate como mecanismo de layout
 * app.engine('ejs', ejsMate);
 * Agora podemos definir um arquivo de layout
 * Agora dentro do views crie uma nova pasta
 * views/layouts
 * E dentro da pasta adicionamos um boilerplate.ejs
 * views/layouts/boilerplate.ejs
 * Colocamos o código/estrutura básico(a) html
 * e onde queremos que o código seja carregado colocamos  <%- body %>
 * Agora nas outras páginas views deixe apenas o que está dentro de body
 * o resto pode remover
 * E adicione o código no topo
 *  <% layout('layouts/boilerplate')%>
 */



require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
//====================require no ejs-mate==================================
const ejsMate = require('ejs-mate');
//=========================================================================

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//=======================definimos a utilização do ejs engine==============
app.engine('ejs', ejsMate);
//=========================================================================



const Cadastro = require('./models/cadastro');

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);


app.use((req,res) => {
   res.status(404).send('Page not found');
})


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