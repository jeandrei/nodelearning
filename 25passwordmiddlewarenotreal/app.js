/*
 * Password Middleware
 * Apenas para aprender mas não é um exemplo real
 * se tentar acessar pessoas/secret sem a palavra mágica
 * não vai deixar acessar
 * usando outra middleware para proteger essa rota
 * Crio uma Middleware no arquivo middleware.js
 * chamada verifyPassword
 * depois na rota eu passo essa middleware para uma constante para poder chamar ela
 * const { exemploMiddleware, verifyPassword } = require('../middleware');
 * e chamo ela na rota
 * router.get('/secret', verifyPassword, peoples.listPeoples);
 * a rota fica protegida
 * só vai carregar se for colocada a url com a variável password e a palavra secret
 * //http:ip:porta/peoples/secret?password=secret
 * 
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



//===================================ROTAS=============================================
const People = require('./models/people');
const peoples = require('./routes/peoples');
app.use('/peoples', peoples);
//======================================================================================



app.use((req,res) => {
   res.status(404).send('Page not found');
})



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