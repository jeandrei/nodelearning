/*
 * ATUALIZANDO
 * 1-Cria um controller editPeople para rendenizar o formulário de edição
 * people/edit
 * 2-Cria uma rota para carregar o formulário de edição no controller
 * outer.get('/:id/edit', peoples.editPeople);
 * no controller procurando os dados e armazenando em uma constante
 * para carregar o formulário com os dados
 * 3-Cria um controller para atualizar os dados no bd
 * updatePeople
 * 4-Cria uma rota para PUT rodar o código do controller 
 * router.put('/:id', peoples.updatePeople);
 * 5-Cria um formulário edit.ejs com metodo put ?_method=PUT
 * nesse formulário é carregado os dados já existentes no banco
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