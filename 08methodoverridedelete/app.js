/**
 *
 * METHOD OVERRIDE possibilita rotas exclusivas como DELETE
 * Depende do method override 
 * npm install method-override
 */


require('dotenv').config();
const port = process.env.PORT;
const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

//===============================================Definimos uma const methodOverride===================
const methodOverride = require('method-override');
//================================================

app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//===================================================Definimos que a string chave será _method =================
//Assim no form o link fica  <form action="/products/<%=product._id%>?_method=DELETE" method="POST">
app.use(methodOverride('_method'));
//===================================================




app.get('/people/new', (req, res) => {
    res.render('people/new');
})


app.post('/people/save', (req, res) => {    
    console.log(req.body);
})

//Formulário http://ip:porta/people/delete
//no formulário chama dessa forma:
//<form action="/people/?_method=DELETE" method="POST">
app.get('/people/delete', (req, res) => {
    res.render('people/delete');
})

app.delete('/people', (req,res) => {
    res.send('Você clicou no delete');
})


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})