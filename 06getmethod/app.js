/**
 * GET Method
 * Here is a simple example which passes two values using HTML FORM GET method. 
 * We are going to use /people router inside app.js to handle this input.
 * 
 * 
 * 
 * Instalamos o ejs npm install ejs
 * Criamos a pasta views onde teremos os formulários neste caso /views/people/new.ejs
 * Criamos o arquivo index.ejs com o formulário
 * Criamos a constante path que vai trazer o caminho do servidor e juntaremos com  views formando o caminho 
 * completo para views
 * Definimos o o framework ejs para rendenizar os formulários
 * 
 */


require('dotenv').config();
const port = process.env.PORT;

const express = require('express');
const app = express();

app.use(express.static('public'));

//const path como o caminho do app
const path = require('path');

//definição do diretório onde iremos colocar os formulários e views
app.set('views', path.join(__dirname, 'views'));

//definição do framework ejs
app.set('view engine', 'ejs');



//Carrega o arquivo /views/people/index.ejs onde está o formulário
app.get('/people/new', (req, res) => {
    res.render('people/new');
})

//O formulário está enviando os dados para a rota /people que é esta aqui
//onde temos acesso aos dados enviados
app.get('/people', async (req, res) => {
    response = {
        first_name:req.query.first_name,
        last_name:req.query.last_name
    };    
    console.log(response);
    res.end(JSON.stringify(response));
})


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})