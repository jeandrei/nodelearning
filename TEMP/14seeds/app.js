/*
 *
 * SEEDS criar um arquivo para popular o banco de dados  
 * 1-Na raiz do app crie um arquivo seeds.js
 * 2-No arquivo seeds.js importe o model const People = require('./models/people');
 * 3-No seeds.js precisamos fazer a conexão ao mongoose
 * 4-No arquivo seeds.js crie uma constante p com um novo objeto People que importamos do model
 * 5-Salvamos no banco de dados p.save
 */


require('dotenv').config();
const port = process.env.PORT;
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