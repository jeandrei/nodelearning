/*
 * CRIANDO A PÁGINA DE DETALHES
 * 1-Crie o controller de início se quiser pode apenas dar um console.log só para ver se 
 * consegue acessar quando criar a rota
 * 2-Crie a rota router.get('/:id', cadastros.detailCadastro); que vai executar o controller
 * 3-Realize a pesquisa no banco buscando pelo id e renderizando a pagina de detalhes passando 
 * os dados encontrados res.render('cadastros/details', { cadastro });
 * busque no banco de dados um id válido db.cadastros.find({});
 * copie um e cole na url ip:porta/cadastros/id
 * de um console.log para verificar se os dados foram localizados
 * 4-Crie um view details.ejs onde iremos rendenizar os dados
 * 5-Atualize o views/cadastros/index.ejs para apresentar o link
 * nos registros que direcionam para a página de detalhe
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