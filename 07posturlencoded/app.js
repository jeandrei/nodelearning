/**
 ** POST Method 
 * 
 * IMPORTANTE NO FORMULÁRIO TEM QUE TER METHOD POST
 * 
 * Here is a simple example which passes two values using HTML FORM POST method. 
 * We are going to use /people router inside app.js to handle this input.
 * 
 * Mesma lógica do 06 porém aqui para o POST precisamos do 
 * app.use(express.urlencoded({ extended: true }));  
 * se tirar ele passa como undefined e não temos acesso ao req.body
 * 
 */


require('dotenv').config();
const port = process.env.PORT || 3000;

const express = require('express');
const app = express();

//==================PARA TER ACESSO AO req.body===============
app.use(express.urlencoded({ extended: true }));
//============================================================

app.use(express.static('public'));
const path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//===============================================================
//Carrega o arquivo /views/cadastro/new.ejs onde está o formulário
app.get('/cadastros/new', (req, res) => {
    res.render('cadastros/new');
});
//O formulário está enviando os dados para a rota /cadastros que é esta aqui
//onde temos acesso aos dados enviados
//para app.post depende necessariamente da linha app.use(express.urlencoded({ extended: true }));
app.post('/cadastros', (req, res) => {
    //depende do urlencoded para visualizar os dados do req.body
    console.log(req.body);
});
//===============================================================


app.listen(port, () => {
    console.log(`Serving on port ${port}`);
})