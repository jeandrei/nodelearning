/**
 * POST Method
 * Here is a simple example which passes two values using HTML FORM POST method. 
 * We are going to use /people router inside app.js to handle this input.
 * 
 * Mesma lógica do 06 porém aqui para o POST precisamos do body-parser  
 * se tirar o bady-parser ele passa um array em branco no post
 * 
 */


require('dotenv').config();
const port = process.env.PORT;

const express = require('express');
const app = express();

//============================================================
const bodyParser = require('body-parser');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
//============================================================

app.use(express.static('public'));

//const path como o caminho do app
const path = require('path');

//definição do diretório onde iremos colocar os formulários e views
app.set('views', path.join(__dirname, 'views'));

//definição do framework ejs
app.set('view engine', 'ejs');


/*====================================USE BODYPARSER or urlencoded================================
Pelo que eu entendi se usar o bodyparser não precisa usar o urlencoded
app.use(bodyParser.urlencoded({extended: true}))
Here is the explanation that should clear doubts on express.json() and 
express.urlencoded() and the use of body-parser. 
It took me some time to figure this out.
What is Middleware? It is those methods/functions/operations that are called 
BETWEEN processing the Request and sending the Response in your application method.
When talking about express.json() and express.urlencoded() think specifically 
about POST requests (i.e. the .post request object) and PUT Requests 
(i.e. the .put request object)
You DO NOT NEED express.json() and express.urlencoded() for GET Requests or 
DELETE Requests.
You NEED express.json() and express.urlencoded() for POST and PUT requests, 
because in both these requests you are sending data 
(in the form of some data object) to the server and you are asking the server 
to accept or store that data (object), which is enclosed in the body 
(i.e. req.body) of that (POST or PUT) Request
Express provides you with middleware to deal with the (incoming) data (object) 
in the body of the request.
a. express.json() is a method inbuilt in express to recognize the 
incoming Request Object as a JSON Object. This method is called as a middleware 
in your application using the code: app.use(express.json());
b. express.urlencoded() is a method inbuilt in express to recognize the incoming 
Request Object as strings or arrays. This method is called as a middleware in your 
application using the code: app.use(express.urlencoded());
ALTERNATIVELY, I recommend using body-parser (it is an NPM package) to do the same 
thing. It is developed by the same peeps who built express and is designed 
to work with express. body-parser used to be part of express. 
Think of body-parser specifically for POST Requests (i.e. the .post request object) 
and/or PUT Requests (i.e. the .put request object).
====================================================================*/



//Carrega o arquivo /views/people/index.ejs onde está o formulário
app.get('/people/new', (req, res) => {
    res.render('people/new');
})

//O formulário está enviando os dados para a rota /people que é esta aqui
//onde temos acesso aos dados enviados
app.post('/people', urlencodedParser, (req, res) => {
      //depende do body-parser npm install body-parser --save
    // Prepare output in JSON format
    response = {
        first_name:req.body.first_name,
        last_name:req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));  
})


const server = app.listen(port, () => {
    const serverhost = server.address().address;
    const serverport = server.address().port;
    console.log("Exemplo de app express rodando em: http://%s:%s", serverhost, serverport);
})