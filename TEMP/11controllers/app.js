/*
 *
 * CONTROLLERS
 * 
 * 1-Crie a pasta controllers na raiz do app
 * 2-Crie um arquivo para cada controller.js
 * Neste caso criamos um controller para peoples peoples.js
 * 
 * Imagine que em routes temos todas as rotas para peoples o seguinte código
 * para criar uma nova people
 * 
 * router.get('/new', (req, res) => {
    res.render('people/new');
    });
 *
 * 3-Dentro do controller criamos um export com um nome bem definido indicando
 * o que esse export faz neste caso 
 * module.exports.newPeople = todo o conteúdo da rota após a virgula assim:
 * 
 * module.exports.newPeople = (req, res) => {
    res.render('people/new');
    }
 * 
 * Por fim na rota damos um require no controller associando a uma constante
 * que se torna um objeto com todos os métodos neste caso o método newPeople
 * 
 * const peoples = require('../controllers/peoples');
 * router.get('/new', peoples.newPeople);
 */


require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
const methodOverride = require('method-override');
app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

//===================================ROTAS=============================================
const peoples = require('./routes/peoples');
app.use('/peoples', peoples);
//======================================================================================



const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})