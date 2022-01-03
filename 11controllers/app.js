/*
 *
 * CONTROLLERS
 * 
 * 1-Crie a pasta controllers na raiz do app
 * 2-Crie um arquivo para cada controller.js
 * Neste caso criamos um controller para cadastros cadastros.js
 * 
 * Imagine que em routes temos todas as rotas para cadastros 
 * temos o seguinte código para carregar o formulário para um novo cadastro
 * 
 * router.get('/new', (req, res) => {
    res.render('cadastros/new');
    });
 *
 * 3-Dentro do controller criamos um export com um nome bem definido indicando
 * o que esse export faz neste caso 
 * module.exports.newCadastro = todo o conteúdo da rota após a virgula assim:
 * 
 * module.exports.newCadastro = (req, res) => {
    res.render('cadastros/new');
    }
 * 
 * Por fim na rota damos um require no controller associando a uma constante
 * que se torna um objeto com todos os métodos neste caso o método newCadastro
 * 
 * const cadastros = require('../controllers/cadastros');
 * router.get('/new', cadastros.newCadastro);
 * 
 * IMPORTANTE é necessário também dar um require no urlencoded na rota
 * para poder acessar o req.body
 */


require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

const methodOverride = require('method-override');

app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

const cadastros = require('./routes/cadastros');
app.use('/cadastros', cadastros);

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})