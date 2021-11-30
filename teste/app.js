require('dotenv').config();
const port = process.env.PORT;

const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
const path = require('path');
const methodOverride = require('method-override');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));


//============================ROTAS=================================
const pessoas = require('./routes/pessoas');
app.use('/pessoas', pessoas);
//==================================================================


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})