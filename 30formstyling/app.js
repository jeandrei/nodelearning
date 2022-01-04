/*
 * Styling the New Form, Edit form and Details Form
 * views/cadastros/new.ejs
 * No new primeira coisa colocamos em um grid row e col
 * centraliza o texto text-center
 * col-6 de 12 colunas usamos apenas 6
 * offset-3 para não ficar tudo no canto esquerdo offset 3
 * pega as 6 em branco que sobrou e joga 3 para a esquerda 3 e 3 para a direita
 * dessa forma o conteúdo fica no centro
 * Dentro dessa div colocamos o formulário
 * Agora editamos cada div dos inputs e label
 * em cada div dos inputs colocamos a classe mb-3 que é margin bottom 3
 * No form de detail para colocar o botão delete ao lado do edit dentro do card
 * usamos a classe class="d-inline" display inline
 * 
 * 
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