/**
 * 1ª COISA ESCOLHA ENTRE O MODELO 34 ERRO GENERICO OU 35 ERRO POR CAMPO
 * os dois não da
 */

/**
 * Neste exemplo iremos fazer os erros por campo 35
 * Crie o arquivo /utils/validationFormatter
 * As funções joiErrorFormatter e mongooseErrorFormatter irão formatar
 * os erros retornados tanto pelo joi quanto pelo mongoose
 * irão retornar sempre no padrão
 * 
 * {
  "cadastroNome": [
    "Nome é um campo obrigatório"
  ],
  "cadastroCpf": [
    "CPF é um campo obrigatório"
  ],
  "cadastroEmail": [
    "Email é obrigatório"
  ],
  "cadastroCelular": [
    "Celular é um campo obrigatório"
  ],
  "cadastroTelefone": [
    "Telefone é um campo obrigatório"
  ]
}
 * 
 * Agora no arquivo middleware.js damos um require em ambos 
 * joiErrorFormatter, mongooseErrorFormatter
 * Ainda no middleware.js criamos a função validaSchema
 * 
 * Agora no router/cadastros 
 * de um require na middleware validaSchema e na schema cadastroSchema
 * const { middleware, verifyPassword, validaSchema } = require('../middleware');
 * const { cadastroSchema } = require('../schemas.js');
 * Ainda no middleware.js criamos a função validaShema
 * Agora no arquivo routes/cadastros.js chamamos a validação na rota do post
 * antes de salvar
 * validaSchema(cadastroSchema, 'cadastros/new')
 * No controller temos que passar as variáveis message formDate e erros
 * para que não de erro de variável não definida
 * message mensagem para o flash message
 * formDate os dados preencidos pelo usuário para repopular o formulário
 * e não ficar tudo em branco
 * erros os erros de validação do joi
 * Por fim refazemos o formulário para apresentar os erros
 * 
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