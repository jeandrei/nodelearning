/**
 * 1ª COISA ESCOLHA ENTRE O MODELO 34 ERRO GENERICO OU 35 ERRO POR CAMPO
 * os dois não da
 */
/*
 * OBS.: PARA PODER FAZER FUNCIONAR COMO A VIDEOAULA
 * TEM QUE SEGUINDO O PADRÃO
 * cadastro[cadastroNome], cadastro[cadastroCpf], cadastro[cadastroEmail]...
 * pq caso contrário lá na schema do joi ele não da certo nessa linha
 * cadastro: Joi.object({
 * pois não aparece cadastro no req.body
 * Para testar sempre no controller de um console.log(req.body);
 * a saida tem que ser algo assim
 * cadastro:{ cadastroNome: 'joão',cadastroCpf: '8938498', cadastroEmail:'jean@gmail.com' }
 * Com essa alteração tive que dar um destruct lá no controller update cadastro
 * 
 * 
 * Cadastro.findByIdAndUpdate(id, { ...req.body.cadastro }
 * 
 * Validação server side com joi validator
 * fonte: https://joi.dev/api/?v=17.5.0
 * Instalamos o joi
 * npm install joi --save
 * Agora vamos criar uma middleware para validação de cada ator
 * exemplo validateCadastro, poderia ter validateUser assim por diante
 * Na raiz do sistema criamos um arquivo schemas.js
 * o route da um require no middleware.js que por sua vez
 * da um require no schemas.js
 * no schemas.js damos um require no joi
 * A sequencia de criação é
 * Crie o arquivo schemas.js na raiz do app
 * Dentro do schemas.js crie a validação do joi
 * Dentro do arquivo middleware crie uma middleware de validação
 * validateCadastro
 * Obs.:na middleware tem que dar um require no cadastroSchema e no ExpressError
 * e por último chame essa middleware no arquivo de rota routes/cadastros saveCadastro
 */

/**
 * IMPORTANTE
 * 
 * Nesse exemplo ele vai sempre dar um erro geral quando não passar na validação
 * obrigando o usuário a refazer todo o cadastro
 * o erro e gerado pela middleware middlewares.js validateCadastro
 * que chama a função ExpressError que está no arquivo /utils/ExpressError
 * Esse tipo de validação serve quando fazemos a validação frontend
 * e a validação frontend impede o envio do formulário
 * sendo que a validação backend com o joi impede que usuários 
 * mal intencionados usem ferramentas como o postman para injetar dados
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
const ExpressError = require('./utils/ExpressError');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);



const Cadastro = require('./models/cadastro');

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);


mongoose.connect(dbUrl,{ 
   useNewUrlParser: true, 
   useUnifiedTopology: true    
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
   console.log("Database connected");
});



app.all('*', (req, res, next) => {
   next(new ExpressError('Página não encontrada', 404));
});


app.use((err,req, res, next) => {   
   const { statusCode = 500 } = err;
   if(!err.message) err.message = 'Oh No, Something Went Wrong!';
   res.status(statusCode).render('error', { err });   
})


app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})