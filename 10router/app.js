/**
 *
 *
 */


require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
let urlencodedParser = bodyParser.urlencoded({ extended: false });
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
})