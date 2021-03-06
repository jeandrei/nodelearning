/**
 * ROUTERS
 * 
 * 1-Crie a pasta routes
 * 2-Para cada conjunto de rotas crie um arquivo js neste caso para todas as rotas de cadastros routes/cadastros.js
 * 3-De um require em todos os módulos necessários para aquela rota exemplo: express, etc
 * 4-No require do express ao invés de atribuirmos a uma const app atribuimos a uma const router
 * const router = express.Router();
 * 5-A partir daí as rotas são montadas da seguinte forma router.get('/new', router.post, router.delete etc
 * 6-Importar as rotas para o app.js
 * atribui a rota a uma constante
 * const cadastros = require('./routes/cadastros');
 * 7-Adiciona o app.use('/oqueVoceQuerParaChamarArota',constante)
 * app.use('/cadastros', cadastros);
 * 8-Montamos as rotas no arquivo routes/cadastros.js e ao final
 * damos um module.exports
 *
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



//===================================ROTAS ESTÃO NO ARQUIVO routes======================
const cadastros = require('./routes/cadastros');
//definimos no app.use tudo na url que começar com /cadastros redirecionar para a rota cadastros
//que damos um require na linha acima
//la no arquivo cadastros.js dentro de routes temos que dirar o /cadastros da frente
//exemplo não pode ficar cadastros/new tem que ficar apenas new
//o /cadastros será adicionado automaticamente pelo app.use linha abaixo
app.use('/cadastros', cadastros);
//======================================================================================

app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})