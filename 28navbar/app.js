/*
 * Adding Navbar
 * No bootstrap procure por
 * Components/Navbar
 * Escolha o modelo e clique em copy
 * Dentro do view crie uma nova pasta partials que vai guardar partes do sistema
 * como header footer e nav
 * Dentro de partials crie um novo arquivo navbar.ejs
 * Cole o código da navbar copiado do bootstrap dentro do arquivo navbar.ejs
 * faça as alterações necessárias
 * Agora precisamos adicionar essa partial navbar.ejs no boilerplate
 * então logo abaixo da primeira tag body coloque
 * <%- include('../partials/navbar')%>
 * Agora para o footer iremos criar uma partial também
 * Crie o arquivo partials/footer.ejs
 * Monte o footer
 * Adicione o mesmono boilerplate
 * <%- include('../partials/footer')%>
 * py-3 é a grossura do footer
 * text-muted cor do texto
 * Para jogar o footer sempre no final da página lá no boilerplate
 * no body colocamos a classe d-flex flex-column 
 * d-flex é display flex
 * vh-100 é 100 o mínimo de 100 unidades na vertical
 * Agora por fim no footer adicionamos uma marge bottom auto mt-auto
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
const ejsMate = require('ejs-mate');


app.use(express.static('public'));
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', ejsMate);
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