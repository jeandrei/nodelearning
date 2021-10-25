//intalar:
//npm i express
//npm i express-session
//https://www.npmjs.com/package/express-session

/**
 * OBS.: Se der uma warning express-session deprecated undefined resave option; provide resave option
 * então para evitar isso temos que setar o resave para false então na linha
 * const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false };
 coloque o resave: false e saveUninitialized também false que é a segunda warning
 * se tirar o resave: false vai dar a warning
 * o mesmo caso para a segunda warning
 * express-session deprecated undefined saveUninitialized option; provide saveUninitialized
 * 
 * 
 */

const express = require('express');
const app = express();

//Require na session
const session = require('express-session');

//Definimos as opções da sessão
const sessionOptions = {secret: 'thisisnotagoodsecret', resave: false, saveUninitialized: false };



//app.use(session é uma middlewhere
//inside of any route or middlewhere on the request object anytime on incaming request 
//we'll have a session property avaliable
app.use(session(sessionOptions));


app.get('/viewcount', (req, res) => {
    //req.session.count não existe estamos criando aqui
    if(req.session.count){
        req.session.count += 1;
    } else {
        req.session.count = 1;
    }

    res.send(`You have viewd this page ${req.session.count} times`);
})


//aqui um exemplo do uso da sessão Aula 481
//criamos uma constante com o valor default Anonymus e caso seja passado
//um valor pqla query pegamos esse valor
//e armazenamos na session req.session.username
//para testar coloque ipdoservidor:3000/register?seunome 
app.get('/register', (req, res) => {
    const { username = 'Anonymus' } = req.query;
    req.session.username = username;
    res.redirect('/greet');
})


app.get('/greet', (req, res) => {
    const { username } = req.session;
    res.send(`Welcome back, ${username}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000')
});