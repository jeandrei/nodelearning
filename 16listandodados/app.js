/*
 * 1-Cria o view index.ejs views/people/index.ejs
 * 2-No controller importe o model
 * 3-Cria no controller module.exports.listPeoples que renderiza o index.ejs
 * 4-Adiciona a rota no arquivo peoples/routes
 * router.get('/', peoples.listPeoples);
 * 5-Realiza a consulta e rendeniza o arquivo views/people/index.js passando os dados
 * localizados
 * 6-Exibe os dados no arquivo views/people/index.ejs
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