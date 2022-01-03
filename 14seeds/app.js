/*
 *
 * SEEDS criar um arquivo para popular o banco de dados  
 * 1-Na raiz do app crie um arquivo seeds.js
 * 2-No arquivo seeds.js importe o model const Cadastro = require('./models/cadastro');
 * 3-No seeds.js precisamos fazer a conexão ao mongoose
 * 4-No arquivo seeds.js crie uma constante d com um novo objeto Cadastro que importamos do model
 * 5-Salvamos no banco de dados d.save
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

//==================Imoprtamos o model=======
const Cadastro = require('./models/cadastro');
//===========================================

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