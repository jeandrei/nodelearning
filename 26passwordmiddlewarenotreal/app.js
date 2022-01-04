/*
 * Password Middleware
 * Apenas para aprender mas não é um exemplo real
 * se tentar acessar cadastros/secret sem a palavra mágica
 * não vai deixar acessar
 * usando outra middleware para proteger essa rota
 * Crio uma Middleware no arquivo middleware.js
 * chamada verifyPassword
 * depois na rota eu passo essa middleware para uma constante para poder chamar ela
 * const { exemploMiddleware, verifyPassword } = require('../middleware');
 * e chamo ela na rota
 * router.get('/secret', verifyPassword, cadastros.listCadastros);
 * a rota fica protegida
 * só vai carregar se for colocada a url com a variável password e a palavra secret
 * //http:ip:porta/cadastros/secret?password=secret
 * 
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


const Cadastro = require('./models/cadastro');

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);

app.use((req,res) => {
   res.status(404).send('Page not found');
})

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