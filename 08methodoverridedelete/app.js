/**
 *
 * METHOD OVERRIDE possibilita rotas exclusivas como DELETE
 * Depende do method override 
 * npm install method-override
 * Cria uma constante methodOverride
 * const methodOverride = require('method-override');
 * Definimos a palavra chave para passar o methodo
 * app.use(methodOverride('_method'));
 * Criamos a rota para carregar o formulário com o botão delete
 * Criamos o arquivo delete.ejs utilizando a palavra chave no action
 * action="/cadastros/?_method=DELETE"
 * Por fim criamos uma rota app.delete
 * app.delete('/cadastros', (req, res) => {
 * 
 */


require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

//==============================Definimos uma const methodOverride===================
const methodOverride = require('method-override');
//===================================================================================

app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//===================================================Definimos que a string chave será _method =================
//Assim no form o link fica  <form action="/products/<%=product._id%>?_method=DELETE" method="POST">
app.use(methodOverride('_method'));
//==============================================================================================================

app.get('/cadastros/new', (req, res) => {
    res.render('cadastros/new');
});

app.post('/cadastros', (req, res) => {
    console.log(req.body);
});

//=============================CRIAMOS AS ROTAS======================================
app.get('/cadastros/delete', (req, res) => {
    res.render('cadastros/delete');
});

app.delete('/cadastros', (req, res) => {
    res.send('Você clicou em delete');
})

//=============================================================================


app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})