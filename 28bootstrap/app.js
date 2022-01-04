/*
 * Adding Bootstrap
 * Acesse a página do Bootstrap e clique em get started
 * https://getbootstrap.com/
 * Copia o css cdn e cole no head do layouts/boilerplate.ejs
 * Copie as dependências o que está em JS
 * Coloque no boilerplate depois da tag body do ejs
 * Por fim coloque o body do boilerplate dentro de um container main class=container
 * 
 * 
 */



require('dotenv').config();
const port = process.env.PORT || 3000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/cadastrodb';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const ejsMate = require('ejs-mate');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);



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