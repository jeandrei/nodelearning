/**
 * ROUTERS
 * 
 * 1-Crie a pasta routes
 * 2-Para cada conjunto de rotas crie um arquivo js neste caso para todas as rotas de peoples routes/peoples.js
 * 3-De um require em todos os módulos necessários para aquela rota exemplo: express, etc
 * 4-No require do express ao invés de atribuirmos a uma const app atribuimos a uma const router
 * const router = express.Router();
 * 5-A partir daí as rotas são montadas da seguinte forma router.get('/new', router.post, router.delete etc
 * 6-Importar as rotas para o app
 * atribui a rota a uma constante
 * const peoples = require('./routes/peoples');
 * 7-Adiciona o app.use('/oqueVoceQuerParaChamarArota',constante)
 * app.use('/peoples', peoples);
 *
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

//===================================ROTAS ESTÃO NO ARQUIVO routes======================
const peoples = require('./routes/peoples');
//definimos no app.use tudo na url que começar com /peoples redirecionar para a rota peoples
//que damos um require na linha acima
//la no arquivo peoples.js dentro de routes temos que dirar o /peoples da frente
//exemplo não pode ficar peoples/new tem que ficar apenas new o /peoples
//será adicionado automaticamente pelo app.use linha abaixo
app.use('/peoples', peoples);
//======================================================================================



const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
});