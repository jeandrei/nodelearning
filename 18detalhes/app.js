/*
 * CRIANDO A PÁGINA DE DETALHES
 * 1-Crie o controller de início se quiser pode apenas dar um console.log só para ver se 
 * consegue acessar quando criar a rota
 * 2-Crie a rota router.get('/:id', peoples.detailPeople); que vai executar o controller
 * 3-Realize a pesquisa no banco buscando pelo id e renderizando a pagina de detalhes passando 
 * os dados encontrados res.render('people/details', { people });
 * busque no banco de dados um id válido db.peoples.find({});
 * copie um e cole na url ip:porta/peoples/id
 * de um console.log para verificar se os dados foram localizados
 * 4-Crie um view details.ejs onde iremos rendenizar os dados
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